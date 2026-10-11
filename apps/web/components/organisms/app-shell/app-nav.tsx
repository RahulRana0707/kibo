"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LockIcon } from "lucide-react"

import { Badge } from "@kibo/ui/components/badge"
import { SoonLabel } from "@kibo/ui/components/soon-label"
import { cn } from "@kibo/ui/lib/utils"

import { appNavigation, type AppNavItem } from "@/lib/app-navigation"

const itemClassName =
  "flex min-h-9 items-center gap-2.5 rounded-md px-2.5 text-body-sm font-medium no-underline [&_svg]:size-4 [&_svg]:shrink-0"

function NavItem({
  item,
  active,
  size,
  onNavigate,
}: {
  item: AppNavItem
  active: boolean
  size: "default" | "touch"
  onNavigate?: () => void
}) {
  const Icon = item.icon
  const touch = size === "touch" && "min-h-11 text-[0.9375rem]"

  if (!item.ready) {
    return (
      <span
        aria-disabled="true"
        className={cn(itemClassName, touch, "cursor-not-allowed text-disabled")}
      >
        <Icon aria-hidden="true" />
        <span className="flex-1">{item.label}</span>
        <SoonLabel />
        <span className="sr-only">, coming soon</span>
      </span>
    )
  }

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        itemClassName,
        touch,
        "transition-colors duration-instant",
        active
          ? "bg-primary-subtle text-link"
          : "text-muted-foreground hover:bg-hovered hover:text-foreground"
      )}
    >
      <Icon aria-hidden="true" />
      <span className="flex-1">{item.label}</span>
      {item.lockedPlan ? (
        <>
          <LockIcon aria-hidden="true" className="size-3.5!" />
          <span className="sr-only">, {item.lockedPlan} plan</span>
        </>
      ) : item.count !== undefined ? (
        <Badge
          count={item.count}
          variant={item.countTone === "warning" ? "warning" : "default"}
          className="bg-transparent"
        />
      ) : null}
    </Link>
  )
}

/**
 * The grouped app navigation, shared by the sidebar and the phone menu.
 * Items that don't exist yet are inert with a Soon label; `liveFirst`
 * puts live work (console, moderation) on top for phones.
 */
export function AppNav({
  onNavigate,
  size = "default",
  liveFirst = false,
}: {
  onNavigate?: () => void
  size?: "default" | "touch"
  liveFirst?: boolean
}) {
  const pathname = usePathname()
  const isActive = (item: AppNavItem) =>
    pathname === item.href || pathname.startsWith(`${item.href}/`)

  const groups = liveFirst
    ? [
        { title: undefined, items: appNavigation.flatMap((g) => g.items).filter((i) => i.live) },
        ...appNavigation
          .map((group) => ({ ...group, items: group.items.filter((i) => !i.live) }))
          .filter((group) => group.items.length),
      ]
    : appNavigation

  return (
    <nav aria-label="Main" className="flex flex-col gap-5">
      {groups.map((group, index) => (
        <div key={group.title ?? index} className="flex flex-col gap-0.5">
          {group.title ? (
            <p className="px-2.5 pb-1.5 text-overline text-muted-foreground uppercase">
              {group.title}
            </p>
          ) : null}
          {group.items.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              active={isActive(item)}
              size={size}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ))}
    </nav>
  )
}
