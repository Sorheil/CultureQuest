import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {ThemeProvider} from "@/components/theme-provider"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "CultureQuest",
    description: "Découvrez la richesse culturelle et artistique du Cameroun avec CultureQuest",
    manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <head>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
            <link rel="apple-touch-icon" href="/icon-192x192.png"/>
        </head>
        <body className={inter.className} >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <main className="flex min-h-screen flex-col items-center justify-between bg-[#121212]">{children}</main>
        </ThemeProvider>
        </body>
        </html>
    )
}
