"use client"

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpenIcon,
  ChartColumnIcon,
  ChevronDownIcon,
  LifeBuoyIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
  NewspaperIcon,
  ShieldIcon,
  SparklesIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react"

import { buttonVariants } from "@kibo/ui/components/button"
import { cn } from "@kibo/ui/lib/utils"

import { BrandLogo } from "@/components/atoms/brand-logo"
import { IconTile } from "@/components/atoms/icon-tile"
import { MobileNav } from "@/components/organisms/marketing/mobile-nav"
import {
  productLinks,
  productMenuNews,
  resourceLinks,
  type MenuLink,
} from "@/lib/marketing/navigation"

export const menuIcons: Record<MenuLink["icon"], React.ElementType> = {
  "message-square": MessageSquareIcon,
  shield: ShieldIcon,
  "messages-square": MessagesSquareIcon,
  trophy: TrophyIcon,
  "chart-column": ChartColumnIcon,
  "book-open": BookOpenIcon,
  newspaper: NewspaperIcon,
  "life-buoy": LifeBuoyIcon,
  users: UsersIcon,
  sparkles: SparklesIcon,
}

const navLinkClassName =
  "inline-flex min-h-10 items-center gap-1 rounded-md px-2.5 py-2 text-body-sm font-medium text-muted-foreground no-underline transition-colors duration-instant hover:bg-hovered hover:text-foreground aria-expanded:bg-hovered aria-expanded:text-foreground aria-[current=page]:text-foreground"

/** One menu entry: icon tile, short title and one line. */
function MenuItem({ link, onNavigate }: { link: MenuLink; onNavigate: () => void }) {
  const Icon = menuIcons[link.icon]
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="flex items-start gap-3 rounded-md p-3 text-foreground no-underline transition-colors duration-instant hover:bg-hovered focus-visible:bg-hovered"
    >
      <IconTile size="sm">
        <Icon />
      </IconTile>
      <span className="flex flex-col gap-0.5">
        <span className="text-body-sm font-semibold">{link.menuLabel}</span>
        <span className="text-caption text-muted-foreground">
          {link.menuDescription}
        </span>
      </span>
    </Link>
  )
}

type MenuName = "product" | "resources"

/**
 * Top of every marketing page. Sticky; after 8px of scroll it tightens to
 * 60 and lifts. Product and Resources are disclosure buttons that open a
 * menu panel; Escape closes it and returns focus. Below 768 it collapses
 * to Get started and the menu button.
 */
export function SiteHeader() {
  const [open, setOpen] = useState<MenuName | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const triggers = useRef<Record<MenuName, HTMLButtonElement | null>>({
    product: null,
    resources: null,
  })
  const panelId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        triggers.current[open]?.focus()
        setOpen(null)
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(null)
    }
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("pointerdown", onPointerDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open])

  const close = () => setOpen(null)
  const toggle = (name: MenuName) =>
    setOpen((current) => (current === name ? null : name))

  const trigger = (name: MenuName, label: string, active: boolean) => (
    <button
      ref={(node) => {
        triggers.current[name] = node
      }}
      type="button"
      aria-expanded={open === name}
      aria-controls={`${panelId}-${name}`}
      aria-current={active ? "page" : undefined}
      onClick={() => toggle(name)}
      className={navLinkClassName}
    >
      {label}
      <ChevronDownIcon
        aria-hidden="true"
        className="size-4 transition-transform duration-fast in-aria-expanded:rotate-180"
      />
    </button>
  )

  return (
    <header
      ref={headerRef}
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-40 border-b border-separator bg-page transition-[background-color,box-shadow] duration-moderate ease-out data-scrolled:border-transparent data-scrolled:bg-raised data-scrolled:shadow-raised"
    >
      <div
        className={cn(
          "mx-auto flex max-w-300 items-center gap-6 px-6 py-3 transition-[min-height] duration-moderate ease-out max-md:min-h-16 max-sm:gap-2 max-sm:px-4",
          scrolled ? "min-h-15" : "min-h-18"
        )}
      >
        <BrandLogo />
        <nav aria-label="Site" className="flex flex-wrap gap-1 max-md:hidden">
          {trigger("product", "Product", pathname.startsWith("/product"))}
          <Link
            href="/integrations"
            aria-current={pathname.startsWith("/integrations") ? "page" : undefined}
            className={navLinkClassName}
          >
            Integrations
          </Link>
          <Link
            href="/pricing"
            aria-current={pathname === "/pricing" ? "page" : undefined}
            className={navLinkClassName}
          >
            Pricing
          </Link>
          {trigger(
            "resources",
            "Resources",
            ["/blog", "/help", "/use-cases", "/changelog"].some((path) =>
              pathname.startsWith(path)
            )
          )}
        </nav>
        <div className="ms-auto flex items-center gap-3 max-md:gap-2">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "ghost" }), "max-md:hidden")}
          >
            Log in
          </Link>
          <Link href="/signup" className={buttonVariants()}>
            Get started
          </Link>
          <MobileNav />
        </div>
      </div>

      {open ? (
        <div className="absolute inset-x-0 top-full max-md:hidden">
          <div className="mx-auto max-w-300 px-6">
            <div
              id={`${panelId}-${open}`}
              role="region"
              aria-label={open === "product" ? "Product" : "Resources"}
              className={cn(
                "mt-2 grid gap-2 rounded-lg border border-transparent bg-popover p-4 shadow-raised motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-fast",
                open === "product"
                  ? "grid-cols-[repeat(3,minmax(0,1fr))_260px]"
                  : "w-fit grid-cols-[repeat(2,minmax(0,280px))]"
              )}
            >
              {open === "product" ? (
                <>
                  {productLinks.slice(0, 3).map((link) => (
                    <MenuItem key={link.href} link={link} onNavigate={close} />
                  ))}
                  <div className="row-span-2 flex flex-col gap-2 rounded-lg bg-surface p-4">
                    <p className="text-body-sm font-semibold">
                      {productMenuNews.title}
                    </p>
                    <p className="text-caption text-muted-foreground">
                      {productMenuNews.body}
                    </p>
                    <Link
                      href={productMenuNews.href}
                      onClick={close}
                      className="text-body-sm text-link"
                    >
                      {productMenuNews.linkLabel}
                    </Link>
                    <Link
                      href="/product"
                      onClick={close}
                      className="mt-auto text-body-sm font-medium text-foreground"
                    >
                      All features
                    </Link>
                  </div>
                  {productLinks.slice(3).map((link) => (
                    <MenuItem key={link.href} link={link} onNavigate={close} />
                  ))}
                </>
              ) : (
                resourceLinks.map((link) => (
                  <MenuItem key={link.href} link={link} onNavigate={close} />
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
