import type { Metadata } from "next"
import { Geist, Geist_Mono, Montserrat } from "next/font/google"

import "@kibo/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@kibo/ui/lib/utils"

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" })

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Kibo — Your AI Community Manager",
    template: "%s | Kibo",
  },
  description:
    "Kibo is an AI-powered community manager for streamers and creators. Let Kibo handle the chat so you can focus on creating.",
  metadataBase: new URL("https://getkibo.com"),
  openGraph: {
    type: "website",
    siteName: "Kibo",
    title: "Kibo — Your AI Community Manager",
    description:
      "Kibo is an AI-powered community manager for streamers and creators. Let Kibo handle the chat so you can focus on creating.",
    url: "https://getkibo.com",
  },
  twitter: {
    card: "summary",
    title: "Kibo — Your AI Community Manager",
    description:
      "Kibo is an AI-powered community manager for streamers and creators.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        montserrat.variable,
        geistHeading.variable
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
