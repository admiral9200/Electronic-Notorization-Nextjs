"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from 'next/image'

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
import { Input } from "@/components/ui/input"
import { StudentAccountFormInput, studentAccountFormSchema } from "@/validations/account"

export function InstitueAccountForm(): JSX.Element {
    const form = useForm<StudentAccountFormInput>({
        resolver: zodResolver(studentAccountFormSchema),
    })

    const [logoPreview, setLogoPreview] = React.useState<string | null>(null);

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadButtonClick = () => {
        const fileInput = document.getElementById("logoInput");
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <Form {...form}>
            <div className='pb-12'>
                <h2 className='text-2xl font-bold'>Account Settings:</h2>
                <div className="bg-white rounded-md px-5 py-4 mt-6 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <img className="w-20 h-20 rounded-full border border-white" src={logoPreview ? logoPreview : "/images/avatars/pjborowiecki.jpeg"} alt="Preview" />
                        <div className="pt-3">
                            <h3 className="text-xl font-bold text-black">John Doe</h3>
                            <p className="text-black text-sm">View Profile</p>
                        </div>
                    </div>
                    <button className="text-gray-600 font-bold border border-gray-500 rounded-sm py-2 text-sm px-4 mr-2" onClick={handleUploadButtonClick}>Upload</button>
                    <input type="file" id="logoInput" className="hidden" onChange={handleLogoChange} />
                </div>
            </div>
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
                                    <Input className="border-white border placeholder:text-white" type="text" placeholder="John" {...field} />
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
                                    <Input className="border-white border placeholder:text-white" type="string" placeholder="Enter location" {...field} />
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
                                    <Input className="border-white border placeholder:text-white" type="email" placeholder="john@smith.com" {...field} />
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
                                    <Input className="border-white border placeholder:text-white" type="text" placeholder="Enter wallet address" />
                                </FormControl>
                                <FormMessage className="pt-2 sm:text-sm" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4 items-end">

                    <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Genre</FormLabel>
                                <FormControl className="h-12">
                                    <select className="border-white border placeholder:text-white w-full bg-transparent px-3 rounded-md">
                                        <option value="School"> School </option>
                                        <option value="University"> University </option>
                                    </select>
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
