"use client"

import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useEffect, useState } from 'react'
import { Institution } from '@prisma/client'

export default function OrderPage(): JSX.Element {
  const [institutions, setInstitutions] = useState<Institution[]>([])

  useEffect(() => {
    async function fetchInstitutions() {
      const response = await fetch("/api/institutions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if(response.ok) {
        setInstitutions(await response.json())
      }
    }

    fetchInstitutions()
  }, [])


  return (
    <Layout>
      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-4'>
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold tracking-tight'>You can select any institution you want!</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of all institutions that you want to send your transcript!
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {
            institutions.length > 0 ? <DataTable data={institutions} columns={columns} /> : "Loading..."
          }
        </div>
      </LayoutBody>
    </Layout>
  )
}
