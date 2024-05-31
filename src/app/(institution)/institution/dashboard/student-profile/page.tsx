import React from 'react'

function StudentProfile() {
  return (
    <div className='py-36'>
      <div className='bg-white w-3/4 mx-auto rounded-lg py-8 pb-12'>
        <div className='flex justify-between items-center border-b border-gray-500  px-5 pb-5'>
          <img className="w-24 h-24 rounded-full border border-white" src="/images/avatars/pjborowiecki.jpeg" alt="Preview" />
          <div className='text-right'>
            <h3 className="text-xl font-bold text-black">Christopher</h3>
            <h3 className="text-lg font- text-black">Smith</h3>
          </div>
        </div>
        <div className='flex justify-between space-x-5 px-5 py-5'>
          <div className='w-full'>
            <h3 className="text-md font-bold text-black">Phone Number: </h3>
            <h3 className="text-md font-semibold text-black border-gray-400 border w-full px-2 py-2 rounded-md mt-2">(938) 1738-403</h3>
          </div>
          <div className='w-full'>
            <h3 className="text-md font-bold text-black">Email: </h3>
            <h3 className="text-md font-semibold text-black border-gray-400 border w-full px-2 py-2 rounded-md mt-2">Christopher@smith.com</h3>
          </div>
        </div>
        <div className='flex justify-between space-x-5 px-5'>
          <div className='w-full'>
            <h3 className="text-md font-bold text-black">Address: </h3>
            <h3 className="text-md font-semibold text-black border-gray-400 border w-full px-2 py-2 rounded-md mt-2">2618 Ocala Street United States</h3>
          </div>
          <div className='w-full'>
            <h3 className="text-md font-bold text-black">Institution: </h3>
            <h3 className="text-md font-semibold text-black border-gray-400 border w-full px-2 py-2 rounded-md mt-2">Harvard University</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile