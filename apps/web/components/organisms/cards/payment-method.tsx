import { CreditCardIcon, PlusIcon } from "lucide-react"

import { Badge } from "@kibo/ui/components/badge"
import { Button } from "@kibo/ui/components/button"
import { cn } from "@kibo/ui/lib/utils"

export type PaymentMethod = {
  id: string
  /** “Visa ending 4242”, “PayPal”, “UPI”. */
  label: string
  /** “Expires 08/28”, an email, a UPI ID. */
  detail: string
  kind: "card" | "paypal" | "upi"
  isDefault?: boolean
  state?: "ok" | "expiring" | "failed" | "expired"
  /** Why it needs attention: “Declined Oct 8 · insufficient funds”. */
  reason?: string
}

/**
 * A saved way to pay. One is the default; expiring or failed methods are
 * edged in their tone with one fix. Never shows more than the last four.
 */
export function PaymentMethodRow({
  method,
  onMakeDefault,
  onUpdate,
  onRemove,
}: {
  method: PaymentMethod
  onMakeDefault?: () => void
  onUpdate?: () => void
  onRemove?: () => void
}) {
  const state = method.state ?? "ok"
  return (
    <div
      aria-label={`${method.label}, ${method.detail}${method.isDefault ? ", default" : ""}`}
      className={cn(
        "flex max-w-[520px] flex-wrap items-center gap-3 rounded-lg bg-raised p-4 shadow-border",
        state === "expiring" && "shadow-[inset_0_0_0_1px_var(--vi-warning-border)]",
        (state === "failed" || state === "expired") && "shadow-[inset_0_0_0_1px_var(--vi-danger-border)]"
      )}
    >
      <span aria-hidden="true" className="grid h-8 w-12 shrink-0 place-items-center rounded-sm bg-sunken text-xs font-semibold text-muted-foreground">
        {method.kind === "card" ? <CreditCardIcon className="size-4" /> : method.kind === "paypal" ? "PayPal" : "UPI"}
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-body-sm font-medium">{method.label}</span>
        <span
          className={cn(
            "text-caption text-muted-foreground",
            state === "expiring" && "text-warning-text",
            (state === "failed" || state === "expired") && "text-destructive-text"
          )}
        >
          {method.reason ?? method.detail}
        </span>
      </div>
      {method.isDefault ? <Badge>Default</Badge> : null}
      {state === "expired" ? (
        <Button variant="secondary" size="xs" onClick={onRemove}>
          Remove
        </Button>
      ) : state !== "ok" ? (
        <Button variant="secondary" size="xs" onClick={onUpdate}>
          Update
        </Button>
      ) : !method.isDefault ? (
        <Button variant="ghost" size="xs" onClick={onMakeDefault}>
          Make default
        </Button>
      ) : null}
    </div>
  )
}

/** The dashed “Add a payment method” row. */
export function AddPaymentMethod({ onAdd }: { onAdd?: () => void }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="flex max-w-[520px] items-center gap-2 rounded-lg border-[1.5px] border-dashed border-border-strong p-4 text-body-sm text-muted-foreground hover:bg-hovered hover:text-foreground"
    >
      <PlusIcon aria-hidden="true" className="size-4" />
      Add a payment method
    </button>
  )
}
