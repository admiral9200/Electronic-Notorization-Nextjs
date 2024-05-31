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


const studentTranscripts = [
    {
        name: "John Doe",
        email: "john.doe@example.com",
        recipientUniversity: "University of Oxford",
        phone: "+1234567890",
        arrivedTime: "2024-05-30T10:00:00",
    },
    {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        recipientUniversity: "Harvard University",
        phone: "+1987654321",
        arrivedTime: "2024-05-30T11:30:00",
    },
    {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        recipientUniversity: "Stanford University",
        phone: "+1122334455",
        arrivedTime: "2024-05-30T09:45:00",
    },
    {
        name: "Bob Brown",
        email: "bob.brown@example.com",
        recipientUniversity: "Yale University",
        phone: "+1555666777",
        arrivedTime: "2024-05-30T12:15:00",
    },
    {
        name: "Emma White",
        email: "emma.white@example.com",
        recipientUniversity: "Columbia University",
        phone: "+1444333222",
        arrivedTime: "2024-05-30T08:55:00",
    },
];

studentTranscripts.forEach(student => {
    const arrivedTime = new Date(student.arrivedTime);
    const formattedTime = arrivedTime.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
    student.arrivedTime = formattedTime;
});



function NotificationsFromStudents() {
    return (
        <div className="border border-gray-500 rounded-md overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className='bg-gray-700'>
                        <TableHead className="text-white font-semibold border border-gray-500"><h4 className='w-max'>Name</h4></TableHead>
                        <TableHead className="text-white font-semibold border border-gray-500"><h4 className='w-max'>Email</h4></TableHead>
                        <TableHead className="text-white font-semibold border border-gray-500"><h4 className='w-max'>Recipient University</h4></TableHead>
                        <TableHead className="text-white font-semibold border border-gray-500"><h4 className='w-max'>Phone</h4></TableHead>
                        <TableHead className="text-white font-semibold border border-gray-500"><h4 className='w-max'>Arrived</h4> Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {studentTranscripts.map((student, index) => (
                        <TableRow key={index} className='border-b border-gray-500'>
                            <TableCell className='text-gray-300 border border-gray-500'><h4 className='py-1 w-max'>{student.name}</h4></TableCell>
                            <TableCell className='text-gray-300 border border-gray-500'><h4 className='py-1 w-max'>{student.email}</h4></TableCell>
                            <TableCell className='text-gray-300 border border-gray-500'><h4 className='py-1 w-max'>{student.recipientUniversity}</h4></TableCell>
                            <TableCell className='text-gray-300 border border-gray-500'><h4 className='py-1 w-max'>{student.phone}</h4></TableCell>
                            <TableCell className='text-gray-300 border border-gray-500'><h4 className='py-1 w-max'>{student.arrivedTime}</h4></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default NotificationsFromStudents;
