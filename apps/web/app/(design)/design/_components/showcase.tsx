import { cn } from "@kibo/ui/lib/utils"

/**
 * Building blocks for the /design showcase. Each Board mirrors one board on
 * the canvas page "01 Component library", so a component can be checked
 * against its design side by side.
 */
export function Board({
  id,
  layer,
  title,
  origin = "kibo",
  description,
  importLine,
  children,
}: {
  id: string
  layer: string
  title: string
  origin?: "violet" | "kibo"
  description: React.ReactNode
  importLine: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="flex scroll-mt-6 flex-col gap-8 rounded-xl bg-page p-8 shadow-border max-sm:p-4"
    >
      <header className="flex flex-col gap-2">
        <p className="text-caption text-muted-foreground">
          Components / {layer} / {title}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <h2 id={`${id}-title`} className="text-display">
            {title}
          </h2>
          <span
            className={cn(
              "inline-flex h-6 items-center rounded-full px-2 text-xs font-medium",
              origin === "violet"
                ? "bg-sunken text-muted-foreground"
                : "bg-primary-subtle text-link"
            )}
          >
            {origin === "violet" ? "Violet component" : "Kibo addition"}
          </span>
        </div>
        <p className="max-w-[68ch] text-muted-foreground">{description}</p>
        <code className="w-fit rounded-sm bg-sunken px-1.5 py-0.5 font-mono text-code">
          {importLine}
        </code>
      </header>
      {children}
    </section>
  )
}

/** A titled group of examples inside a board. */
export function Group({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-overline text-muted-foreground uppercase">{title}</h3>
      <div className={cn("flex flex-wrap items-start gap-6", className)}>
        {children}
      </div>
    </div>
  )
}

/** One example with the props that produce it written underneath. */
export function Example({
  code,
  children,
  className,
}: {
  code?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <figure className={cn("m-0 flex min-w-0 flex-col gap-2", className)}>
      <div className="flex min-h-10 flex-wrap items-center gap-3">
        {children}
      </div>
      {code ? (
        <figcaption className="font-mono text-[0.75rem] text-muted-foreground">
          {code}
        </figcaption>
      ) : null}
    </figure>
  )
}

/** A frame at phone width (390) for components whose layout changes. */
export function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[390px] max-w-full overflow-hidden rounded-xl bg-page shadow-border">
      {children}
    </div>
  )
}
