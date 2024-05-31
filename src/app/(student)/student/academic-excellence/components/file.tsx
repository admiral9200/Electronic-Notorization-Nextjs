"use client"

import React, { useState } from 'react'

function DocumentShow() {
    const [isOpenPay, setIsOpenPay] = useState(false);

    return (
        <div className={`sm:px-20 py-5 ${isOpenPay ? 'flex justify-between space-x-5' : ''}`}>
            <div className={`${isOpenPay ? 'w-[70%]' : ''}`}>
                <h2 className='text-3xl font-semibold mb-10'>Academic Excellence:</h2>
                <iframe
                    src="https://taleemdostforum.com/Transcript.pdf"
                    className="w-full h-96"
                    title="PDF Preview"
                ></iframe>
                <div className='flex space-x-4 mt-5'>
                    <button className='border border-gray-700 bg-gray-100 text-gray-700 text-base font-semibold rounded-md py-2 px-6 hover:border-gray-100 hover:bg-gray-700 hover:text-gray-100 transition-all' onClick={() => setIsOpenPay(!isOpenPay)}>Proceed</button>

                    <button className='border border-gray-500 bg-gray-700 text-gray-100 text-base font-semibold rounded-md py-2 px-6 hover:border-gray-700 hover:border-gray-700 hover:bg-gray-100 hover:text-gray-700 transition-all'>Reject & Re-generate</button>
                </div>
            </div>
            {isOpenPay && <div className='w-[30%]'>
                <section className="py-8 antialiased">
                    <div className="mx-auto max-w-screen-xl px-2 2xl:px-0">
                        <div className="mx-auto max-w-5xl">
                            <div className="mt-6 sm:mt-8">
                                <form action="#" className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-card lg:max-w-xl">
                                    <div className="mb-6 space-y-5">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name (as displayed on card)* </label>
                                            <input type="text" id="full_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Card number* </label>
                                            <input type="text" id="card-number-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                                        </div>

                                        <div>
                                            <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Card expiration* </label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                                    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                                            clip-rule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <input datepicker datepicker-format="mm/yy" id="card-expiration-input" type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="12/23" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                                                CVV*
                                                <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                                                    <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                                                    </svg>
                                                </button>
                                                <div id="cvv-desc" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                                    The last 3 digits on back of card
                                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                            </label>
                                            <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="•••" required />
                                        </div>
                                    </div>

                                    <div className="mt-6 grow sm:mt-8 lg:mt-0">
                                    <div className="space-y-4 rounded-lg bg-gray-50 dark:border-gray-700 dark:bg-card">
                                        <div className="space-y-2">
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">$6,592.00</dd>
                                            </dl>

                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                                <dd className="text-base font-medium text-green-500">-$299.00</dd>
                                            </dl>

                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                                            </dl>

                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                                            </dl>
                                        </div>

                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                            <dd className="text-base font-bold text-gray-900 dark:text-white">$7,191.00</dd>
                                        </dl>
                                    </div>
                                </div>
                                    <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Pay now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            }
        </div>
    )
}

export default DocumentShow