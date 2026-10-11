"use client"

import * as React from "react"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  FileTextIcon,
  UploadIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"
import { Button } from "@kibo/ui/components/button"
import { Progress } from "@kibo/ui/components/meter"
import { Spinner } from "@kibo/ui/components/spinner"

/**
 * Drop or pick files. The zone is a label for a hidden file input, so Tab
 * and Enter open the picker. Files of the wrong type or over `maxSize` are
 * rejected with a reason; on phones it reads as a button.
 */
function FileDropzone({
  accept,
  maxSize,
  multiple = false,
  onFiles,
  onReject,
  disabledReason,
  hint,
  className,
}: {
  /** Extensions, such as ".csv,.xlsx,.pdf". */
  accept: string
  maxSize?: number
  multiple?: boolean
  onFiles: (files: File[]) => void
  onReject?: (file: File, reason: "type" | "size") => void
  /** Disabled, with the reason written in the zone. */
  disabledReason?: string
  /** Formats and size, such as “CSV, XLSX, PDF or TXT · up to 10 MB”. */
  hint: string
  className?: string
}) {
  const inputId = React.useId()
  const [over, setOver] = React.useState(false)
  const [rejected, setRejected] = React.useState(false)
  const extensions = accept.split(",").map((ext) => ext.trim().toLowerCase())

  React.useEffect(() => {
    if (!rejected) return
    const timer = window.setTimeout(() => setRejected(false), 3000)
    return () => window.clearTimeout(timer)
  }, [rejected])

  function take(list: FileList | null) {
    if (!list) return
    const accepted: File[] = []
    for (const file of Array.from(list)) {
      const ext = `.${file.name.split(".").pop()?.toLowerCase()}`
      if (!extensions.includes(ext)) {
        setRejected(true)
        onReject?.(file, "type")
      } else if (maxSize && file.size > maxSize) {
        setRejected(true)
        onReject?.(file, "size")
      } else {
        accepted.push(file)
      }
    }
    if (accepted.length) onFiles(accepted)
  }

  const disabled = Boolean(disabledReason)

  return (
    <label
      htmlFor={inputId}
      onDragOver={(event) => {
        if (disabled) return
        event.preventDefault()
        setOver(true)
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(event) => {
        event.preventDefault()
        setOver(false)
        if (!disabled) take(event.dataTransfer.files)
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center gap-3 rounded-lg border-[1.5px] border-dashed border-border-strong bg-page px-5 py-8 text-center transition-colors duration-fast has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
        over && "border-primary bg-primary-subtle",
        rejected && "border-destructive bg-destructive-subtle",
        disabled && "cursor-not-allowed border-border-control bg-sunken",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-10 place-items-center rounded-lg bg-primary-subtle text-link [&_svg]:size-5",
          disabled && "bg-sunken text-disabled",
          rejected && "bg-destructive-subtle text-destructive-text"
        )}
      >
        {rejected ? <CircleAlertIcon /> : <UploadIcon />}
      </span>
      <span className="flex flex-col gap-1">
        <span className={cn("font-medium", disabled && "text-disabled")}>
          <span className="max-sm:hidden">Drop a file here or </span>
          <span className="text-link max-sm:text-foreground">
            <span className="sm:hidden">Choose a file</span>
            <span className="max-sm:hidden">choose one</span>
          </span>
        </span>
        <span className="text-caption text-muted-foreground">
          {disabledReason ??
            (rejected ? "That file can’t be added. " + hint : hint)}
        </span>
      </span>
      <input
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={(event) => {
          take(event.currentTarget.files)
          event.currentTarget.value = ""
        }}
      />
    </label>
  )
}

/** Bytes as “142 KB” or “3.2 MB”. */
function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** One file after the dropzone: uploading, processing, done or failed. */
function FileRow({
  name,
  size,
  status,
  progress,
  result,
  error,
  onCancel,
  onRetry,
  className,
}: {
  name: string
  size: number
  status: "uploading" | "processing" | "done" | "failed"
  /** 0–100 while uploading. */
  progress?: number
  /** What happened when done: “142 answers added”. */
  result?: string
  error?: string
  onCancel?: () => void
  onRetry?: () => void
  className?: string
}) {
  const detail = {
    uploading: `${formatSize(size)} · Uploading ${progress ?? 0}%`,
    processing: `${formatSize(size)} · Reading answers…`,
    done: result ?? formatSize(size),
    failed: error ?? "Upload failed.",
  }[status]

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-transparent bg-raised p-3 shadow-border",
        status === "failed" &&
          "shadow-[inset_0_0_0_1px_var(--vi-danger-border)]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-md bg-sunken [&_svg]:size-4",
          status === "done" && "bg-success-subtle text-success-text",
          status === "failed" && "bg-destructive-subtle text-destructive-text"
        )}
      >
        {status === "done" ? (
          <CircleCheckIcon />
        ) : status === "failed" ? (
          <CircleAlertIcon />
        ) : (
          <FileTextIcon />
        )}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-body-sm font-medium">{name}</span>
        <span
          role={status === "done" || status === "failed" ? "status" : undefined}
          className={cn(
            "flex items-center gap-2 text-caption text-muted-foreground tabular",
            status === "failed" && "text-destructive-text"
          )}
        >
          {status === "processing" ? <Spinner /> : null}
          {detail}
        </span>
        {status === "uploading" ? (
          <Progress label={`Uploading ${name}`} value={progress ?? 0} />
        ) : null}
      </div>
      {status === "failed" && onRetry ? (
        <Button variant="secondary" size="xs" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
      {status === "uploading" && onCancel ? (
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={`Cancel upload of ${name}`}
          onClick={onCancel}
        >
          <XIcon />
        </Button>
      ) : null}
    </div>
  )
}

export { FileDropzone, FileRow, formatSize }
