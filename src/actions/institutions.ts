"use server"

import { prisma } from "@/config/db"
import { Institution } from "@prisma/client"

export async function getInstitutions(): Promise<Institution[]> {
    try {
        return await prisma.institution.findMany({ include: { users: true } })
    } catch (error) {
        console.error(error)
        throw new Error("Fetching institutions error")
    }
}

export async function getInstitutionByUserEmail(email: string | undefined): Promise<Institution | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                institution: true
            }
        })

        if (!user || !user.institution) {
            return null
        }

        return user.institution
    } catch (error) {
        console.error(error)
        throw Error("Fetching institutions error by user email.")
    }
}

export async function getInstitutionIdByUserId(userId: string | undefined): Promise<string> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            return "error"
        }

        return String(user.institutionId)
    } catch (error) {
        console.error(error)
        throw Error("Fetching institution id error by user id")
    }
}