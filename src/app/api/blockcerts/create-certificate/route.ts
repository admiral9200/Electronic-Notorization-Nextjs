import { NextResponse } from "next/server"
import schema from '@blockcerts/schemas/schemas/3.2/schema.json'
import Ajv from 'ajv'

export async function POST(req: Request) {
//   const ajv = new Ajv()
// const validate = ajv.compile(schema)
  const generateCertificate = async (recipientData: any, transcriptData: any, issuerData: any) => {
    const template = {
      "@context": [
        "https://w3id.org/openbadges/v2",
        "https://w3id.org/blockcerts/v2"
      ],
      "type": [
        "VerifiableCredential",
        "BlockcertsCredential"
      ],
      "issuer": issuerData,
      "issuanceDate": new Date().toISOString(),
      "credentialSubject": {
        "id": `did:example:23adb1f712ebc6f1c276eba4dfa`,
        "givenName": recipientData.name,
        "familyName": "",
        "transcript": transcriptData
      }
    };

    // const valid = validate(template)

    // if (!valid) {
    //   throw new Error(`Certificate schema validation failed: ` + JSON.stringify(validate.errors))
    // }

    return template
  }

  try {
    const { recipientData, transcriptData, issuerData } = await req.json()
    const certificate = await generateCertificate(recipientData, transcriptData, issuerData)

    return NextResponse.json(
      { certificate },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed!" },
      { status: 500 }
    )
  }
}