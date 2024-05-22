"use client"

import { Button } from "@/components/ui/button"
import { pdfToImg } from "@/lib/pdf-to-img"
import { useWebSocket } from "next-ws/client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useCallback, useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { useRouter } from "next/navigation"
import { TranscriptSubmitForm } from "@/components/forms/transcript-submit-form"

enum Status {
  IDLE,
  UPLOADING,
  ANALYZING,
  SUCCESS,
  ERROR
}

export default function FeaturesPage(): JSX.Element {
  const [pdfContent, setPdfContent] = useState<string[]>([])
  const [status, setStatus] = useState(Status.IDLE)
  const [pagesFinished, setPagesFinished] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  // routing...
  const router = useRouter()

  // websocket...
  const [message, setMessage] = useState<string | null>(null)
  const ws = useWebSocket()

  const onMessage = useCallback(
    (event: MessageEvent<Blob>) =>
      void event.data.text().then(setMessage),
    []
  )

  useEffect(() => {
    ws?.addEventListener('message', onMessage)
    return () => ws?.removeEventListener('message', onMessage)
  }, [onMessage, ws])

  /**
   * Submit the transcript and display a notification and move to the ordering dashboard...
   */
  const handleSubmit = async () => {
    ws?.send("first message")

    toast({
      title: "Successfully Submitted!",
      description: "Your transcript is being processed from now!"
    })

    router.push("/student/dashboard")
  }


  const handleExtractPDF = async (file: File) => {
    if (!file) return

    try {
      const images = await pdfToImg(file)
      setTotalPages(images.length)
      setStatus(Status.ANALYZING)

      const pages = []

      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        const text = await runOCR(String(image))
        const textArray = text?.map((item: { Text: string }) => item.Text)
        pages.push(textArray?.join(" "))
        setPagesFinished(i + 1)
      }

      return pages
    } catch (error) {
      console.error("Error extracting PDF: ", error)
      setStatus(Status.ERROR)
    }
  }

  const runOCR = async (imageUrl: string) => {
    try {
      const response = await fetch("/api/textract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataUrl: imageUrl })
      })

      const data = await response.json()
      return data?.Blocks.filter(
        (item: { BlockType: string }) => item.BlockType === "LINE"
      )
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (!files) return

    const file = files[0]
    if (file) {
      setStatus(Status.UPLOADING)
      const pdfContent = await handleExtractPDF(file)
      const formattedPdfContent = pdfContent?.map(
        (item: string, index: number) => `Page ${index + 1}:\n${item}\n\n`
      )

      setTimeout(() => {
        setStatus(Status.SUCCESS)
        setPdfContent(formattedPdfContent!)
      }, 1000)
    }
  }



  return (
    <div className="flex min-h-screen flex-col w-full items-center justify-center">
      {/* <h4 className="text-2xl font-semibold">
        Extract text from PDFs using Next.js app dir
      </h4>

      <Link
        href={"https://arshadyaseen.com/nextjs-pdf-extract-ocr"}
        className="underline mt-3 underline-offset-[3px] mb-24"
      >
        How built this?
      </Link>

      {
        {
          [Status.IDLE]: (
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="ml-28"
            />
          ),
          [Status.UPLOADING]: <p>Uploading PDF...</p>,
          [Status.ANALYZING]: (
            <p className="text-center">
              Analyzing PDF... <br />
              {pagesFinished} of {totalPages} pages analyzed.
            </p>
          ),
          [Status.SUCCESS]: <p>PDF successfully analyzed</p>,
          [Status.ERROR]: <p>Error analyzing PDF.</p>,
        }[status]
      }

      {pdfContent &&
        pdfContent.map((page, index) => (
          <div
            key={index}
            className="sm:w-[800px] w-full mt-6 bg-background border border-input rounded-md p-6"
          >
            <p className="text-lg font-medium mt-4">Page {index + 1}</p>
            <p className="mt-4">{page}</p>
          </div>
        ))} */}


      {/* Submitting to institution... */}
      {/* <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Submit my transcript</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. You cannot cancel your application once submit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <Button onClick={handleSubmit}>
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      <TranscriptSubmitForm />
    </div>
  )
}
