"use client"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TranscriptFormInput, transcriptFormSchema } from "@/validations/transcript"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { useDropzone } from "react-dropzone"
import { ImagePlus } from "lucide-react"
import {
    Popover,
    PopoverTrigger
} from "@/components/ui/popover"
import { Institution } from "@prisma/client"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { getInstitutionByUserEmail } from "@/actions/institutions"
import { submitTranscriptForm } from "@/actions/transcript"

interface TranscriptSubmitFormProps {
    id: string,
    institutions: Institution[]
}

export function TranscriptSubmitForm({
    id,
    institutions
}: TranscriptSubmitFormProps): JSX.Element {
    const { toast } = useToast()
    const [isPending, startTransition] = React.useTransition()
    const [file, setFile] = useState<any>(null)

    const router = useRouter()
    const session = useSession()

    /**
     * TODO: user id catching error...
     */
    const form = useForm<TranscriptFormInput>({
        resolver: zodResolver(transcriptFormSchema),
        mode: "onBlur",
        defaultValues: {
            userId: '1',
            aimedInstitutionId: id
        }
    });


    /**
     * This function is used to submit the transcript form...
     */
    const onSubmit = (formData: TranscriptFormInput) => {
        startTransition(async () => {
            try {
                const res = await sendDataToSchool(formData)

                toast({
                    title: "Thank you!",
                    description: "Your message has been sent",
                })
                // const message = await submitTranscriptForm(formData)

                // switch (message) {
                //     case "success":
                //         toast({
                //             title: "Thank you!",
                //             description: "Your message has been sent",
                //         })
                //         form.reset()
                //         break
                //     default:
                //         toast({
                //             title: "Something went wrong",
                //             description: "Please try again",
                //             variant: "destructive",
                //         })
                // }
            } catch (error) {
                toast({
                    description: "Something went wrong. Please try again",
                    variant: "destructive",
                })
            }
        })
    }

    /**
   * Submit the transcript and display a notification and move to the ordering dashboard...
   */
    const handleSubmit = async () => {
        toast({
            title: "Successfully Submitted!",
            description: "Your transcript is being processed from now!"
        })

        router.push("/student/dashboard")
    }


    /**
     * This function is used to send transcript submission form data to school...
     * So it involves uploading file to public folder with specific name...
     * And also all the string data should be saved to "orders" table...
     */
    const sendDataToSchool = async (formData: TranscriptFormInput) => {
        try {
            const formDataObject = new FormData()
            formDataObject.append('userId', formData.userId)
            formDataObject.append('aimedInstitutionId', formData.aimedInstitutionId)
            formDataObject.append('transcript', file)

            const response = await fetch("/api/students/transfer-to-school", {
                method: "POST",
                body: formDataObject
            })

            console.log("response: ", await response.json())
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                    >
                        <Link href="#" className="font-semibold text-primary">
                            General
                        </Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-2">
                            <CardHeader>
                                <CardTitle>Fill the required information to send to <u>{institutions.find((institution) => String(institution.id) === id)?.name}</u></CardTitle>
                                <CardDescription>
                                    In here, you will be able to fill the required information with your information.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form
                                        className="flex flex-col gap-4"
                                        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="transcript"
                                            render={() => (
                                                <FormItem className="mx-auto md:w-1/2">
                                                    <FormLabel>
                                                        Transcript
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input type="file" onChange={e => { e.preventDefault(); setFile(e.target.files?.[0]); form.setValue('transcript', e.target.files?.[0]) }} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />


                                        <Button
                                            variant="outline"
                                            className="h-14 border bg-gradient-to-br from-pink-600/70 to-purple-400/70 text-lg font-bold tracking-wide hover:opacity-70"
                                        >
                                            {isPending && (
                                                <Icons.spinner
                                                    className="mr-2 size-4 animate-spin"
                                                    aria-hidden="true"
                                                />
                                            )}
                                            {isPending ? "Sending..." : "Send"}
                                            <span className="sr-only">Submit contact form</span>
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}