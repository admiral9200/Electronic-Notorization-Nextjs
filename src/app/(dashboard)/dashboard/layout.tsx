import * as React from "react"
import { redirect } from "next/navigation"

import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/config/defaults"

import auth from "@/lib/auth"
import { Header } from "@/components/nav/header"
import { Footer } from "@/components/nav/footer"
import { SessionProvider } from "next-auth/react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  const session = await auth()
  if (!session) redirect(DEFAULT_UNAUTHENTICATED_REDIRECT)

  return (
    <div>
      <SessionProvider refetchInterval={0}>
        <Header />
          <main className="flex-1 min-h-screen">{children}</main>
        <Footer />
      </SessionProvider>
    </div>
  )
}