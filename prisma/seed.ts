import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    await prisma.institution.createMany({
        data: [
            {
                name: 'University of Oxford',
                location: 'Oxford, UK',
                email: 'info@ox.ac.uk',
                wallet: '0x0F013694b8eBf9Eb793661d2A4fC74AB5b4ce8b6',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'UNIVERSITY',
            },
            {
                name: 'Massachusetts Institute of Technology',
                location: 'Cambridge, USA',
                email: 'info@mit.edu',
                wallet: '0x987654321fedcba',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'UNIVERSITY',
            },
            {
                name: 'Harvard University',
                location: 'Cambridge, USA',
                email: 'info@harvard.edu',
                wallet: '0xdeadbeefcafebabe',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'UNIVERSITY',
            },
            {
                name: 'Stanford University',
                location: 'Stanford, USA',
                email: 'info@stanford.edu',
                wallet: '0xabcd1234efgh56781',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'UNIVERSITY',
            },
            {
                name: 'University of California, Berkeley',
                location: 'Berkeley, USA',
                email: 'info@berkeley.edu',
                wallet: '0x1234abcd5678efgh',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'UNIVERSITY',
            },
            {
                name: 'Yale University',
                location: 'New Haven, USA',
                email: 'info@yale.edu',
                wallet: '0xfedcba9876543210',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'UNIVERSITY',
            },
            {
                name: 'California Institute of Technology',
                location: 'Pasadena, USA',
                email: 'info@caltech.edu',
                wallet: '0xabcdef0123456789',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'UNIVERSITY',
            },
            {
                name: 'Princeton University',
                location: 'Princeton, USA',
                email: 'info@princeton.edu',
                wallet: '0x9876543210fedcbadbs',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'UNIVERSITY',
            },
            {
                name: 'Columbia University',
                location: 'New York City, USA',
                email: 'info@columbia.edu',
                wallet: '0x1234567890abcdef11',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'UNIVERSITY',
            },
            {
                name: 'University of Chicago',
                location: 'Chicago, USA',
                email: 'info@uchicago.edu',
                wallet: '0xfedcba0987654321809',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'UNIVERSITY',
            },
            {
                name: 'Acme Technical College',
                location: 'San Francisco, USA',
                email: 'info@acmetechcollege.edu',
                wallet: '0x1234abcd5678efgh9087',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'COLLEGE',
            },
            {
                name: 'Bluesky Community College',
                location: 'Seattle, USA',
                email: 'info@blueskycollege.edu',
                wallet: '0xabcd1234efgh56865578',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'COLLEGE',
            },
            {
                name: 'Evergreen High School',
                location: 'Portland, USA',
                email: 'info@evergreenhs.org',
                wallet: '0x123456789089770abcdef',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'SCHOOL',
            },
            {
                name: 'Oakwood Academy',
                location: 'Chicago, USA',
                email: 'info@oakwoodacademy.org',
                wallet: '0xfedcba09876543219086544',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'SCHOOL',
            },
            {
                name: 'Willow Preparatory School',
                location: 'New York City, USA',
                email: 'info@willowprep.org',
                wallet: '0x9876543210fedcbadb8779',
                logo: 'https://jterrencemedia.wordpress.com/wp-content/uploads/2012/11/wb.jpg',
                genre: 'SCHOOL',
            },
        ],
    });

    console.log('Data seeded successfully!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });