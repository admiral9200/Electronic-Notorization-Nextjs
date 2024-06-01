import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const cardData = [
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "John Doe",
        school: "Greenwood High",
        email: "johndoe@example.com",
        recipientUniversity: "Harvard University",
        status: "Approved",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Alice Johnson",
        school: "Maple Leaf Academy",
        email: "alice@example.com",
        recipientUniversity: "Yale University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "John Doe",
        school: "Greenwood High",
        email: "johndoe@example.com",
        recipientUniversity: "Harvard University",
        status: "Approved",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Jane Doe",
        school: "Sunnydale High",
        email: "janedoe@example.com",
        recipientUniversity: "MIT",
        status: "Rejected",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
    {
        name: "Adword Smith",
        school: "Oakwood Academy",
        email: "smith@john.com",
        recipientUniversity: "Stanford University",
        status: "Pending",
        imgSrc: '/images/avatars/rafalkowalski.jpeg'
    },
];

function TranscriptStatus() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-blue-500';
            case 'Pending':
                return 'bg-yellow-500';
            case 'Created':
                return 'bg-green-500';
            case 'Rejected':
            case 'Failed':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const filteredData = cardData.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredData.length / recordsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="relative shadow-md sm:rounded-lg">
            <div className=' mb-4'>
                <Input type="text"
                    placeholder="Search Student"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-[20%]'/>
                {/* <input
                    
                    className="bg-transparent focus-visible:border-gray-400 lg:w-1/6 border border-gray-400 text-gray-200 placeholder:text-gray-200 placeholder:text-sm text-sm rounded-sm block w-full px-2.5 py-1.5"
                /> */}
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
                        {currentRecords.map((user, index) => (
                            <tr
                                key={index}
                                className="border bg-transparent hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <img className="w-9 h-9 rounded-full" src={user.imgSrc} alt={`${user.name} image`} />
                                    <div className="ps-3">
                                        <div className="text-sm font-semibold">{user.name}</div>
                                        <div className="font-normal text-xs text-gray-300">{user.email}</div>
                                    </div>
                                </th>
                                <td className="text-sm text-gray-100 px-6 py-3">
                                   <h4 className='w-max'> {user.school}</h4>
                                </td>
                                <td className="text-sm text-gray-100 px-6 py-3">
                                   <h4 className='w-max'> {user.recipientUniversity}</h4>
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
            <div className="flex justify-end mt-5">
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
            </div>
        </div>
    );
}

export default TranscriptStatus;