import * as z from "zod"

export const transcriptFormSchema = z.object({
    userId: z
        .string({
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
    transcript: z
        .instanceof(File)
        .refine((file) => file.size !== 0, "Please upload a pdf transcript file"),
})

export type TranscriptFormInput = z.infer<typeof transcriptFormSchema>