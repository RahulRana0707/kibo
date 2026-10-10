"use client"

import { useState } from "react"

import { Button } from "@kibo/ui/components/button"
import { Input } from "@kibo/ui/components/input"
import { Label } from "@kibo/ui/components/label"

/** A password input with a Show/Hide toggle and an optional link beside the label. */
export function PasswordField({
  id,
  label = "Password",
  labelAside,
  invalid = false,
  describedBy,
  ...props
}: Omit<React.ComponentProps<"input">, "type"> & {
  id: string
  label?: string
  labelAside?: React.ReactNode
  invalid?: boolean
  describedBy?: string
}) {
  const [shown, setShown] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        {labelAside}
      </div>
      <div className="relative">
        <Input
          id={id}
          type={shown ? "text" : "password"}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className="pe-18"
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-pressed={shown}
          aria-controls={id}
          onClick={() => setShown((value) => !value)}
          className="absolute end-1 top-1"
        >
          {shown ? "Hide" : "Show"}
          <span className="sr-only"> password</span>
        </Button>
      </div>
    </div>
  )
}
