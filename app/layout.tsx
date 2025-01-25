import type { Metadata } from "next";
import "@/public/globals.css"
import { Navbar } from "../src/components/navbar";

export const metadata: Metadata = {
  title: "Language Learn Assistant",
  description: "Created by Alparslan",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  return (
    <html lang="en">
      <head>
        <title>{`${metadata.title}`}</title>
        <meta name="description" content={`${metadata.description}`} />
      </head>
      <body>
        <div className="container max-w-screen-xl mx-auto px-4">
            <Navbar></Navbar>
        </div>
        <div className="w-full">
            {children}
        </div>
      </body>
    </html>
  )
}
