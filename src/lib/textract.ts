import { env } from "@/env.mjs"
import { TextractClient } from "@aws-sdk/client-textract"

export const textract = new TextractClient({
    region: env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    }
});

