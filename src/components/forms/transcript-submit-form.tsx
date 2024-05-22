import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TranscriptFormInput, transcriptFormSchema } from "@/validations/transcript"
import { submitTranscriptForm } from "@/actions/transcript"
import { useToast } from "@/hooks/use-toast"


export function TranscriptSubmitForm(): JSX.Element {
    const { toast } = useToast()
    const [isPending, startTransition] = React.useTransition()

    const [transcriptData, setTranscriptData] = React.useState<TranscriptFormInput>({
        userId: 0,
        name: "",
        institutionId: "0",
        aimedInstitutionId: "0",
        transcript: null
    });

    const form = useForm<TranscriptFormInput>({
        resolver: zodResolver(transcriptFormSchema),
        defaultValues: transcriptData
    })


    /**
     * 
     */
    const onSubmit = (formData: TranscriptFormInput) => {
        startTransition(async () => {
            try {
                const message = await submitTranscriptForm(formData)

                switch (message) {
                    case "success":
                        toast({
                            title: "Thank you!",
                            description: "Your message has been sent",
                        })
                        form.reset()
                        break
                    default:
                        toast({
                            title: "Something went wrong",
                            description: "Please try again",
                            variant: "destructive",
                        })
                }
            } catch (error) {
                toast({
                    description: "Something went wrong. Please try again",
                    variant: "destructive",
                })
            }
        })
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
                        <Link href="#">Security</Link>
                        <Link href="#">Integrations</Link>
                        <Link href="#">Support</Link>
                        <Link href="#">Organizations</Link>
                        <Link href="#">Advanced</Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-2">
                            <CardHeader>
                                <CardTitle>Fill the required information</CardTitle>
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
                                            name="userId"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>UserId</FormLabel>
                                                    <FormControl className="h-12">
                                                        <Input type="number" placeholder="10" { ...field } />
                                                    </FormControl>
                                                    <FormMessage className="pt-2 sm:text-sm" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField 
                                            control={form.control}
                                            name="name"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl className="h-12">
                                                        <Input type="text" placeholder="John Smith" { ...field } />
                                                    </FormControl>
                                                    <FormMessage className="pt-2 sm:text-sm" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField 
                                            control={form.control}
                                            name="institutionId"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>My School</FormLabel>
                                                    <FormControl className="h-12">
                                                        <Input type="text" placeholder="John Smith" { ...field } />
                                                    </FormControl>
                                                    <FormMessage className="pt-2 sm:text-sm" />
                                                </FormItem>
                                            )}
                                        />

                                        
                                        <FormField 
                                            control={form.control}
                                            name="transcript"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Transcript</FormLabel>
                                                    <FormControl className="h-12">
                                                        <Input type="file" { ...field } />
                                                    </FormControl>
                                                    <FormMessage className="pt-2 sm:text-sm" />
                                                </FormItem>
                                            )}
                                        />
                                    </form>
                                </Form>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button>Save</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
