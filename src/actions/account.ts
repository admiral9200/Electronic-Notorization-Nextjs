"use server"

import { prisma } from "@/config/db";
import { AccountFormInput, accountFormSchema } from "@/validations/account"

export async function submitAccountForm(
    rawInput: AccountFormInput
): Promise<"error" | "success"> {
    try {
        const validatedInput = accountFormSchema.safeParse(rawInput)
        if (!validatedInput.success) return "error"

        const { name, surname, email, phone, address, institution } = validatedInput.data;

        

        return "success"
    } catch (error) {
        console.error(error)
        throw new Error("Error submitting account form")
    }
}