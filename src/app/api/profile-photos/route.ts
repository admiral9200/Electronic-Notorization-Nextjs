import { NextResponse } from "next/server";
import path from 'path';
import fs from 'fs';

export async function POST(req: Request) {
    try {
        const fileName = await req.json()
        const filePath = path.join(process.cwd(), fileName)

        if (fs.existsSync(filePath)) {
            return NextResponse.json(
                filePath,
                { status: 200 }
            )
        } else {
            return NextResponse.json(
                { error: "Failed to find photo." },
                { status: 500 }
            )
        }
    } catch (error: any) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed retrieving file" },
            { status: 500 }
        )
    }
}