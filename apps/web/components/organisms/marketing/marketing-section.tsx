import { cn } from "@kibo/ui/lib/utils"

import { Container } from "@/components/atoms/container"
import { Section } from "@/components/atoms/section"
import { SectionHeading } from "@/components/molecules/section-heading"

const gaps = {
  default: "gap-12",
  tight: "gap-8",
}

/**
 * One band of a marketing page: the section tone, the page container, a
 * section heading and the content under it. `action` sits beside the
 * heading, such as “Browse integrations”.
 */
export function MarketingSection({
  tone,
  eyebrow,
  title,
  lede,
  action,
  align,
  width,
  gap = "default",
  className,
  children,
}: {
  tone?: React.ComponentProps<typeof Section>["tone"]
  eyebrow?: React.ReactNode
  title: React.ReactNode
  lede?: React.ReactNode
  action?: React.ReactNode
  align?: "start" | "center"
  width?: React.ComponentProps<typeof Container>["width"]
  /** `tight` when the content sits close to the heading, as directories do. */
  gap?: keyof typeof gaps
  className?: string
  children: React.ReactNode
}) {
  return (
    <Section tone={tone} className={className}>
      <Container width={width} className={cn("flex flex-col", gaps[gap])}>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          lede={lede}
          action={action}
          align={align}
        />
        {children}
      </Container>
    </Section>
  )
}
