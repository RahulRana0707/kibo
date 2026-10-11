import * as React from "react"

import { cn } from "@kibo/ui/lib/utils"

/** The table frame: raised, rounded, scrolls sideways inside its box. */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto rounded-xl border border-transparent bg-raised shadow-border"
    >
      <table
        data-slot="table"
        className={cn("w-full border-collapse text-body-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={className} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-separator transition-colors duration-instant hover:bg-hovered data-[state=selected]:bg-primary-subtle",
        className
      )}
      {...props}
    />
  )
}

/** Overline heads; numbers end-aligned with `align="end"`. */
function TableHead({
  className,
  align = "start",
  ...props
}: Omit<React.ComponentProps<"th">, "align"> & {
  align?: "start" | "end" | "center"
}) {
  return (
    <th
      data-slot="table-head"
      scope="col"
      className={cn(
        "border-b border-separator px-3 py-2.5 text-overline font-semibold whitespace-nowrap text-muted-foreground uppercase",
        align === "end" ? "text-end" : align === "center" ? "text-center" : "text-start",
        className
      )}
      {...props}
    />
  )
}

function TableCell({
  className,
  align = "start",
  ...props
}: Omit<React.ComponentProps<"td">, "align"> & {
  align?: "start" | "end" | "center"
}) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-3 align-middle",
        align === "end" ? "text-end tabular" : align === "center" ? "text-center" : "text-start",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("sr-only", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
