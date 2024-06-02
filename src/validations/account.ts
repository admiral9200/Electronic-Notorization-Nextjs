import * as z from "zod"
import { emailSchema } from "./email"
import { InstitutionType, Role } from "@prisma/client"

export const studentAccountFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .max(128, {
      message: "Name must be made of at most 128 characters",
    }),
  surname: z
    .string({
      required_error: "Surname is required",
      invalid_type_error: "Surname must be a string",
    })
    .max(128, {
      message: "Surname must be at most 128 characters",
    }),
  email: emailSchema,
  address: z
    .string({
      required_error: "Address is required"
    }),
  phone: z.
    string()
    .min(10, 'Phone number must be at least 10 characters long')
    .max(15, 'Phone number must be at most 15 characters long')
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, 'Invalid phone number format'),
  institutionId: z
    .string({ required_error: "Institution id must be selected." }),
  role: z
    .nativeEnum(Role),
  photo: z
    .string({ required_error: "Photo required" })
})



export const institutionAccountFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .max(128, {
      message: "Name must be made of at most 128 characters",
    }),
  email: emailSchema,
  location: z
    .string({
      required_error: "Location is required"
    }),
  phone: z.
    string()
    .min(10, 'Phone number must be at least 10 characters long')
    .max(15, 'Phone number must be at most 15 characters long')
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, 'Invalid phone number format'),
  genre: z
    .nativeEnum(InstitutionType),
  logo: z
    .string({ required_error: "Logo required" })
})

export type StudentAccountFormInput = z.infer<typeof studentAccountFormSchema>
export type InstitutionAccountFormInput = z.infer<typeof institutionAccountFormSchema>

