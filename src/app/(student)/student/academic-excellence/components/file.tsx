"use client"

import React, { useState } from 'react'

function DocumentShow() {
    const [isOpenPay, setIsOpenPay] = useState(0);

  return (
    <div className='sm:px-36 py-5'>
      <div className=''>
        <h2 className='text-3xl font-semibold mb-10'>Academic Excellence:</h2>
        <iframe
          src="https://taleemdostforum.com/Transcript.pdf"
          className="w-full h-96"
          title="PDF Preview"
        ></iframe>
        <div className='flex space-x-4 mt-5'>
          <button className='border border-gray-700 bg-gray-100 text-gray-700 text-base font-semibold rounded-md py-2 px-6
          hover:border-gray-100 hover:bg-gray-700 hover:text-gray-100 transition-all
          '>Proceed</button>

          <button className='border border-gray-100 bg-gray-700 text-gray-100 text-base font-semibold rounded-md py-2 px-6
          hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700 transition-all
          '>Reject & Re-generate</button>
        </div>
      </div>
    </div>
  )
}

export default DocumentShow