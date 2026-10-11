"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react"

import { Button, buttonVariants } from "@kibo/ui/components/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@kibo/ui/components/sheet"
import { cn } from "@kibo/ui/lib/utils"

import { BrandLogo } from "@/components/atoms/brand-logo"
import { productLinks, resourceLinks } from "@/lib/marketing/navigation"

const rowClassName =
  "flex min-h-12 w-full items-center justify-between rounded-md px-2 text-body font-medium text-foreground no-underline hover:bg-hovered"

const groups = [
  {
    label: "Product",
    links: [
      ...productLinks.map((link) => ({ label: link.menuLabel, href: link.href })),
      { label: "All features", href: "/product" },
    ],
  },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    links: resourceLinks.map((link) => ({ label: link.menuLabel, href: link.href })),
  },
] as const

/**
 * The phone site menu: a full-screen sheet with the bar on top, rows 48
 * tall, Product and Resources expanding in place, and the two calls to
 * action at the bottom.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="size-11 text-foreground md:hidden"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" showCloseButton={false} className="flex flex-col">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex min-h-16 items-center gap-2 border-b border-separator px-4 py-3">
          <BrandLogo />
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close menu"
              className="ms-auto size-11 text-foreground"
            >
              <XIcon />
            </Button>
          </SheetClose>
        </div>
        <nav aria-label="Site" className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-4 pt-2 pb-5">
          {groups.map((group) =>
            "links" in group ? (
              <div key={group.label}>
                <button
                  type="button"
                  aria-expanded={expanded === group.label}
                  onClick={() =>
                    setExpanded((current) => (current === group.label ? null : group.label))
                  }
                  className={rowClassName}
                >
                  {group.label}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={cn(
                      "size-5 text-muted-foreground transition-transform duration-fast",
                      expanded === group.label && "rotate-180"
                    )}
                  />
                </button>
                {expanded === group.label ? (
                  <div className="flex flex-col ps-3">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={close}
                        className={cn(rowClassName, "text-body-sm text-muted-foreground")}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <Link key={group.href} href={group.href} onClick={close} className={rowClassName}>
                {group.label}
              </Link>
            )
          )}
        </nav>
        <div className="flex flex-col gap-2 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <Link href="/signup" onClick={close} className={buttonVariants({ size: "lg", block: true })}>
            Get started
          </Link>
          <Link
            href="/login"
            onClick={close}
            className={buttonVariants({ variant: "secondary", size: "lg", block: true })}
          >
            Log in
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
