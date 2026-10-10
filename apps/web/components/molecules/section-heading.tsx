import { cn } from "@kibo/ui/lib/utils"

import { Eyebrow, Heading, Lede } from "@/components/atoms/typography"

/** Eyebrow, heading and lede at the top of a marketing section. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  as = "h2",
  size = "display",
  align = "start",
  className,
}: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  lede?: React.ReactNode
  as?: "h1" | "h2"
  size?: "hero" | "display" | "title"
  align?: "start" | "center"
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex max-w-[720px] flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading as={as} size={size}>
        {title}
      </Heading>
      {lede ? <Lede>{lede}</Lede> : null}
    </div>
  )
}
