import { getInstitutions } from "@/actions/institutions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const data = await getInstitutions()

        return NextResponse.json(data, { status: 200 })
    } catch (error: any) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to fetch institutions." },
            { status: 500 }
        )
    }
}