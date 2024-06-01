import { Institution, Order } from "@prisma/client";
import { Badge } from "../ui/badge";
import { TableCell, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import { getInstitutions } from "@/actions/institutions";

interface StudentOrderItemProps {
    order: Order
}

export function StudentOrderItem(
    { order }: StudentOrderItemProps
): JSX.Element {
    const [institutions, setInstitutions] = useState<Institution[]>([])

    useEffect(() => {
        async function getInstitutionsFromDB() {
            const institutions = await getInstitutions()

            if(institutions) setInstitutions(institutions)
        }

        getInstitutionsFromDB()
    }, [])

    return (
        <TableRow className="bg-accent">
            <TableCell>
                <div className="font-medium">
                    { institutions && (
                        <p>
                            { institutions.find((inst: Institution) => String(inst.id) === order.recipientUniversityId)?.name }
                        </p>
                    ) }
                </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                University
            </TableCell>
            <TableCell className="hidden sm:table-cell lowercase">
                <Badge className="text-xs" variant="secondary">
                    {order.status}
                </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {String(order.createdAt)}
            </TableCell>
            <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
    )
}