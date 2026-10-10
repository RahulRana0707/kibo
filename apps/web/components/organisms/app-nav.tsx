"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@kibo/ui/lib/utils"

import { appNavigation } from "@/lib/app-navigation"

const itemClassName =
  "flex min-h-9 items-center gap-2.5 rounded-md px-2.5 text-body-sm font-medium no-underline [&_svg]:size-4 [&_svg]:shrink-0"

/** The grouped app navigation, shared by the sidebar and the mobile menu. */
export function AppNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className="flex flex-col gap-5">
      {appNavigation.map((group, index) => (
        <div key={group.title ?? index} className="flex flex-col gap-0.5">
          {group.title ? (
            <p className="px-2.5 pb-1.5 text-overline text-muted-foreground uppercase">
              {group.title}
            </p>
          ) : null}
          {group.items.map((item) => {
            const Icon = item.icon

            if (!item.ready) {
              return (
                <span
                  key={item.href}
                  aria-disabled="true"
                  className={cn(itemClassName, "text-disabled")}
                >
                  <Icon aria-hidden="true" />
                  {item.label}
                  <span className="ms-auto text-xs font-semibold">Soon</span>
                </span>
              )
            }

            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={cn(
                  itemClassName,
                  "transition-colors duration-100",
                  active
                    ? "bg-primary-subtle text-link"
                    : "text-muted-foreground hover:bg-hovered hover:text-foreground"
                )}
              >
                <Icon aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
