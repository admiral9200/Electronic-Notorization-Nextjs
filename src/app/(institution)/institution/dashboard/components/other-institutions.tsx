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

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 sm:space-y-0 space-y-4 sm:space-x-4'>
            {institutions.map((institution, index) => (
                <div key={index} className='border border-white rounded-md py-4 shadow-sm shadow-white'>
                    <div className='text-center'>
                        <img className='rounded-full w-12 h-12 mx-auto' src={`/images/features/${institution.logo}`} alt="" />
                        <h3 className='mt-2'>{institution.name}</h3>
                    </div>
                    <Separator className='my-3 border-white border h-0' />
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
