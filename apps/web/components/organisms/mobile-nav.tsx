"use client"

import { useState } from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Button, buttonVariants } from "@kibo/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@kibo/ui/components/sheet"

import { productLinks, resourceLinks } from "@/lib/marketing/navigation"

const groups = [
  {
    title: "Product",
    links: [...productLinks, { label: "All features", href: "/product" }],
  },
  {
    title: "Company",
    links: [
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  { title: "Resources", links: resourceLinks },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="size-11 md:hidden"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label="Site" className="flex flex-col gap-6 px-4 pb-6">
          {groups.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <p className="pb-1 text-overline text-muted-foreground uppercase">
                {group.title}
              </p>
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-md px-2 text-body font-medium text-foreground no-underline hover:bg-hovered"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className={buttonVariants({ size: "lg" })}
            >
              Get started
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
