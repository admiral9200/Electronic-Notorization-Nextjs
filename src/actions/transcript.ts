"use server"

import { prisma } from "@/config/db";
import { TranscriptFormInput, transcriptFormSchema } from "@/validations/transcript";

export async function submitTranscriptForm(
    rawInput: TranscriptFormInput
): Promise<"error" | "success"> {
    try {
        const validatedInput = await transcriptFormSchema.safeParse(rawInput)
        if (!validatedInput.success) return "error"

       console.log("submitted data: ", validatedInput.data)

        return "success"
    } catch (error) {
        console.error(error)
        throw new Error("Error submitting account form")
    }
}