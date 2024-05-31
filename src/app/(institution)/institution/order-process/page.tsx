"use client"

import { pdfToImg } from "@/lib/pdf-to-img"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { extractKeyInfo } from "@/lib/process-with-gpt"
import { handleDownloadJsonFile } from "@/lib/utils"

enum Status {
    IDLE,
    UPLOADING,
    ANALYZING,
    SUCCESS,
    ERROR,
    PROCESSING
}


export default function Page(): JSX.Element {
    const [pdfContent, setPdfContent] = useState<string[]>([])
    const [status, setStatus] = useState(Status.IDLE)
    const [pagesFinished, setPagesFinished] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [recipientData, setRecipientData] = useState({ email: "recipient@gmail.com", name: "recipient" })
    const [issuerData, setIssuerData] = useState("https://raw.githubusercontent.com/blockchain-certificates/cert-issuer/master/examples/issuer/profile.json")
    const [transcriptData, setTranscriptData] = useState<any>(null)
    const [certificate, setCertificate] = useState(null)

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

            const data = await extractKeyInfo(formattedPdfContent)
            const extractedData = data.choices[0].message.content

            const startIndex = extractedData.indexOf("```json");
            const endIndex = startIndex + "```json".length;
            const jsonPart = extractedData.slice(endIndex);

            const lastIndex = jsonPart.lastIndexOf("```");
            const result = jsonPart.slice(0, lastIndex);

            console.log("data: ", JSON.parse(result))
            if (result) {
                setTranscriptData(JSON.parse(result))
            }

            setTimeout(() => {
                setStatus(Status.SUCCESS)
                setPdfContent(formattedPdfContent!)
            }, 1000)
        }
    }

    const handleGenerateCertificate = async () => {
        try {
            const response = await fetch('/api/blockcerts/create-certificate', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipientData, transcriptData, issuerData })
            })

            const data = await response.json()

            if (response.ok) {
                setCertificate(data.certificate)
                setStatus(Status.PROCESSING)

                await handleDownloadJsonFile(data, "example-test-name")
                const res = await fetch('/api/blockcerts/issue-certificate', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data: data.certificate })
                })

                const data_01 = await res.json()

                console.log("data1: ", data_01, data)
            } else {
                console.log("error")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex min-h-screen flex-col w-full items-center justify-center">
            <h4 className="text-2xl font-semibold">
                Please upload your Transcript
            </h4>
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
                    [Status.SUCCESS]: (
                        <div>
                            <p>PDF successfully analyzed</p>
                            <button onClick={handleGenerateCertificate}>Create certificate</button>
                        </div>
                    ),
                    [Status.ERROR]: <p>Error analyzing PDF.</p>,
                    [Status.PROCESSING]: (
                        <div>
                            <p>Successfully Created!</p>

                        </div>
                    )
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