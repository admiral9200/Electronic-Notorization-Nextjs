import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const cardData = [
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending"
    },
    {
        name: "John Doe",
        school: "Greenwood High",
        email: "johndoe@example.com",
        recipientUniversity: "Harvard University",
        status: "Approved"
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected"
    },
    {
        name: "Alice Johnson",
        school: "Maple Leaf Academy",
        email: "alice@example.com",
        recipientUniversity: "Yale University",
        status: "Pending"
    }
];

function TranscriptStatus() {
    return (
        // <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        //     {cardData.map((data, index) => (
        //         <Card key={index} className='bg-gray-100'>
        //             <CardHeader>
        //                 <CardTitle className='text-gray-700 font-bold'>{data.name}</CardTitle>
        //             </CardHeader>
        //             <div className='border-b border-gray-600'></div>
        //             <CardContent className='border-b border-gray-600 py-6 space-y-3'>
        //                 <div className='flex space-x-2'>
        //                     <h3 className='font-bold text-gray-700'>School:</h3>
        //                     <h3 className='text-gray-600 font-semibold'>{data.school}</h3>
        //                 </div>
        //                 <div className='flex space-x-2'>
        //                     <h3 className='font-bold text-gray-700'>Email:</h3>
        //                     <h3 className='text-gray-600 font-semibold'>{data.email}</h3>
        //                 </div>
        //                 <div className='flex space-x-2'>
        //                     <h3 className='font-bold text-gray-700'>Recipient University:</h3>
        //                     <h3 className='text-gray-600 font-semibold'>{data.recipientUniversity}</h3>
        //                 </div>
        //             </CardContent>
        //             <CardFooter className='pt-3 flex space-x-2'>
        //                 <h3 className='font-bold text-gray-700'>Status:</h3>
        //                 <h3 className='text-gray-600 font-semibold'>{data.status}</h3>
        //             </CardFooter>
        //         </Card>
        //     ))}
        // </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {cardData.map((data, index) => (
            <Card key={index}>
                <CardHeader>
                    <CardTitle className=' font-bold'>{data.name}</CardTitle>
                </CardHeader>
                <div className='border-b border-gray-600'></div>
                <CardContent className='border-b border-gray-600 py-6 space-y-3'>
                    <div className='flex items-center space-x-2'>
                        <h3 className='font-bold '>School:</h3>
                        <h3 className='text-gray-400 text-sm font-semibold'>{data.school}</h3>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h3 className='font-bold '>Email:</h3>
                        <h3 className='text-gray-400 text-sm font-semibold'>{data.email}</h3>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h3 className='font-bold '>Recipient University:</h3>
                        <h3 className='text-gray-400 text-sm font-semibold'>{data.recipientUniversity}</h3>
                    </div>
                </CardContent>
                <CardFooter className='pt-3 flex space-x-2'>
                    <h3 className='font-bold '>Status:</h3>
                    <h3 className='text-gray-400 text-sm font-semibold'>{data.status}</h3>
                </CardFooter>
            </Card>
        ))}
    </div>
    )
}

export default TranscriptStatus
