"use server"

import { prisma } from "@/config/db"
import { Institution } from "@prisma/client"

export async function getInstitutions(): Promise<Institution[]> {
    try {
        return await prisma.institution.findMany()
    } catch (error) {
        console.error(error)
        throw new Error("Fetching institutions error")
    }
}