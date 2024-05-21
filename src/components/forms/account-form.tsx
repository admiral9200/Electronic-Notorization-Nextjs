"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { AccountFormInput, accountFormSchema } from "@/validations/account"
import { submitAccountForm } from "@/actions/account"
import { useSession } from "next-auth/react"
import { getUserByEmail } from "@/actions/user"
import { Institution, Role } from "@prisma/client"
import { getInstitutions } from "@/actions/institutions"

export function AccountForm(): JSX.Element {
    const { toast } = useToast()
    const [isPending, startTransition] = React.useTransition()

    const session = useSession();

    const [userData, setUserData] = React.useState<AccountFormInput>({
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: "",
        institutionId: "0",
        role: Role.STUDENT
    });

    const [institutions, setInstitutions] = React.useState<Institution[]>([]);

    const form = useForm<AccountFormInput>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: userData
    })

    /**
     * This function is used to observe the change of session...
     */
    React.useEffect(() => {
        if (session.data?.user) {
            form.reset({
                name: session.data.user.name || "",
                email: session.data.user.email || ""
            })
        }
    }, [session.data, form])

    // React.useEffect(() => {
    //     async function fetchUser() {
    //         const user = await getUserByEmail({ email: String(session.data?.user.email) });
    //         setUserData({
    //             name: String(user?.name) || "",
    //             surname: String(user?.surname) || "",
    //             email: String(user?.email) || "",
    //             phone: String(user?.phone) || "",
    //             address: String(user?.address) || "",
    //             institutionId: String(user?.institutionId) || "0",
    //             role: user?.role || Role.STUDENT
    //         })
    //     }

    //     fetchUser()
    // }, [session.data, form])

    React.useEffect(() => {
        form.reset(userData)
    }, [userData, form])


    React.useEffect(() => {
        async function fetchInstitutions() {
            const institutions = await getInstitutions()
            setInstitutions(institutions)
        }

        fetchInstitutions();
    }, [])

    function onSubmit(formData: AccountFormInput): void {
        startTransition(async () => {
            try {
                const message = await submitAccountForm(formData)

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
        <Form {...form}>
            <form
                className="grid w-full gap-8"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl className="h-12">
                                    <Input type="text" placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage className="pt-2 sm:text-sm" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Surname</FormLabel>
                                <FormControl className="h-12">
                                    <Input type="string" placeholder="Smith" {...field} />
                                </FormControl>
                                <FormMessage className="pt-2 sm:text-sm" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Email</FormLabel>
                                <FormControl className="h-12">
                                    <Input type="email" placeholder="john@smith.com" {...field} disabled />
                                </FormControl>
                                <FormMessage className="pt-2 sm:text-sm" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl className="h-12">
                                    <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage className="pt-2 sm:text-sm" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>

                                <FormControl className="h-12">
                                    <Input type="text" placeholder="2618 Ocala Street Orlando Florida 32809 United States" {...field} />
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
                                <FormLabel>Institution</FormLabel>
                                <FormControl className="h-12">
                                    <Select value={String(field.value)} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a university" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {institutions.map((institution: Institution) => (
                                                <SelectItem key={institution.id} value={String(institution.id)}>
                                                    {institution.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="pt-2 sm:text-sm" />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl className="h-12">
                                    <Select value={String(field.value)} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={Role.STUDENT}>{ Role.STUDENT }</SelectItem>
                                            <SelectItem value={Role.INSTITUTION}>{ Role.INSTITUTION }</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="pt-2 sm:text-sm" />
                            </FormItem>
                        )}
                    />
                </div>

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
    )
}
