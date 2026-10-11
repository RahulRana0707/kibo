import { cn } from "@kibo/ui/lib/utils"

import { Eyebrow, Heading, Lede } from "@kibo/ui/components/typography"

/**
 * Eyebrow, heading and lede as one unit, opening a marketing section or an
 * app panel group. `action` sits at the end of the heading's last line
 * (under the lede when centered) and stacks below on phones.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  action,
  as = "h2",
  size = "display",
  align = "start",
  className,
}: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  lede?: React.ReactNode
  action?: React.ReactNode
  as?: "h1" | "h2" | "h3"
  size?: "hero" | "display" | "title"
  align?: "start" | "center"
  className?: string
}) {
  const copy = (
    <hgroup
      className={cn(
        "flex max-w-180 flex-col gap-3",
        align === "center" && "mx-auto items-center text-center"
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading as={as} size={size}>
        {title}
      </Heading>
      {lede ? <Lede>{lede}</Lede> : null}
    </hgroup>
  )

  if (!action) {
    return <div className={className}>{copy}</div>
  }

  return (
    <div
      className={cn(
        "flex gap-5",
        align === "center"
          ? "flex-col items-center"
          : "flex-wrap items-end justify-between max-sm:flex-col max-sm:items-stretch",
        className
      )}
    >
      {copy}
      <div className="flex shrink-0 gap-3 max-sm:*:w-full">{action}</div>
    </div>
  )
}
