import Link from "next/link"
import { ChevronDownIcon } from "lucide-react"

import { buttonVariants } from "@kibo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"
import { cn } from "@kibo/ui/lib/utils"

import { BrandLogo } from "@/components/atoms/brand-logo"
import { MobileNav } from "@/components/organisms/mobile-nav"
import {
  productLinks,
  resourceLinks,
  type NavLink,
} from "@/lib/marketing/navigation"

const navLinkClassName =
  "inline-flex min-h-10 items-center gap-1 rounded-md px-2.5 py-2 text-body-sm font-medium text-muted-foreground no-underline transition-colors duration-100 hover:bg-hovered hover:text-foreground aria-expanded:bg-hovered aria-expanded:text-foreground"

function NavMenu({ label, links }: { label: string; links: NavLink[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={navLinkClassName}>
        {label}
        <ChevronDownIcon aria-hidden="true" className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 p-2">
        {links.map((link) => (
          <DropdownMenuItem key={link.href} asChild className="py-2">
            <Link
              href={link.href}
              className="flex flex-col items-start gap-0.5"
            >
              <span className="font-medium text-foreground">{link.label}</span>
              {link.description ? (
                <span className="text-caption text-muted-foreground">
                  {link.description}
                </span>
              ) : null}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-separator bg-background">
      <div className="mx-auto flex min-h-[72px] max-w-[1200px] items-center gap-6 px-6 py-3 max-sm:px-4">
        <BrandLogo />
        <nav aria-label="Site" className="flex flex-wrap gap-1 max-md:hidden">
          <NavMenu
            label="Product"
            links={[
              ...productLinks,
              {
                label: "All features",
                href: "/product",
                description: "Every part of Kibo on one page",
              },
            ]}
          />
          <Link href="/integrations" className={navLinkClassName}>
            Integrations
          </Link>
          <Link href="/pricing" className={navLinkClassName}>
            Pricing
          </Link>
          <NavMenu label="Resources" links={resourceLinks} />
        </nav>
        <div className="ms-auto flex items-center gap-3 max-md:gap-2">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "max-md:hidden"
            )}
          >
            Log in
          </Link>
          <Link href="/signup" className={buttonVariants()}>
            Get started
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
