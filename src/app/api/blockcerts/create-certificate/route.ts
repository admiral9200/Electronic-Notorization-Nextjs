import { NextResponse } from "next/server"
// import didJWT from 'did-jwt'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  const didJWT = require('did-jwt')
  const signer = didJWT.ES256KSigner(didJWT.hexToBytes('278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f'))
  let jwt = await didJWT.createJWT(
    { aud: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', iat: undefined, name: 'uPort Developer' },
    { issuer: 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74', signer },
    { alg: 'ES256K' }
  )

  const generateCertificate = async (recipientData: any, transcriptData: any, issuerData: any) => {
    const certificate = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.blockcerts.org/schema/3.0-alpha/context.json",
        "https://www.w3.org/2018/credentials/v1",
        {
          "metadataJson": {
            "@id": "https://schemas.learningmachine.com/2017/blockcerts/metadata",
            "@type": "https://schemas.learningmachine.com/2017/types/text/json"
          },
          "displayHtml": {
            "@id": "https://schemas.learningmachine.com/2017/blockcerts/displayHtml",
            "@type": "https://schemas.learningmachine.com/2017/types/text/html"
          },
          "nonce": {
            "@id": "https://schemas.learningmachine.com/2017/blockcerts/nonce",
            "@type": "https://schema.org/Text"
          },
          "universalIdentifier": {
            "@id": "https://schemas.learningmachine.com/2017/blockcerts/identifier",
            "@type": "https://schema.org/Text"
          }
        }
      ],
      "id": `urn:uuid:${uuidv4()}`,
      "metadataJson": "{\"schema\":{\"$schema\":\"http://json-schema.org/draft-04/schema#\",\"type\":\"object\",\"properties\":{\"displayOrder\":{\"type\":\"array\",\"items\":{\"type\":\"string\"}},\"certificate\":{\"order\":[],\"type\":\"object\",\"properties\":{\"issuingInstitution\":{\"title\":\"Issuing Institution\",\"type\":\"string\",\"default\":\"Learning Machine Technologies, Inc.\"}}},\"recipient\":{}}},\"certificate\":{\"issuingInstitution\":\"Learning Machine Technologies, Inc.\"},\"recipient\":{},\"displayOrder\":[\"certificate.issuingInstitution\"]}",
      "displayHtml": "<b>hello world</b>",
      "nonce": "814ce340-12f3-414b-af91-a0f9489e5dbc",
      "universalIdentifier": "ab569127-34bb-5784-bced-00b7e0e82ac9",
      "type": [
        "VerifiableCredential",
        "BlockcertsCredential"
      ],
      "issuer": issuerData,
      "issuanceDate": new Date().toISOString(),
      "credentialSubject": {
        "id": jwt,
        "givenName": recipientData.name,
        "familyName": "",
        "transcript": transcriptData.transcript
      }
    };

    return certificate
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