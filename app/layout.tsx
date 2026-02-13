// REACT & NEXT
import type { Metadata } from "next"
// ASSETS
import "@/styles/globals.css"
// COMPONENTS
import NavbarComponent from "@/src/components/NavbarComponent/navbar"
// TYPES
import { RootLayoutProps } from "@/src/page/RootLayout/prop"
// PROVIDERS
import { AlertProvider } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { LoadingProvider } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
import { SessionProvider } from "@/src/infrastructure/providers/SessionProvider/SessionProvider"

export const metadata: Metadata = {
  title: "Language Learn Assistant",
  description: "Created by Alparslan",
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {

  return (
    
      <html lang="en">
          <body>
              <AlertProvider>
                <LoadingProvider>
                  <SessionProvider>
                    <div className="container max-w-screen-xl mx-auto px-4">
                      <NavbarComponent/>
                    </div>
                    <div className="w-full">
                        {children}
                    </div>
                  </SessionProvider>
                </LoadingProvider>
              </AlertProvider>
          </body>
      </html>
  )
}