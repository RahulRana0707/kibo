import Link from "next/link"

import { BrandLogo } from "@/components/atoms/brand-logo"
import { footerColumns, socialLinks } from "@/lib/marketing/navigation"

const footerLinkClassName =
  "text-body-sm leading-[2] text-muted-foreground no-underline hover:text-foreground hover:underline"

export function SiteFooter() {
  return (
    <footer className="border-t border-separator bg-surface text-foreground">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 pt-16 pb-8 max-sm:px-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(160px,100%),1fr))] gap-8">
          <div className="col-span-2 flex min-w-0 flex-col gap-3 max-sm:col-span-1">
            <BrandLogo />
            <p className="max-w-[32ch] text-body-sm text-muted-foreground">
              Your AI community manager. Focus on creating — Kibo handles the
              chat.
            </p>
          </div>
          {footerColumns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="flex flex-col"
            >
              <p className="mb-2 text-overline text-muted-foreground uppercase">
                {column.title}
              </p>
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={footerLinkClassName}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-separator pt-6">
          <p className="text-caption text-muted-foreground">
            © {new Date().getFullYear()} Kibo. Made for creators.
          </p>
          <nav aria-label="Social" className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={footerLinkClassName}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
