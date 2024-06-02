import { OrderStatus } from "@prisma/client"
import * as z from "zod"

export const transcriptFormSchema = z.object({
    userId: z
        .string({
            required_error: "User Id is required"
        }),
    aimedInstitutionId: z
        .string({ required_error: "Recipient university id must be selected." }),
    transcript: z
        .instanceof(File)
        .refine((file) => file.size !== 0, "Please upload a pdf transcript file")
        .optional()
})

export const transcriptOrderSchema = z.object({
    id: z
        .string(),
    userId: z
        .string()
        .min(1, "User Id is required"),
    institutionId: z
        .string()
        .min(1, "Institution Id is required"),
    recipientUniversityId: z
        .string()
        .min(1, "Recipient University Id is required"),
    file: z
        .string()
        .min(1, "File path is required"),
    status: z
        .nativeEnum(OrderStatus)
        .default(OrderStatus.SUBMITTED)
})


export type TranscriptFormInput = z.infer<typeof transcriptFormSchema>
export type TranscriptOrderInput = z.infer<typeof transcriptOrderSchema>