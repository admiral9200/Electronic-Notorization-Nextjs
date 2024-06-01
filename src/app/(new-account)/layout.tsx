import * as React from "react"

import { Footer } from "@/components/nav/footer"
import { Header } from "@/components/nav/header"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LandingLayout({
  children,
}: LandingLayoutProps): JSX.Element {
  return (
    <div className="flex flex-col overflow-hidden mt-24 min-h-screen">
      <SessionProvider>
        <Header />
        <main className="flex-1">{children}</main>
        {/* <Footer /> */}
        <div className="mt-16">
          <Toaster />
        </div>
      </SessionProvider>
    </div>
  )
}