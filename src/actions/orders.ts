"use server"

import { prisma } from "@/config/db";
import { Order } from "@prisma/client";

export async function getOrdersByUserEmail(email: string): Promise<Order[] | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        console.log("user: ", user)

        if(!user) return null

        const orders = await prisma.order.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 3
        })

        return orders
    } catch (error) {
        console.error(error)
        return null
    }
}