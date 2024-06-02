import { NextResponse } from "next/server"
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { v4 as uuidv4 } from 'uuid'
import { TranscriptOrderInput } from "@/validations/transcript"
import { OrderStatus } from "@prisma/client"
import { saveTranscriptOrderToDB } from "@/actions/transcript"
import { getInstitutionByUserEmail, getInstitutionIdByUserId } from "@/actions/institutions"


const pump = promisify(pipeline);

export async function POST(req: any, res: any) {
    try {
        const formData = await req.formData()

        const userId = formData.getAll('userId')[0]
        const institutionId = await getInstitutionIdByUserId(userId)

        const file = formData.getAll('transcript')[0]
        const aimedInstitutionId = formData.getAll('aimedInstitutionId')[0]

        const newFileName = uuidv4()
        const filePath = `./public/uploads/${newFileName}` + '.pdf'
        
        await pump(file.stream(), fs.createWriteStream(filePath))

        /**
         * Saving to database after uploading file..
         */
        const rawData: TranscriptOrderInput = {
            id: uuidv4(),
            userId,
            institutionId: institutionId,
            recipientUniversityId: aimedInstitutionId,
            file: filePath,
            status: OrderStatus.SUBMITTED
        }

        const response = await saveTranscriptOrderToDB(rawData)

        if(response === "error") {
            return NextResponse.json({ status: "fail" })
        }

        return NextResponse.json({ status: "success", data: filePath })
    }
    catch (e) {
        return NextResponse.json({ status: "fail", data: e })
    }
}
