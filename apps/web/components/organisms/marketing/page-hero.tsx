import { cn } from "@kibo/ui/lib/utils"

import { Container } from "@/components/atoms/container"
import { Section } from "@/components/atoms/section"
import { Eyebrow, Heading, Lede } from "@kibo/ui/components/typography"
import { Breadcrumbs, type Crumb } from "@/components/molecules/breadcrumbs"

/**
 * The opening section of a product, use-case or company page. `split` puts
 * the visual beside the copy, `stacked` below it and `centered` below
 * centered copy.
 */
export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  lede,
  actions,
  visual,
  layout = "split",
  className,
}: {
  breadcrumbs?: Crumb[]
  eyebrow?: React.ReactNode
  title: React.ReactNode
  lede: React.ReactNode
  actions?: React.ReactNode
  visual?: React.ReactNode
  layout?: "split" | "stacked" | "centered"
  className?: string
}) {
  const centered = layout === "centered"
  const copy = (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-6",
        layout === "split" && "flex-[1_1_440px]",
        layout === "stacked" && "max-w-[760px]",
        centered && "mx-auto max-w-[820px] items-center text-center"
      )}
    >
      {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading as="h1" size="hero">
        {title}
      </Heading>
      <Lede>{lede}</Lede>
      {actions ? (
        <div
          className={cn("flex flex-wrap gap-3", centered && "justify-center")}
        >
          {actions}
        </div>
      ) : null}
    </div>
  )

  return (
    <Section className={cn("pt-18", className)}>
      <Container
        className={cn(
          layout === "split"
            ? "flex flex-wrap items-center gap-14"
            : "flex flex-col gap-12"
        )}
      >
        {copy}
        {visual ? (
          <div
            className={cn("min-w-0", layout === "split" && "flex-[1_1_480px]")}
          >
            {visual}
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
