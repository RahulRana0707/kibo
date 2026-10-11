import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@kibo/ui/lib/utils"

const emptyVariants = cva(
  "group/empty flex w-full min-w-0 flex-col items-center justify-center gap-2 text-center",
  {
    variants: {
      size: {
        /** Inside a card or panel. */
        default: "p-6",
        /** Inside a table body. */
        table: "px-6 py-8",
        /** A whole page with nothing on it yet. */
        page: "min-h-[50vh] p-8",
      },
    },
    defaultVariants: { size: "default" },
  }
)

/**
 * What shows when there's nothing yet. Says what will appear and offers
 * the one action that makes it appear.
 */
function Empty({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyVariants>) {
  return (
    <div
      data-slot="empty"
      data-size={size ?? "default"}
      className={cn(emptyVariants({ size }), className)}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex flex-col items-center gap-2", className)}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "mb-2 grid shrink-0 place-items-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-[1.5]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        /** First use: what this place is for. */
        icon: "size-12 rounded-lg bg-primary-subtle text-link group-data-[size=page]/empty:size-16 [&_svg:not([class*='size-'])]:size-6",
        /** Search and tables: nothing matched. */
        neutral:
          "size-12 rounded-lg bg-sunken text-muted-foreground group-data-[size=page]/empty:size-16 [&_svg:not([class*='size-'])]:size-6",
        /** Cleared: all done. */
        success:
          "size-12 rounded-lg bg-success-subtle text-success-text group-data-[size=page]/empty:size-16 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      aria-hidden="true"
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

/** A heading at the right level for its container. */
function EmptyTitle({
  as: Tag = "h3",
  className,
  ...props
}: React.ComponentProps<"h3"> & { as?: "h1" | "h2" | "h3" | "h4" }) {
  return (
    <Tag
      data-slot="empty-title"
      className={cn(
        "text-heading group-data-[size=page]/empty:text-title group-data-[size=table]/empty:text-body group-data-[size=table]/empty:font-semibold",
        className
      )}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn(
        "max-w-[32ch] text-body-sm text-muted-foreground group-data-[size=page]/empty:max-w-[40ch] [&>a]:text-link [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/** Primary small action and an optional secondary; block on phone. */
function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 pt-2 max-sm:w-full max-sm:flex-col max-sm:*:h-11 max-sm:*:w-full",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
