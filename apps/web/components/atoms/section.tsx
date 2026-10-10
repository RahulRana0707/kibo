import { cn } from "@kibo/ui/lib/utils"

const tones = {
  default: "bg-background text-foreground",
  alt: "bg-surface text-foreground",
  dark: "dark bg-background text-foreground",
}

/** A full-width marketing band with the standard vertical rhythm. */
export function Section({
  tone = "default",
  className,
  ...props
}: React.ComponentProps<"section"> & { tone?: keyof typeof tones }) {
  return (
    <section
      className={cn("py-24 max-sm:py-16", tones[tone], className)}
      {...props}
    />
  )
}
