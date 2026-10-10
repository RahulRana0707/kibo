"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"
import { Button } from "@kibo/ui/components/button"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-overlay data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-fast data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-fast",
        className
      )}
      {...props}
    />
  )
}

// Below 640 every dialog is a bottom sheet; lg goes full screen.
const dialogContentVariants = cva(
  "fixed z-50 flex flex-col gap-5 overscroll-contain border border-transparent bg-popover p-6 text-body-sm text-popover-foreground shadow-raised outline-none max-sm:inset-x-0 max-sm:bottom-0 max-sm:max-h-[90dvh] max-sm:overflow-y-auto max-sm:rounded-t-xl max-sm:p-5 max-sm:pb-[max(1.25rem,env(safe-area-inset-bottom))] max-sm:data-[state=open]:animate-in max-sm:data-[state=open]:slide-in-from-bottom max-sm:data-[state=open]:duration-moderate sm:top-1/2 sm:left-1/2 sm:max-h-[calc(100dvh-4rem)] sm:w-[calc(100%-2rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:overflow-y-auto sm:rounded-xl sm:data-[state=open]:animate-in sm:data-[state=open]:fade-in-0 sm:data-[state=open]:duration-moderate sm:data-[state=open]:ease-emphasized motion-safe:sm:data-[state=open]:zoom-in-[0.96] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-fast",
  {
    variants: {
      size: {
        sm: "sm:max-w-[400px]",
        md: "sm:max-w-[520px]",
        lg: "max-sm:top-0 max-sm:max-h-none max-sm:rounded-none sm:max-w-[720px]",
      },
    },
    defaultVariants: { size: "md" },
  }
)

/**
 * A modal task that must be finished or cancelled: sm 400, md 520, lg 720.
 * The content decides the width, not importance.
 */
function DialogContent({
  className,
  children,
  size,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof dialogContentVariants> & {
    showCloseButton?: boolean
  }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(dialogContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              className="absolute inset-e-3 top-3 max-sm:size-11"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1 pe-8", className)}
      {...props}
    />
  )
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("flex flex-col gap-5", className)}
      {...props}
    />
  )
}

/** Actions end-aligned: ghost Cancel, then one primary. Stacked on phone. */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-3 max-sm:*:h-12 max-sm:*:w-full sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-heading", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-body-sm text-muted-foreground *:[a]:text-link *:[a]:underline *:[a]:underline-offset-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
