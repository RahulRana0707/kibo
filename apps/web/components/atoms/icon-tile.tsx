import { cn } from "@kibo/ui/lib/utils"

const tones = {
  accent: "bg-primary-subtle text-link",
  neutral: "bg-sunken text-foreground",
}

const sizes = {
  md: "size-10 rounded-lg [&_svg]:size-5",
  sm: "size-8 rounded-md [&_svg]:size-4",
}

/** A tinted square holding an icon or a step number. */
export function IconTile({
  tone = "accent",
  size = "md",
  className,
  children,
}: {
  tone?: keyof typeof tones
  size?: keyof typeof sizes
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid shrink-0 place-items-center font-semibold [&_svg]:stroke-[1.5]",
        tones[tone],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
