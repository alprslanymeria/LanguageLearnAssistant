// REACT & NEXT
import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
// ASSETS
import "@/public/globals.css"
// COMPONENTS
import { NavbarComponent } from "../src/components/navbar/navbar"
// TYPES
import { rootLayout } from "@/src/types/prop"

export const metadata: Metadata = {
  title: "Language Learn Assistant",
  description: "Created by Alparslan",
}

export default function RootLayout({ children }: Readonly<rootLayout>) {

  return (
    
      <html lang="en">
          <body>
            <SessionProvider>
              <div className="container max-w-screen-xl mx-auto px-4">
                  <NavbarComponent/>
              </div>
              <div className="w-full">
                  {children}
              </div>
            </SessionProvider>
          </body>
      </html>
  )
}