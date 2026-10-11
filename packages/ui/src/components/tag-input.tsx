"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

/**
 * A list of words or phrases in one field: banned words, allowed links.
 * Enter or comma adds; pasting a list splits it; Backspace in the empty
 * field removes the last tag. Duplicates are refused with a note.
 */
function TagInput({
  value,
  onValueChange,
  label,
  placeholder = "Add a word",
  disabled = false,
  invalid = false,
  className,
  id,
}: {
  value: string[]
  onValueChange: (value: string[]) => void
  /** Names the list: “Banned words”. */
  label: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
  id?: string
}) {
  const [draft, setDraft] = React.useState("")
  const [duplicate, setDuplicate] = React.useState<string | null>(null)
  const [announcement, setAnnouncement] = React.useState("")

  function add(words: string[]) {
    const next = [...value]
    const added: string[] = []
    let repeated: string | null = null
    for (const raw of words) {
      const word = raw.trim()
      if (!word) continue
      if (next.some((item) => item.toLowerCase() === word.toLowerCase())) {
        repeated = word
        continue
      }
      next.push(word)
      added.push(word)
    }
    if (added.length) onValueChange(next)
    setDuplicate(repeated)
    setAnnouncement(
      repeated
        ? `${repeated} is already on the list`
        : added.length
          ? `${added.join(", ")} added`
          : ""
    )
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        className={cn(
          "flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border border-input bg-sunken px-1.5 py-[5px] has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring max-sm:min-h-12",
          invalid && "border-destructive",
          disabled && "cursor-not-allowed border-border-control"
        )}
      >
        {value.length ? (
          <ul aria-label={label} className="contents">
            {value.map((word) => (
              <li
                key={word}
                className={cn(
                  "inline-flex h-[26px] items-center gap-0.5 rounded-sm bg-raised ps-2 pe-0.5 text-caption font-medium shadow-border motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-[0.96] motion-safe:duration-fast max-sm:h-8",
                  duplicate?.toLowerCase() === word.toLowerCase() &&
                    "bg-warning-subtle text-warning-text shadow-[inset_0_0_0_1px_var(--vi-warning-border)]"
                )}
              >
                {word}
                <button
                  type="button"
                  aria-label={`Remove ${word}`}
                  disabled={disabled}
                  onClick={() => {
                    onValueChange(value.filter((item) => item !== word))
                    setAnnouncement(`${word} removed`)
                  }}
                  className="grid size-[22px] place-items-center rounded-sm text-muted-foreground hover:bg-hovered hover:text-foreground max-sm:size-8"
                >
                  <XIcon aria-hidden="true" className="size-3" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        <input
          id={id}
          value={draft}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-label={value.length ? `Add to ${label}` : label}
          placeholder={placeholder}
          onChange={(event) => {
            const text = event.target.value
            if (text.endsWith(",")) {
              add([text.slice(0, -1)])
              setDraft("")
            } else {
              setDraft(text)
              setDuplicate(null)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              add([draft])
              setDraft("")
            } else if (event.key === "Backspace" && !draft && value.length) {
              onValueChange(value.slice(0, -1))
            }
          }}
          onPaste={(event) => {
            const text = event.clipboardData.getData("text")
            if (/[,\n]/.test(text)) {
              event.preventDefault()
              add(text.split(/[,\n]/))
            }
          }}
          className="h-7 min-w-32 flex-1 bg-transparent px-1.5 text-body outline-none placeholder:text-disabled disabled:cursor-not-allowed"
        />
      </div>
      {duplicate ? (
        <p className="text-caption text-warning-text">
          “{duplicate}” is already on the list.
        </p>
      ) : null}
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </div>
  )
}

export { TagInput }
