"use client"

import { useEffect, useState } from "react";
import { TableBody } from "../ui/table";
import { StudentOrderItem } from "./order-item";
import { Order } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getOrdersByUserEmail } from "@/actions/orders";


/**
 * This component is used to display the list of students' recent orders...
 * @returns JSX
 */
export function StudentRecentOrdersList(): JSX.Element {
    const session = useSession()

    // states...
    const [orders, setOrders] = useState<Order[] | null>(null)

    useEffect(() => {
        async function getOrders() {
            try {
                if (session.data?.user.email) {
                    const result = await getOrdersByUserEmail(session.data?.user.email)

                    if (result) setOrders(result)
                }
            } catch (error) {
                console.error(error)
            }
        }

        getOrders()
    }, [session.data?.user.email])

    return (
        <TableBody>
            {orders?.map((order) => (
                <StudentOrderItem key={order.id} order={order} />
            ))}
        </TableBody>
    )
}