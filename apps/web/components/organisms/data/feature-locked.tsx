"use client"

import { useState } from "react"
import { GaugeIcon, LockIcon, TriangleAlertIcon } from "lucide-react"

import { Badge } from "@kibo/ui/components/badge"
import { Button } from "@kibo/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@kibo/ui/components/dialog"
import { Meter } from "@kibo/ui/components/meter"
import { cn } from "@kibo/ui/lib/utils"

import { IconTile } from "@/components/atoms/icon-tile"
import { DetailList } from "@/components/molecules/detail-list"

/*
 * Plan gates and limits. Locked is not Soon: the feature exists on a
 * higher plan, so it names the plan, the price and a way up. Hitting a
 * limit always offers a way out that isn't paying.
 */

/** A locked feature inside a page: plan badge, what it does, one way up. */
export function LockedInline({
  title,
  description,
  plan,
  price,
  onUpgrade,
}: {
  title: string
  description: string
  plan: string
  /** “$79 a month”. */
  price: string
  onUpgrade: () => void
}) {
  return (
    <div className="flex flex-wrap items-start gap-4 rounded-xl bg-raised p-5 shadow-border">
      <IconTile>
        <LockIcon />
      </IconTile>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-heading">{title}</h3>
          <Badge variant="outline">
            <LockIcon />
            {plan}
          </Badge>
        </div>
        <p className="text-body-sm text-muted-foreground">{description}</p>
        <p className="text-caption text-muted-foreground">
          {plan} plan required · {price}
        </p>
      </div>
      <Button size="sm" onClick={onUpgrade}>
        Upgrade to {plan}
      </Button>
    </div>
  )
}

/**
 * Usage against a plan limit: neutral below 80%, warning approaching,
 * danger at the limit, always with an option that isn't upgrading.
 */
export function LimitNotice({
  label,
  used,
  limit,
  valueText,
  message,
  upgrade,
  alternative,
}: {
  label: string
  used: number
  limit: number
  valueText: string
  message: string
  upgrade?: React.ReactNode
  /** “Archive old items”: the way out that isn't paying. */
  alternative?: React.ReactNode
}) {
  const share = used / limit
  const tone = share >= 1 ? "danger" : share >= 0.8 ? "warning" : "neutral"
  return (
    <div className="flex flex-wrap items-start gap-4 rounded-xl bg-raised p-5 shadow-border">
      <IconTile tone={tone}>{tone === "neutral" ? <GaugeIcon /> : <TriangleAlertIcon />}</IconTile>
      <div className="flex min-w-[220px] flex-1 flex-col gap-3">
        <Meter label={label} value={used} max={limit} usage valueText={valueText} />
        <p className={cn("text-body-sm", tone === "danger" ? "text-destructive-text" : "text-muted-foreground")}>
          {message}
        </p>
        <div className="flex flex-wrap gap-2">
          {upgrade}
          {alternative}
        </div>
      </div>
    </div>
  )
}

/** A whole page behind a plan: what it is, a preview, the price and Upgrade. */
export function LockedPage({
  title,
  description,
  plan,
  priceLine,
  preview,
  onUpgrade,
}: {
  title: string
  description: string
  plan: string
  priceLine: string
  preview?: React.ReactNode
  onUpgrade: () => void
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-12 text-center">
      <IconTile size="lg">
        <LockIcon />
      </IconTile>
      <Badge variant="outline">
        <LockIcon />
        {plan}
      </Badge>
      <h1 className="text-title">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <p className="text-caption text-muted-foreground">{priceLine}</p>
      <Button onClick={onUpgrade}>Upgrade to {plan}</Button>
      {preview ? (
        <div aria-hidden="true" className="mt-4 w-full opacity-60 blur-[2px]">
          {preview}
        </div>
      ) : null}
    </div>
  )
}

/** States what changes today and next before the button. */
export function UpgradeDialog({
  open,
  onOpenChange,
  plan,
  today,
  then,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan: string
  /** “$79.00 + GST, trial ends now”. */
  today: string
  /** “$79 / month on the 10th”. */
  then: string
  onConfirm: () => Promise<void>
}) {
  const [pending, setPending] = useState(false)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Upgrade to {plan}?</DialogTitle>
          <DialogDescription>Your bots keep running while you switch.</DialogDescription>
        </DialogHeader>
        <DetailList
          items={[
            { term: "Today", value: today },
            { term: "Then", value: then },
          ]}
        />
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            loading={pending}
            onClick={async () => {
              setPending(true)
              try {
                await onConfirm()
              } finally {
                setPending(false)
              }
            }}
          >
            {pending ? "Upgrading…" : `Upgrade to ${plan}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
