"use client"

import { pdfToImg } from "@/lib/pdf-to-img"
import Link from "next/link"
import { useState } from "react"

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

  const runOCR = async (imageUrl: string): Promise<any> => {
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
      <h4 className="text-2xl font-semibold">
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
        ))}
    </div>
  )
}
