import * as z from "zod"

const fileSchema = z.object({
    name: z.string().refine((name) => name.endsWith('.pdf'), 'File must be a PDF'),
    type: z.literal('application/pdf'),
    size: z.number().max(5 * 1024 * 1024, 'File size must not exceed 5MB')
})

export const transcriptFormSchema = z.object({
    userId: z
        .number({
            required_error: "User Id is required"
        }),
    name: z
        .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
        .max(128, {
            message: "Name must be made of at most 128 characters",
        }),
    institutionId: z
        .string({ required_error: "Institution id must be selected." }),
    aimedInstitutionId: z
        .string({ required_error: "Recipient university id must be selected." }),
    transcript: z.union([
        fileSchema,
        z.null()
    ])
})

export type TranscriptFormInput = z.infer<typeof transcriptFormSchema>