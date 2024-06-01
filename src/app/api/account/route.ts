import { NextResponse } from "next/server"
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { v4 as uuidv4 } from 'uuid'


const pump = promisify(pipeline);


export async function POST(req: any, res: any) {
    try {
        const formData = await req.formData()

        const file = formData.getAll('profile_photo')[0]
        const fileName = file.name;

        // Extract the file extension
        const fileExtension = fileName.split('.').pop();

        const newFileName = `${uuidv4()}.${fileExtension}`;
        const filePath = `./public/profile_photos/${newFileName}`;

        await pump(file.stream(), fs.createWriteStream(filePath))

        return NextResponse.json({ status: "success", data: filePath })
    }
    catch (e) {
        return NextResponse.json({ status: "fail", data: e })
    }
}