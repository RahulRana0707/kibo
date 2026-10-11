import Link from "next/link"
import { ChevronDownIcon } from "lucide-react"

import { BrandLogo } from "@/components/atoms/brand-logo"
import { PlatformIcon } from "@/components/atoms/platform-icon"
import { footerColumns, socialLinks } from "@/lib/marketing/navigation"

const footerLinkClassName =
  "inline-flex min-h-6 items-center text-body-sm text-muted-foreground no-underline hover:text-foreground hover:underline max-sm:min-h-11"

/**
 * Brand line, four link columns, social marks and copyright. On phones the
 * columns become disclosures.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-separator bg-page text-foreground">
      <div className="mx-auto flex max-w-300 flex-col gap-12 px-6 pt-16 pb-8 max-sm:gap-8 max-sm:px-4 max-sm:pt-8">
        <div className="grid grid-cols-[2fr_repeat(4,minmax(0,1fr))] gap-8 max-lg:grid-cols-3 max-sm:grid-cols-1 max-sm:gap-0">
          <div className="flex min-w-0 flex-col gap-3 max-lg:col-span-3 max-sm:col-span-1 max-sm:pb-6">
            <BrandLogo />
            <p className="max-w-[32ch] text-body-sm text-muted-foreground">
              Your AI community manager. Focus on creating — Kibo handles the
              chat.
            </p>
          </div>
          <nav aria-label="Footer" className="contents">
            {footerColumns.map((column) => (
              <div key={column.title} className="min-w-0">
                {/* Desktop: a titled column. */}
                <div className="flex flex-col gap-2 max-sm:hidden">
                  <h2 className="text-caption font-semibold">{column.title}</h2>
                  <ul className="flex flex-col gap-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className={footerLinkClassName}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Phone: a disclosure per column. */}
                <details className="group border-t border-separator sm:hidden">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-caption font-semibold [&::-webkit-details-marker]:hidden">
                    {column.title}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <ul className="flex flex-col pb-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className={footerLinkClassName}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-separator pt-6">
          <p className="text-caption text-muted-foreground">
            © {new Date().getFullYear()} Kibo. Made for creators.
          </p>
          <ul aria-label="Social" className="flex flex-wrap items-center gap-1">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-label={`Kibo on ${link.label}`}
                  className="grid size-11 place-items-center rounded-md hover:bg-hovered"
                >
                  <PlatformIcon platform={link.platform} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
