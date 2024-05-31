"use client"

import { Button } from "@/components/ui/button";

import { Certificate } from '@blockcerts/cert-verifier-js';
import { useState } from "react";

export default function Page() {
    const transcriptData = {
        "name": "Jane Doe",
        "id": "did:example:student123456",
        "degree": {
            "type": "HighSchoolDiploma",
            "name": "High School Diploma",
            "awardedOn": "2023-05-30"
        },
        "attendance": {
            "startDate": "2019-09-01",
            "endDate": "2023-05-30"
        },
        "school": {
            "name": "Sunshine High School",
            "address": {
                "line1": "123 Education Avenue",
                "city": "Learning Town",
                "state": "CA",
                "postalCode": "12345",
                "country": "USA"
            }
        },
        "courses": [
            {
                "name": "English Literature",
                "code": "ENG301",
                "grade": "A",
                "credits": 4
            },
            {
                "name": "Calculus",
                "code": "MATH303",
                "grade": "B+",
                "credits": 4
            },
            {
                "name": "World History",
                "code": "HIST202",
                "grade": "A-",
                "credits": 3
            },
            {
                "name": "Biology",
                "code": "BIO101",
                "grade": "A",
                "credits": 4
            }
        ],
        "signatureLines": [
            {
                "image": "data:image/png;base64,iVBORw0K...",
                "name": "Principal Jonathan Smith",
                "jobTitle": "Principal",
                "description": "I certify that the above statements are true and correct to the best of my knowledge."
            }
        ],
        "overallGPA": "3.8"
    }

    const [recipientData, setRecipientData] = useState({ email: "recipient@gmail.com", name: "recipient" })
    const [issuerData, setIssuerData] = useState("https://raw.githubusercontent.com/blockchain-certificates/cert-issuer/master/examples/issuer/profile.json")
    const [certificate, setCertificate] = useState(null)
    const [signedCertificate, setSignedCertificate] = useState(null)
    const [verificationResult, setVerificationResult] = useState(null)


    const handleGenerateCertificate = async () => {
        try {
            const response = await fetch('/api/blockcerts/create-certificate', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipientData, transcriptData, issuerData })
            })

            const data = await response.json()

            if(response.ok) {
                setCertificate(data.certificate)
            } else {
                console.log("error")
            }
        } catch (error) {
            console.error(error)
        }
    } 

    

    return (
        <div className="min-h-screen flex justify-center items-center">
            <Button
                onClick={handleGenerateCertificate}
            >
                Sign my transcript
            </Button>
        </div>
    )
}