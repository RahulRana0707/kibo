"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"
import { Button } from "@kibo/ui/components/button"
import { Field, FieldLabel } from "@kibo/ui/components/field"
import { Input } from "@kibo/ui/components/input"

/**
 * Only for actions that can't be undone or that change a live stream;
 * reversible actions get an Undo toast. The title is a question naming
 * the thing, the confirm button a verb plus the object. With
 * `typeToConfirm` the button stays unavailable until the name matches
 * exactly. Focus starts on Cancel.
 */
function ConfirmDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel,
  pendingLabel,
  cancelLabel = "Cancel",
  variant = "destructive",
  typeToConfirm,
  onConfirm,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  /** “Delete Cozy Pip?” */
  title: string
  /** What is lost, in numbers, and the safer alternative. */
  description: React.ReactNode
  /** “Delete bot”, never “OK”. */
  confirmLabel: string
  /** “Deleting…” while `onConfirm` runs. */
  pendingLabel?: string
  cancelLabel?: string
  /** `default` for live-impact actions that aren't destructive. */
  variant?: "destructive" | "default"
  typeToConfirm?: string
  onConfirm: () => void | Promise<void>
}) {
  const [typed, setTyped] = React.useState("")
  const [pending, setPending] = React.useState(false)
  const inputId = React.useId()
  const matched = !typeToConfirm || typed === typeToConfirm

  return (
    <AlertDialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) setTyped("")
        onOpenChange?.(next)
      }}
    >
      {trigger ? (
        <AlertDialogPrimitive.Trigger asChild>{trigger}</AlertDialogPrimitive.Trigger>
      ) : null}
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <AlertDialogPrimitive.Content
          className={cn(
            "fixed z-50 flex flex-col gap-5 bg-popover p-6 text-body-sm shadow-raised outline-none",
            "max-sm:inset-x-0 max-sm:bottom-0 max-sm:rounded-t-xl max-sm:p-5 max-sm:data-[state=open]:animate-in max-sm:data-[state=open]:slide-in-from-bottom",
            "sm:top-1/2 sm:left-1/2 sm:w-[calc(100%-2rem)] sm:max-w-[420px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:data-[state=open]:animate-in sm:data-[state=open]:fade-in-0 motion-safe:sm:data-[state=open]:zoom-in-[0.96]"
          )}
        >
          <div className="flex flex-col gap-2">
            <AlertDialogPrimitive.Title className="text-heading">
              {title}
            </AlertDialogPrimitive.Title>
            <AlertDialogPrimitive.Description asChild>
              <div className="text-body-sm text-muted-foreground">{description}</div>
            </AlertDialogPrimitive.Description>
          </div>
          {typeToConfirm ? (
            <Field>
              <FieldLabel htmlFor={inputId}>
                Type <span className="font-semibold">{typeToConfirm}</span> to confirm
              </FieldLabel>
              <Input
                id={inputId}
                value={typed}
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => setTyped(event.target.value)}
              />
            </Field>
          ) : null}
          <div className="flex flex-col-reverse gap-3 max-sm:*:h-12 sm:flex-row sm:justify-end">
            <AlertDialogPrimitive.Cancel asChild>
              <Button variant="ghost">{cancelLabel}</Button>
            </AlertDialogPrimitive.Cancel>
            <Button
              variant={variant === "destructive" ? "destructive" : "primary"}
              loading={pending}
              aria-disabled={!matched || undefined}
              onClick={async (event) => {
                event.preventDefault()
                if (!matched || pending) return
                setPending(true)
                try {
                  await onConfirm()
                  onOpenChange?.(false)
                } finally {
                  setPending(false)
                }
              }}
            >
              {pending ? (pendingLabel ?? confirmLabel) : confirmLabel}
            </Button>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}

export { ConfirmDialog }
