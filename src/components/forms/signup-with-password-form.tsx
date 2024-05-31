"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { signUpWithPassword } from "@/actions/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  signUpWithPasswordSchema,
  type SignUpWithPasswordFormInput,
} from "@/validations/auth"

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
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"

export function SignUpWithPasswordForm(): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = React.useTransition()
  const [userType, setUserType] = React.useState(null);

  const form = useForm<SignUpWithPasswordFormInput>({
    resolver: zodResolver(signUpWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(formData: SignUpWithPasswordFormInput): void {
    startTransition(async () => {
      try {
        const message = await signUpWithPassword({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          userType: userType,
        })

        switch (message) {
          case "exists":
            toast({
              title: "User with this email address already exists",
              description: "If this is you, please sign in instead",
              variant: "destructive",
            })
            form.reset()
            break
          case "success":
            toast({
              title: "Success!",
              description: "Check your inbox to verify your email address",
            })
            router.push("/signin")
            break
          default:
            toast({
              title: "Something went wrong",
              description: "Please try again",
              variant: "destructive",
            })
            console.error(message)
        }
      } catch (error) {
        console.error(error)
        toast({
          title: "Something went wrong",
          description: "Please try again",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johnsmith@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        {/* <div className="flex justify-center space-x-3 my-2">
          <div>
            <input
              type="radio"
              id="student"
              className="peer hidden"
              checked={userType === 'student'}
              onChange={() => setUserType('student')}
            />
            <label
              htmlFor="student"
              className={`select-none cursor-pointer rounded-md border-2 border-white
               py-2 px-6 font-semibold text-sm transition-colors duration-200 ease-in-out ${userType === 'student'
                  ? 'bg-white text-gray-900 border-white'
                  : 'text-white'
                }`}
            >
              Student
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="institution"
              className="peer hidden"
              checked={userType === 'institution'}
              onChange={() => setUserType('institution')}
            />
            <label
              htmlFor="institution"
              className={`select-none cursor-pointer rounded-md border-2 border-white
              py-2 px-6 font-semibold text-sm transition-colors duration-200 ease-in-out ${userType === 'institution'
                  ? 'bg-white text-gray-900 border-white'
                  : 'text-white'
                }`}
            >
              Institution
            </label>
          </div>
        </div> */}

        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Icons.spinner
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
              <span>Signing up...</span>
            </>
          ) : (
            <span>Continue</span>
          )}
          <span className="sr-only">
            Continue signing up with email and password
          </span>
        </Button>
      </form>
    </Form>
  )
}
