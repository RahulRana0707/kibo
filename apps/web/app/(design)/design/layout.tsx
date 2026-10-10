import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { BrandLogo } from "@/components/atoms/brand-logo"

import { designLayers } from "./_components/design-nav"

export const metadata: Metadata = {
  title: "Component library",
  robots: { index: false, follow: false },
}

/**
 * Development-only showcase of every component and variant, in the order of
 * the canvas page "01 Component library". Production returns 404.
 */
export default function DesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.NODE_ENV === "production") {
    notFound()
  }

  return (
    <div className="min-h-svh bg-surface">
      <header className="sticky top-0 z-30 border-b border-separator bg-page">
        <div className="flex min-h-16 flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 max-sm:px-4">
          <BrandLogo size="sm" />
          <nav aria-label="Library layers" className="flex flex-wrap gap-1">
            {designLayers.map((layer) => (
              <Link
                key={layer.slug}
                href={`/design/${layer.slug}`}
                className="inline-flex min-h-9 items-center rounded-md px-2.5 text-body-sm font-medium text-muted-foreground no-underline hover:bg-hovered hover:text-foreground"
              >
                {layer.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-10 max-sm:px-4">
        {children}
      </main>
    </div>
  )
}
