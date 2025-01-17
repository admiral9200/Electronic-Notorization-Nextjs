"use client"

import React, { useCallback, useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useController, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TranscriptFormInput, transcriptFormSchema } from "@/validations/transcript"
import { submitTranscriptForm } from "@/actions/transcript"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { FileWithPath, useDropzone } from "react-dropzone"
import { Check, ChevronsUpDown, ImagePlus } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command"
import { Institution, InstitutionType } from "@prisma/client"


const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

const institutions: Institution[] = [
    {
        id: 1,
        name: "University of Oxford",
        location: "Oxford, UK",
        genre: InstitutionType.UNIVERSITY,
        email: "info@ox.ac.uk",
        logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
        wallet: ""
    },
    {
        id: 2,
        name: "Bluesky Community College",
        location: "Seattle, USA",
        genre: InstitutionType.COLLEGE,
        email: "info@blueskycollege.edu",
        logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
        wallet: ""
    },
    {
        id: 3,
        name: "Oakwood Academy",
        location: "Chicago, USA",
        genre: InstitutionType.SCHOOL,
        email: "info@oakwoodacademy.org",
        logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
        wallet: ""
    },
]

export function TranscriptSubmitForm(): JSX.Element {
    const { toast } = useToast()
    const [isPending, startTransition] = React.useTransition()
    const [files, setFiles] = useState<FileWithPath[]>([])
    const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const router = useRouter()

    const form = useForm<TranscriptFormInput>({
        resolver: zodResolver(transcriptFormSchema),
        mode: "onBlur",
        defaultValues: {
            transcript: new File([""], "filename")
        }
    })


    /**
     * 
     */
    const onSubmit = (formData: TranscriptFormInput) => {
        startTransition(async () => {
            try {
                console.log(formData)
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

    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const reader = new FileReader();
            try {
                reader.onload = () => setPreview(reader.result);
                reader.readAsDataURL(acceptedFiles[0]);
                form.setValue("transcript", acceptedFiles[0]);
                form.clearErrors("transcript");
            } catch (error) {
                setPreview(null);
                form.resetField("transcript");
            }
        },
        [form],
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles: 1,
            maxSize: 5000000,
            accept: {
                "application/pdf": [".pdf"],
            },
        });

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
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>UserId</FormLabel>
                                                    <FormControl className="h-12">
                                                        <Input type="string" placeholder="10" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="pt-2 sm:text-sm" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl className="h-12">
                                                        <Input type="text" placeholder="John Smith" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="pt-2 sm:text-sm" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="institutionId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>My School</FormLabel>
                                                    <FormControl className="h-12">
                                                        <Input type="text" placeholder="John Smith" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="pt-2 sm:text-sm" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="aimedInstitutionId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Recipient University</FormLabel>
                                                    <FormControl className="h-12">
                                                        {/* <Input type="text" placeholder="John Smith" {...field} /> */}
                                                        <Popover open={open} onOpenChange={setOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    aria-expanded={open}
                                                                    className="w-[200px] justify-between"
                                                                >
                                                                    {value
                                                                        ? [
                                                                            {
                                                                                id: 1,
                                                                                name: "University of Oxford",
                                                                                location: "Oxford, UK",
                                                                                genre: InstitutionType.UNIVERSITY,
                                                                                email: "info@ox.ac.uk",
                                                                                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                                                                                wallet: ""
                                                                            },
                                                                            {
                                                                                id: 2,
                                                                                name: "Bluesky Community College",
                                                                                location: "Seattle, USA",
                                                                                genre: InstitutionType.COLLEGE,
                                                                                email: "info@blueskycollege.edu",
                                                                                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                                                                                wallet: ""
                                                                            },
                                                                            {
                                                                                id: 3,
                                                                                name: "Oakwood Academy",
                                                                                location: "Chicago, USA",
                                                                                genre: InstitutionType.SCHOOL,
                                                                                email: "info@oakwoodacademy.org",
                                                                                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                                                                                wallet: ""
                                                                            },
                                                                        ].find((institution) => String(institution.id) === value)?.name
                                                                        : "Select framework..."}
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-[200px] p-0">
                                                                <Command>
                                                                    <CommandInput placeholder="Search framework..." />
                                                                    <CommandEmpty>No framework found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {institutions.map((institution) => (
                                                                            <CommandItem
                                                                                key={institution.id}
                                                                                value={String(institution.id)}
                                                                                onSelect={(currentValue) => {
                                                                                    setValue(currentValue === value ? "" : currentValue)
                                                                                    setOpen(false)
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        "mr-2 h-4 w-4",
                                                                                        value === String(institution.id) ? "opacity-100" : "opacity-0"
                                                                                    )}
                                                                                />
                                                                                {institution.name}
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </FormControl>
                                                    <FormMessage className="pt-2 sm:text-sm" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="transcript"
                                            render={() => (
                                                <FormItem className="mx-auto md:w-1/2">
                                                    <FormLabel
                                                        className={`${fileRejections.length !== 0 && "text-destructive"
                                                            }`}
                                                    >
                                                        <h2 className="text-xl font-semibold tracking-tight">
                                                            Upload your transcript
                                                            <span
                                                                className={
                                                                    form.formState.errors.transcript || fileRejections.length !== 0
                                                                        ? "text-destructive"
                                                                        : "text-muted-foreground"
                                                                }
                                                            ></span>
                                                        </h2>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div
                                                            {...getRootProps()}
                                                            className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
                                                        >
                                                            {preview && (
                                                                <img
                                                                    src={preview as string}
                                                                    alt="Uploaded transcript"
                                                                    className="max-h-[400px] rounded-lg"
                                                                />
                                                            )}
                                                            <ImagePlus
                                                                className={`size-40 ${preview ? "hidden" : "block"}`}
                                                            />
                                                            <Input {...getInputProps()} type="file" />
                                                            {isDragActive ? (
                                                                <p>Drop your transcript!</p>
                                                            ) : (
                                                                <p>Click here or drag a transcript to upload it</p>
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage>
                                                        {fileRejections.length !== 0 && (
                                                            <p>
                                                                File must be less than 1MB type must be pdf
                                                            </p>
                                                        )}
                                                    </FormMessage>
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