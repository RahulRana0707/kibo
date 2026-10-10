import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@kibo/ui/lib/utils"

const panelVariants = cva("flex min-w-0 flex-col", {
  variants: {
    variant: {
      /** A unit of content on a page: raised card with a hairline shadow. */
      panel:
        "gap-4 rounded-xl border border-transparent bg-raised p-6 shadow-border max-sm:p-4",
      /** Groups panels: flat tint, no shadow. */
      surface: "gap-3 rounded-xl bg-surface p-6 max-sm:p-4",
      /** Inside a panel, for quoted or secondary content. */
      well: "gap-2 rounded-lg bg-sunken p-4",
      /** Floats above everything, such as the hero demo. */
      raised:
        "rounded-lg border border-transparent bg-raised shadow-raised",
    },
    /** Hover lift and selection for panels that link or select. */
    interactive: {
      true: "transition-shadow duration-fast ease-out hover:shadow-border-hover",
      false: "",
    },
    selected: {
      true: "shadow-[inset_0_0_0_2px_var(--vi-accent-solid)] hover:shadow-[inset_0_0_0_2px_var(--vi-accent-solid)]",
      false: "",
    },
    /** No padding, for tables and lists that run edge to edge. */
    flush: { true: "gap-0 p-0 max-sm:p-0", false: "" },
  },
  defaultVariants: {
    variant: "panel",
    interactive: false,
    selected: false,
    flush: false,
  },
})

function Panel({
  variant,
  interactive,
  selected,
  flush,
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof panelVariants>) {
  return (
    <div
      data-slot="panel"
      className={cn(
        panelVariants({ variant, interactive, selected, flush }),
        className
      )}
      {...props}
    />
  )
}

/** A panel's title row, with optional trailing actions. */
function PanelHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-header"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3",
        className
      )}
      {...props}
    />
  )
}

export { Panel, PanelHeader, panelVariants }
