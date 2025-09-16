// REACT & NEXT
import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
// ASSETS
import "@/styles/globals.css"
// COMPONENTS
import NavbarComponent from "@/src/components/NavbarComponent/navbar"
// TYPES
import { RootLayoutProps } from "@/src/page/RootLayout/prop"
// PROVIDERS
import { AlertProvider } from "@/src/providers/AlertProvider/AlertProvider"
import { LoadingProvider } from "@/src/providers/LoadingProvider/LoadingProvider"

export const metadata: Metadata = {
  title: "Language Learn Assistant",
  description: "Created by Alparslan",
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {

  return (
    
      <html lang="en">
          <body>
            <SessionProvider refetchOnWindowFocus={true}>
                <AlertProvider>
                  <LoadingProvider>
                      <div className="container max-w-screen-xl mx-auto px-4">
                        <NavbarComponent/>
                      </div>
                      <div className="w-full">
                          {children}
                      </div>
                  </LoadingProvider>
                </AlertProvider>
            </SessionProvider>
          </body>
      </html>
  )
}