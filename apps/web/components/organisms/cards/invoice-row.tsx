import { Badge } from "@kibo/ui/components/badge"
import { Button } from "@kibo/ui/components/button"

export type InvoiceStatus = "upcoming" | "due" | "failed" | "paid" | "refunded"

const badges = {
  upcoming: { variant: "outline", word: "Upcoming" },
  due: { variant: "warning", word: "Due" },
  failed: { variant: "destructive", word: "Failed" },
  paid: { variant: "success", word: "Paid" },
  refunded: { variant: "default", word: "Refunded" },
} as const

export type Invoice = {
  id: string
  date: string
  description: string
  /** “Card declined · we retry Oct 12”. */
  note?: string
  /** Total including GST, such as “$10.62”; refunds start with a minus. */
  total: string
  /** “$9.00 + $1.62 GST”. */
  split?: string
  status: InvoiceStatus
  pdfUrl?: string
}

/** Description and its note. */
export function InvoiceDescription({ invoice }: { invoice: Invoice }) {
  return (
    <span className="flex flex-col">
      <span>{invoice.description}</span>
      {invoice.note ? (
        <span className="text-caption text-muted-foreground">{invoice.note}</span>
      ) : null}
    </span>
  )
}

/** The amount with GST, split underneath. */
export function InvoiceAmount({ invoice }: { invoice: Invoice }) {
  return (
    <span className="flex flex-col items-end">
      <span className="font-medium tabular">{invoice.total}</span>
      {invoice.split ? (
        <span className="text-caption text-muted-foreground tabular">{invoice.split}</span>
      ) : null}
    </span>
  )
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const badge = badges[status]
  return <Badge variant={badge.variant}>{badge.word}</Badge>
}

/** Pay now when failed, the PDF when issued, nothing when upcoming. */
export function InvoiceAction({
  invoice,
  onPay,
}: {
  invoice: Invoice
  onPay?: () => void
}) {
  if (invoice.status === "failed") {
    return (
      <Button size="xs" onClick={onPay}>
        Pay now
      </Button>
    )
  }
  if (invoice.pdfUrl && invoice.status !== "upcoming") {
    return (
      <a
        href={invoice.pdfUrl}
        className="text-body-sm text-link"
        aria-label={`Download invoice for ${invoice.date} (PDF)`}
      >
        PDF
      </a>
    )
  }
  return null
}
