"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"
import { Button } from "@kibo/ui/components/button"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-overlay data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-fast data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-moderate",
        className
      )}
      {...props}
    />
  )
}

const sheetVariants = cva(
  "fixed z-50 flex flex-col overscroll-contain bg-popover text-body-sm text-popover-foreground shadow-raised outline-none data-[state=closed]:animate-out data-[state=closed]:duration-fast data-[state=open]:animate-in data-[state=open]:duration-moderate data-[state=open]:ease-emphasized",
  {
    variants: {
      side: {
        // Record detail: from the end edge; a bottom sheet on phones.
        right:
          "inset-y-0 end-0 h-full w-full max-w-[420px] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right max-sm:inset-x-0 max-sm:top-auto max-sm:bottom-0 max-sm:h-auto max-sm:max-h-[85dvh] max-sm:max-w-none max-sm:rounded-t-xl max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=open]:slide-in-from-bottom rtl:data-[state=open]:slide-in-from-left",
        // Phone menus: the whole screen from the start edge.
        left: "inset-y-0 start-0 h-dvh w-full bg-page shadow-none data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        top: "inset-x-0 top-0 h-dvh bg-page shadow-none data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        bottom:
          "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-xl data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      },
      size: {
        default: "",
        lg: "sm:max-w-[560px]",
      },
    },
    defaultVariants: { side: "right", size: "default" },
  }
)

/**
 * Detail for one record without leaving the list (a viewer, a message), or
 * a full-screen phone menu with `side="left"` or `"top"`. Modal: focus is
 * trapped, Escape closes, focus returns to the trigger.
 */
function SheetContent({
  className,
  children,
  side,
  size,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetVariants> & {
    showCloseButton?: boolean
  }) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side ?? "right"}
        className={cn(sheetVariants({ side, size }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close data-slot="sheet-close" asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute inset-e-4 top-4 max-sm:size-11"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

/** Title row: media, name and the close button's space. */
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex items-center gap-3 border-b border-separator px-5 py-4 pe-16",
        className
      )}
      {...props}
    />
  )
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn("flex flex-1 flex-col gap-5 overflow-y-auto p-5", className)}
      {...props}
    />
  )
}

/** Sticky actions, end-aligned; block buttons on phones. */
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex justify-end gap-3 border-t border-separator px-5 py-4 max-sm:flex-col-reverse max-sm:*:h-12 max-sm:*:w-full",
        className
      )}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-heading text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-caption text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
