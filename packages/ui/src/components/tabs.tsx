"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"

/**
 * Swaps panels without leaving the page. `underline` for page sections,
 * `contained` inside cards and dialogs. Tabs that change the URL are
 * TabLinks (a nav of links), not these.
 */
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

const listVariants = {
  underline:
    "flex gap-1 overflow-x-auto border-b border-separator [scrollbar-width:none]",
  contained: "inline-flex w-fit gap-1 rounded-lg bg-sunken p-1",
}

const triggerVariants = {
  underline:
    "-mb-px min-h-10 border-b-2 border-transparent px-3 text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground",
  contained:
    "h-8 rounded-md px-3 text-muted-foreground hover:text-foreground data-[state=active]:bg-raised data-[state=active]:text-foreground data-[state=active]:shadow-border",
}

type Variant = keyof typeof listVariants

const TabsVariant = React.createContext<Variant>("underline")

function TabsList({
  className,
  variant = "underline",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & { variant?: Variant }) {
  return (
    <TabsVariant.Provider value={variant}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        className={cn(listVariants[variant], className)}
        {...props}
      />
    </TabsVariant.Provider>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const variant = React.useContext(TabsVariant)

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 text-body-sm font-medium whitespace-nowrap disabled:cursor-not-allowed disabled:text-disabled",
        triggerVariants[variant],
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
