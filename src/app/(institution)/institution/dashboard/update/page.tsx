import { InstitueAccountForm } from '@/components/forms/institute-account-form'
import React from 'react'

function UpdateInstitution() {
  return (
    <>
        <div className="px-12 sm:px-18 md:px-24 lg:px-36 py-20">
            <h2 className='text-3xl font-bold text-center pb-16'>Update Account</h2>
            <InstitueAccountForm/>
        </div>
    </>
   
  )
}

export default UpdateInstitution