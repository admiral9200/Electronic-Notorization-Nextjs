"use server"

import { prisma } from "@/config/db";
import { InstitutionAccountFormInput, StudentAccountFormInput, institutionAccountFormSchema, studentAccountFormSchema } from "@/validations/account"
import { Role } from "@prisma/client";

export async function submitStudentAccountForm(
    rawInput: StudentAccountFormInput
): Promise<"error" | "success"> {
    try {
        const validatedInput = studentAccountFormSchema.safeParse(rawInput)
        if (!validatedInput.success) return "error"

        const {
            name,
            surname,
            email,
            phone,
            address,
            institutionId,
            role,
            photo
        } = validatedInput.data

        const updatedUser = await prisma.user.update({
            where: {
                email
            },
            data: {
                name,
                surname,
                phone,
                address,
                institution: {
                    connect: {
                        id: Number(institutionId)
                    }
                },
                role,
                image: photo
            }
        })

        return updatedUser ? "success" : "error"
    } catch (error) {
        console.error(error)
        throw new Error("Error submitting account form")
    }
}

export async function submitInstitutionAccountForm(
    rawInput: InstitutionAccountFormInput
): Promise<"error" | "success"> {
    try {
        const validatedInput = institutionAccountFormSchema.safeParse(rawInput)
        if (!validatedInput.success) return "error"

        const { 
            name, 
            email, 
            phone, 
            genre,
            location,
            logo
        } = validatedInput.data

        const createdInstitution = await prisma.institution.create({
            data: {
                name,
                location,
                email,
                logo,
                genre,
                wallet: ''
            }
        })

        const updatedUser = await prisma.user.update({
            where: {
                email
            },
            data: {
                name,
                phone,
                address: location,
                institution: {
                    connect: {
                        id: Number(createdInstitution.id)
                    }
                },
                role: Role.INSTITUTION,
                image: logo
                
            }
        })

        return updatedUser ? "success" : "error"
    } catch (error) {
        console.error(error)
        throw new Error("Error submitting account form")
    }
}