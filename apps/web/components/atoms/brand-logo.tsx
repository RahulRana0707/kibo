import Link from "next/link"

import { cn } from "@kibo/ui/lib/utils"

const sizes = {
  md: { text: "text-[1.25rem]", mark: "size-7 rounded-[8px] text-body-sm" },
  sm: { text: "text-[1.125rem]", mark: "size-6 rounded-[7px] text-xs" },
}

/** The Kibo mark and wordmark. Used everywhere the product is named. */
export function BrandLogo({
  href = "/",
  size = "md",
  className,
}: {
  href?: string
  size?: keyof typeof sizes
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-[-0.01em] text-foreground no-underline",
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
      Kibo
    </Link>
  )
}
