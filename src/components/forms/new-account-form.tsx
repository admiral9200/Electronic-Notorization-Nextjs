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

export function NewAccountForm(): JSX.Element {
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

    React.useEffect(() => {
        if (session.data?.user) {
            form.reset({
                name: session.data.user.name || "",
                email: session.data.user.email || ""
            })
        }
    }, [session.data, form])

    React.useEffect(() => {
        async function fetchUser() {
            const user = await getUserByEmail({ email: String(session.data?.user.email) });
            setUserData({
                name: String(user?.name) || "",
                surname: String(user?.surname) || "",
                email: String(user?.email) || "",
                phone: String(user?.phone) || "",
                address: String(user?.address) || "",
                institutionId: String(user?.institutionId) || "0",
                role: user?.role || Role.STUDENT
            })
        }

        fetchUser()
    }, [session.data, form])

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

    const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
    const [checkInstitution, setCheckInstitution] = React.useState<string | null>(null);
    const [checkRole, setCheckRole] = React.useState(null);
    const [isRoleNull, setIsRoleNull] = React.useState(null);

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
    console.log(Role)
    const handleUploadButtonClick = () => {
        const fileInput = document.getElementById("logoInput");
        if (fileInput) {
            fileInput.click();
        }
    };

    const checkInstitutionFunction = (value) => {
        setCheckRole(value);
        setIsRoleNull(true)
    };

    return (
        <Form {...form}>
            <div className='pb-12'>
                {!session.user ? (
                    <h2 className='text-2xl font-bold'>Create New Account:</h2>
                ) : (
                    <h2 className='text-2xl font-bold'>Account Settings:</h2>
                )}
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
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl className="h-10">
                                    <Input className="border-gray-400 border placeholder:text-gray-300" type="text" placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage className="pt-2 sm:text-sm" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Email</FormLabel>
                                <FormControl className="h-10">
                                    <Input className="border-gray-400 border placeholder:text-gray-300" type="email" placeholder="john@smith.com" {...field} />
                                </FormControl>
                                <FormMessage className="pt-2 sm:text-sm" />
                            </FormItem>
                        )}
                    />

                </div>
                {isRoleNull == null ? null : checkRole === 'STUDENTS' ? (
                    <>
                        {/* Student */}
                        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
                            {/* Surename */}
                            <FormField
                                control={form.control}
                                name="surname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Surname</FormLabel>
                                        <FormControl className="h-10">
                                            <Input className="border-gray-400 border placeholder:text-gray-300" type="string" placeholder="Smith" {...field} />
                                        </FormControl>
                                        <FormMessage className="pt-2 sm:text-sm" />
                                    </FormItem>
                                )}
                            />
                            {/* Phone Number */}

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone number</FormLabel>
                                        <FormControl className="h-10">
                                            <Input className="border-gray-400 border placeholder:text-gray-300" type="tel" placeholder="+1 (555) 123-4567" {...field} />
                                        </FormControl>
                                        <FormMessage className="pt-2 sm:text-sm" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
                            {/* Address */}
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>

                                        <FormControl className="h-10">
                                            <Input className="border-gray-400 border placeholder:text-gray-300" type="text" placeholder="2618 Ocala Street Orlando Florida 32809 United States" {...field} />
                                        </FormControl>
                                        <FormMessage className="pt-2 sm:text-sm" />
                                    </FormItem>
                                )}
                            />
                            {/* Institution */}
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
                        </div>
                    </>)

                    : (<>
                        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
                            {/* Wallet */}
                            <FormField
                                control={form.control}
                                name="wallet"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Wallet</FormLabel>

                                        <FormControl className="h-10">
                                            <Input className="border-gray-400 border placeholder:text-gray-300" type="text" placeholder="2618 Ocala Street Orlando Florida 32809 United States" {...field} />
                                        </FormControl>
                                        <FormMessage className="pt-2 sm:text-sm" />
                                    </FormItem>
                                )}
                            />
                            {/* Location */}
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>

                                        <FormControl className="h-10">
                                            <Input className="border-gray-400 border placeholder:text-gray-300" type="text" placeholder="2618 Ocala Street Orlando Florida 32809 United States" {...field} />
                                        </FormControl>
                                        <FormMessage className="pt-2 sm:text-sm" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Genre */}
                        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-4">
                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genre</FormLabel>
                                        <FormControl className="h-12">
                                            <Select value={String(field.value)} onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a Genre" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="school">
                                                        School
                                                    </SelectItem>
                                                    <SelectItem value="university">
                                                        University
                                                    </SelectItem>
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
                                            <Select value={String(field.value)} onValueChange={checkInstitutionFunction}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="STUDENTS">Student</SelectItem>
                                                    <SelectItem value="INSTITUTION">Institution</SelectItem>
                                                    <SelectItem value="HEALTH_CARE">Health Care</SelectItem>
                                                    <SelectItem value="GOVERNMENT">Government</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="pt-2 sm:text-sm" />
                                    </FormItem>
                                )}
                            />

                        </div>
                    </>
                    )}

                {(isRoleNull === null || checkRole === 'STUDENTS') ? (
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl className="h-12">
                                    <Select value={String(field.value)} onValueChange={checkInstitutionFunction}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="STUDENTS">Student</SelectItem>
                                            <SelectItem value="INSTITUTION">Institution</SelectItem>
                                            <SelectItem value="HEALTH_CARE">Health Care</SelectItem>
                                            <SelectItem value="GOVERNMENT">Government</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="pt-2 sm:text-sm" />
                            </FormItem>
                        )}
                    />
                ) : null}
                {!session.user ? (
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
                        {isPending ? "Creating..." : "Create"}
                    </Button>
                ) : (
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
                        {isPending ? "Updating..." : "Update"}
                    </Button>
                )}


            </form>
        </Form>
    )
}
