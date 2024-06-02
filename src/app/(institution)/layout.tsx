import * as React from "react"

import { Footer } from "@/components/nav/footer"
import { Header } from "@/components/nav/header"
import { SessionProvider } from "next-auth/react"

interface LandingLayoutProps {
  children: React.ReactNode
}

export default function LandingLayout({
  children,
}: LandingLayoutProps): JSX.Element {
  return (
    <div className="flex flex-col overflow-hidden min-h-screen pt-20">
      <SessionProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </SessionProvider>
    </div>
  )
}
