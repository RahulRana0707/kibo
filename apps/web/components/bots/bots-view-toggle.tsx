"use client"

import { Grid2x2Icon, Table2Icon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { cn } from "@kibo/ui/lib/utils"

export type BotsViewMode = "grid" | "table"

export function BotsViewToggle({
  value,
  onValueChange,
}: {
  value: BotsViewMode
  onValueChange: (value: BotsViewMode) => void
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border bg-background p-1">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onValueChange("grid")}
        className={cn("h-8 px-3", value === "grid" && "bg-muted text-foreground")}
      >
        <Grid2x2Icon data-icon="inline-start" />
        Grid
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onValueChange("table")}
        className={cn("h-8 px-3", value === "table" && "bg-muted text-foreground")}
      >
        <Table2Icon data-icon="inline-start" />
        Table
      </Button>
    </div>
  )
}
