"use server"

import { prisma } from "@/config/db";
import { AccountFormInput, accountFormSchema } from "@/validations/account"

export async function submitAccountForm(
    rawInput: AccountFormInput
): Promise<"error" | "success"> {
    try {
        const validatedInput = accountFormSchema.safeParse(rawInput)
        if (!validatedInput.success) return "error"

        const { name, surname, email, phone, address, institutionId, role } = validatedInput.data

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
                role
            }
        })

        return updatedUser ? "success" : "error"
    } catch (error) {
        console.error(error)
        throw new Error("Error submitting account form")
    }
}