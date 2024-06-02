"use server"

import { prisma } from "@/config/db";
import { StudentAccountFormInput, studentAccountFormSchema } from "@/validations/account"

export async function submitAccountForm(
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