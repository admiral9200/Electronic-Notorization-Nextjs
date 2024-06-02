"use server"

import { prisma } from "@/config/db";
import { 
    TranscriptFormInput, 
    TranscriptOrderInput, 
    transcriptFormSchema, 
    transcriptOrderSchema 
} from "@/validations/transcript";


export async function submitTranscriptForm(
    rawInput: TranscriptFormInput
): Promise<"error" | "success"> {
    try {
        const validatedInput = await transcriptFormSchema.safeParse(rawInput)
        if (!validatedInput.success) return "error"

        return "success"
    } catch (error) {
        console.error(error)
        throw new Error("Error submitting account form")
    }
}

export async function saveTranscriptOrderToDB(
    data: TranscriptOrderInput
): Promise<"error" | "success"> {
    try {
        const validatedInput = await transcriptOrderSchema.safeParse(data)
        if (!validatedInput.success) return "error"

        const {
            id,
            userId,
            institutionId,
            recipientUniversityId,
            file,
            status
        } = validatedInput.data

        const val = await prisma.order.create({
            data: {
                id,
                userId,
                institutionId,
                recipientUniversityId,
                file,
                status
            }
        })

        if (!val) {
            return "error"
        }

        return "success"
    } catch (error) {
        console.error(error)
        throw new Error("Failed saving transcript order to db.")
    }
}