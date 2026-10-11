"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@kibo/ui/lib/utils"

/**
 * The month grid used by the date pickers. Today is ringed, the selection
 * is accent-solid, a range fills accent-subtle. Arrow keys move by day,
 * Page Up/Down by month.
 */
function Calendar({
  className,
  classNames,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("text-body-sm", className)}
      classNames={{
        months: "relative flex flex-col gap-4 sm:flex-row",
        month: "flex flex-col gap-3",
        month_caption: "flex h-8 items-center justify-center font-medium",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous:
          "grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-hovered hover:text-foreground disabled:opacity-40",
        button_next:
          "grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-hovered hover:text-foreground disabled:opacity-40",
        weekdays: "flex",
        weekday:
          "w-9 text-[0.75rem] font-normal text-muted-foreground max-sm:w-11",
        week: "mt-1 flex",
        day: "relative size-9 p-0 text-center max-sm:size-11 [&:has([aria-selected])]:bg-primary-subtle first:[&:has([aria-selected])]:rounded-s-md last:[&:has([aria-selected])]:rounded-e-md",
        day_button:
          "size-9 rounded-md tabular hover:bg-hovered disabled:cursor-not-allowed disabled:text-disabled disabled:hover:bg-transparent max-sm:size-11",
        today: "font-bold [&>button]:shadow-[inset_0_0_0_1px_var(--vi-border-strong)]",
        selected:
          "[&>button]:bg-primary [&>button]:text-on-accent [&>button]:hover:bg-primary-hover",
        range_start: "rounded-s-md",
        range_end: "rounded-e-md",
        range_middle:
          "[&>button]:bg-transparent! [&>button]:text-link! [&>button]:hover:bg-primary-subtle-hover!",
        outside: "text-disabled",
        disabled: "text-disabled",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeftIcon aria-hidden="true" className="size-4 rtl:rotate-180" />
          ) : (
            <ChevronRightIcon aria-hidden="true" className="size-4 rtl:rotate-180" />
          ),
      }}
      {...props}
    />
  )
}

export { Calendar }
