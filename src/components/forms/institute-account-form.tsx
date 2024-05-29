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

export function InstitueAccountForm(): JSX.Element {
    const form = useForm<AccountFormInput>({
        resolver: zodResolver(accountFormSchema),
    })

    return (
        <Form {...form}>
            <form
                className="grid w-full gap-8"
            >
                <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
                    <FormField
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
                                <FormLabel>Location</FormLabel>
                                <FormControl className="h-12">
                                    <Input type="string" placeholder="Enter location" {...field} />
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
                                <FormLabel>Wallet</FormLabel>
                                <FormControl className="h-12">
                                    <Input type="text" placeholder="Enter wallet address"/>
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
                                <FormLabel>Logo</FormLabel>

                                <FormControl className="h-12">
                                    <Input type="file" />
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
                    Submit
                    <span className="sr-only">Submit contact form</span>
                </Button>
            </form>
        </Form>
    )
}
