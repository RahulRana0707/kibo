import Link from "next/link"

import { cn } from "@kibo/ui/lib/utils"

const sizes = {
  md: { text: "text-[1.25rem]", mark: "size-7 rounded-[8px] text-body-sm" },
  sm: { text: "text-[1.125rem]", mark: "size-6 rounded-[7px] text-xs" },
}

/**
 * The Kibo mark and wordmark, always a link home. `markOnly` drops the
 * word and names the link “Kibo home”.
 */
export function BrandLogo({
  href = "/",
  size = "md",
  markOnly = false,
  className,
}: {
  href?: string
  size?: keyof typeof sizes
  markOnly?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      aria-label={markOnly ? "Kibo home" : undefined}
      className={cn(
        "inline-flex items-center gap-2 font-semibold transition-opacity duration-fast hover:opacity-80 max-sm:min-h-11 tracking-[-0.01em] text-foreground no-underline",
        sizes[size].text,
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-grid place-items-center bg-foreground font-semibold text-background",
          sizes[size].mark
        )}
      >
        K
      </span>
      {markOnly ? null : "Kibo"}
    </Link>
  )
}
