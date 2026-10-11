"use client"

import { useState } from "react"

/** Text clamped to two lines with a Show more / Show less toggle. */
export function ClampedText({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-start gap-0.5">
      <div className={open ? undefined : "line-clamp-2"}>{children}</div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="text-caption font-medium text-link hover:underline"
      >
        {open ? "Show less" : "Show more"}
      </button>
    </div>
  )
}
