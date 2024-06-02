"use server"

import { prisma } from "@/config/db";
import { Order } from "@prisma/client";


/**
 * This function is used to get orders by user email...
 * @param email 
 * @returns Promise<Order[] | null>
 */
export async function getOrdersByUserEmail(email: string): Promise<Order[] | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) return null

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

/**
 * This function is used to get all of orders with institution id...
 * @param institutionId 
 * @returns Promise<Order[] | null>
 */
export async function getOrdersByInstitutionId(institutionId: string): Promise<Order[] | null> {
    try {
        const orders = await prisma.order.findMany({
            where: {
                institutionId: institutionId
            }
        })

        console.log(orders, institutionId)

        if (!orders) return null

        return orders
    } catch (error) {
        console.error(error)
        return null
    }
}