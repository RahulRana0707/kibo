import type { Metadata } from "next"
import { DM_Mono, DM_Sans } from "next/font/google"

import "@kibo/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@kibo/ui/components/sonner"
import { TooltipProvider } from "@kibo/ui/components/tooltip"
import { cn } from "@kibo/ui/lib/utils"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  style: ["normal", "italic"],
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Kibo · AI community manager for streamers",
    template: "%s | Kibo",
  },
  description:
    "Kibo is an AI-powered community manager for streamers and creators. Let Kibo handle the chat so you can focus on creating.",
  metadataBase: new URL("https://getkibo.com"),
  openGraph: {
    type: "website",
    siteName: "Kibo",
    title: "Kibo · AI community manager for streamers",
    description:
      "Kibo is an AI-powered community manager for streamers and creators. Let Kibo handle the chat so you can focus on creating.",
    url: "https://getkibo.com",
  },
  twitter: {
    card: "summary",
    title: "Kibo · AI community manager for streamers",
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
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(dmSans.variable, dmMono.variable)}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
