import { cn } from "@kibo/ui/lib/utils"

import { Container } from "@/components/atoms/container"
import { Section } from "@/components/atoms/section"

/**
 * A section with copy on one side and a product visual on the other. The
 * visual moves to the leading side with `reverse`, and both stack when the
 * row stops fitting.
 */
export function FeatureSplit({
  copy,
  visual,
  reverse = false,
  tone = "default",
  copyBasis = "380px",
  className,
}: {
  copy: React.ReactNode
  visual: React.ReactNode
  reverse?: boolean
  tone?: "default" | "alt"
  copyBasis?: string
  className?: string
}) {
  return (
    <Section tone={tone} className={className}>
      <Container
        className={cn(
          "flex flex-wrap items-center gap-12",
          reverse && "flex-row-reverse"
        )}
      >
        <div
          className="flex min-w-0 flex-[1_1_var(--basis)] flex-col gap-4"
          style={{ "--basis": copyBasis } as React.CSSProperties}
        >
          {copy}
        </div>
        <div className="min-w-0 flex-[1_1_460px]">{visual}</div>
      </Container>
    </Section>
  )
}
