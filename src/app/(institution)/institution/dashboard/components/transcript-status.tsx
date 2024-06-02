"use client"

import { getOrdersByInstitutionId } from '@/actions/orders'
import { Input } from '@/components/ui/input'
import { Order, OrderStatus } from '@prisma/client'
import React, { useEffect, useState } from 'react'

/**
 * This component is used to display all of the orders...
 * @returns 
 */
interface TranscriptStatusProps {
    institutionId: string
}

export default function TranscriptStatus(
    { institutionId }: TranscriptStatusProps
): JSX.Element {
    // States...
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [orders, setOrders] = useState<Order[] | null>(null)
    const recordsPerPage = 10


    /**
     * Pagination and filter...
     */
    // const filteredData = cardData.filter(user =>
    //     user.name.toLowerCase().includes(searchQuery.toLowerCase())
    // )

    const indexOfLastRecord = currentPage * recordsPerPage
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
    // const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord)
    // const currentRecords = orders

    // const totalPages = Math.ceil(filteredData.length / recordsPerPage)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)


    /**
     * Fetching orders with institution id...
     */
    // const orders = await getOrdersByInstitutionId(institutionId)

    const currentRecords = []

    useEffect(() => {
        async function fetchOrders() {
            const orders = await getOrdersByInstitutionId(institutionId)

            if(orders) {
                setOrders(orders)
            }
        }
        
        if(!orders) {
            fetchOrders()
        }
    }, [orders])

    /**
     * This function is used to get color of status for each order...
     * @param status 
     * @returns 
     */
    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.SUBMITTED:
                return 'bg-blue-500'
            case OrderStatus.PENDING:
                return 'bg-yellow-500'
            case OrderStatus.ACCEPTED:
                return 'bg-green-500'
            case OrderStatus.APPROVED:
                return 'bg-gray-100'
            case OrderStatus.REJECTED:
                return 'bg-red-500'
            default:
                return 'bg-gray-500'
        }
    }

    return (
        <div className="relative shadow-md sm:rounded-lg">
            <div className=' mb-4'>
                <Input type="text"
                    placeholder="Search Student"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-[20%]' />
            </div>
            <div className="h-[400px] overflow-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <h4 className='w-max'>
                                    Name
                                </h4>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <h4 className='w-max'>
                                    School
                                </h4>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <h4 className='w-max'>
                                    RecipientUniversity
                                </h4>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <h4 className='w-max'>
                                    Status
                                </h4>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((user, index) => (
                            <tr
                                key={index}
                                className="border bg-transparent hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {/* <img className="w-9 h-9 rounded-full" src={user.imgSrc} alt={`${user.name} image`} /> */}
                                    <div className="ps-3">
                                        <div className="text-sm font-semibold">{user.userId}</div>
                                        <div className="font-normal text-xs text-gray-300">{user.userId}</div>
                                    </div>
                                </th>
                                <td className="text-sm text-gray-100 px-6 py-3">
                                    <h4 className='w-max'> {user.institutionId}</h4>
                                </td>
                                <td className="text-sm text-gray-100 px-6 py-3">
                                    <h4 className='w-max'> {user.recipientUniversityId}</h4>
                                </td>
                                <td className="px-6 py-3">
                                    <div className="flex items-center">
                                        <div
                                            className={`h-2.5 w-2.5 rounded-full  ${getStatusColor(user.status)} me-2`}
                                        />
                                        <h4 className='text-gray-100 text-sm'>{user.status}</h4>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div className="flex justify-end mt-5">
                <nav>
                    <ul className="inline-flex items-center space-x-2 mr-5">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => paginate(index + 1)}
                                    className={`w-7 h-7 text-xs rounded-full leading-tight border border-gray-500 hover:bg-gray-100 hover:text-black ${currentPage === index + 1 ? 'bg-white text-black' : 'bg-gray-700 text-white'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div> */}
        </div>
    )
}
