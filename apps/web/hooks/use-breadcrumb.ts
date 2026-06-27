"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"

type BreadcrumbItem = {
  title: string
  href?: string
}

const segmentLabels: Record<string, string> = {
  analytics: "Analytics",
  bots: "Bots",
  dashboard: "Dashboard",
  integrations: "Integrations",
  "knowledge-base": "Knowledge Base",
  settings: "Settings",
}

function formatSegment(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export function useBreadcrumb() {
  const pathname = usePathname()

  return useMemo<BreadcrumbItem[]>(() => {
    const segments = pathname.split("/").filter(Boolean)

    if (!segments.length) {
      return [{ title: "Kibo Console", href: "/dashboard" }]
    }

    const items: BreadcrumbItem[] = [
      {
        title: "Kibo Console",
        href: "/dashboard",
      },
    ]

    let href = ""

    segments.forEach((segment, index) => {
      href += `/${segment}`
      const isLast = index === segments.length - 1

      items.push({
        title: segmentLabels[segment] ?? formatSegment(segment),
        href: isLast ? undefined : href,
      })
    })

    return items
  }, [pathname])
}
