// "use client"

import { getInstitutions } from "@/actions/institutions"
import { TranscriptSubmitForm } from "@/components/forms/transcript-submit-form"

export default async function FeaturesPage({ params }: { params: { id: string } }): Promise<JSX.Element> {
  const institutions = await getInstitutions()
  return (
    <div className="flex min-h-screen flex-col w-full items-center justify-center">
      <TranscriptSubmitForm
        id={params.id}
        institutions={institutions}
      />
    </div>
  )
}
