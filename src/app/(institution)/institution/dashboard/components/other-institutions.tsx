import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Separator } from '@/components/ui/separator';

const institutions = [
    {
        name: "University of Oxford",
        location: "New York, USA",
        logo: "wb.webp",
        type: "University",
    },
    {
        name: "Harvard University",
        location: "London, UK",
        logo: "wb.webp",
        type: "College",
    },
    {
        name: "Stanford University",
        location: "Sydney, Australia",
        logo: "wb.webp",
        type: "Institute",
    },
    {
        name: "Yale University",
        location: "Tokyo, Japan",
        logo: "wb.webp",
        type: "University",
    },
    {
        name: "Columbia University",
        location: "Berlin, Germany",
        logo: "wb.webp",
        type: "College",
    },
];

function OtherInstitutions() {
    return (
        // <div className="border border-gray-500 rounded-md overflow-hidden">
        //     <Table>
        //         <TableHeader>
        //             <TableRow>
        //                 <TableHead className="text-white font-semibold"><h4 className='ml-2'>Logo</h4></TableHead>
        //                 <TableHead className="text-white font-semibold">Name</TableHead>
        //                 <TableHead className='text-white font-semibold'>Location</TableHead>
        //                 <TableHead className='text-white font-semibold'>Type</TableHead>
        //             </TableRow>
        //         </TableHeader>
        //         <TableBody>
        //             {institutions.map((institution, index) => (
        //                 <TableRow key={index} className='border-b border-gray-500'>
        //                     <TableCell className='text-gray-400'><img className='rounded-full w-8 h-8 my-1 ml-2' src={`/images/features/${institution.logo}`} alt="" /></TableCell>
        //                     <TableCell className='text-gray-400'>{institution.name}</TableCell>
        //                     <TableCell className='text-gray-400' >{institution.location}</TableCell>
        //                     <TableCell className='text-gray-400' >{institution.type}</TableCell>
        //                 </TableRow>
        //             ))}
        //         </TableBody>
        //     </Table>
        // </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 space-x-4'>
            {institutions.map((institution, index) => (
                <div key={index} className='border border-gray-500 rounded-md py-4'>
                    <div className='text-center'>
                        <img className='rounded-full w-12 h-12 mx-auto' src={`/images/features/${institution.logo}`} alt="" />
                        <h3 className='mt-2'>{institution.name}</h3>
                    </div>
                    <Separator className='my-2 border-gray-500 border' />
                    <div className='flex space-x-2 justify-center'>
                        <h4 className='text-gray-300 text-sm' >{institution.location}</h4>
                        <span>-</span>
                        <h4 className='text-gray-300 text-sm' >{institution.type}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OtherInstitutions;
