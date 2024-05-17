"use server"

import { prisma } from "@/config/db";
import { AccountFormInput, accountFormSchema } from "@/validations/account"

export async function submitAccountForm(
    rawInput: AccountFormInput
): Promise<"error" | "success"> {
    try {
        const validatedInput = accountFormSchema.safeParse(rawInput)
        if (!validatedInput.success) return "error"

        const { name, surname, email, phone, address, institution } = validatedInput.data

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
                        id: 1
                    }
                }
            }
        })

        return updatedUser ? "success" : "error"
    } catch (error) {
        console.error(error)
        throw new Error("Error submitting account form")
    }
}