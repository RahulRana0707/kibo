"use client"

import { useState } from "react"

import { Button } from "@kibo/ui/components/button"
import { FieldLabel } from "@kibo/ui/components/field"
import { Input } from "@kibo/ui/components/input"
import { StrengthMeter } from "@kibo/ui/components/meter"

/** Weak under 10 characters, fair at 10–13, strong at 14+ or 3+ words. */
export function passwordStrength(password: string) {
  const words = password.trim().split(/\s+/).filter(Boolean).length
  if (password.length >= 14 || (words >= 3 && password.length >= 10)) {
    return "strong" as const
  }
  if (password.length >= 10) return "fair" as const
  return "weak" as const
}

/**
 * A password input with a Show / Hide text button. Sign up and reset show
 * the strength meter; log in puts “Forgot password?” in `labelAside`.
 * 48 tall on phones.
 */
export function PasswordField({
  id,
  label = "Password",
  labelAside,
  invalid = false,
  describedBy,
  showStrength = false,
  value,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "size"> & {
  id: string
  label?: string
  labelAside?: React.ReactNode
  invalid?: boolean
  describedBy?: string
  /** Show the strength meter once something is typed. */
  showStrength?: boolean
}) {
  const [shown, setShown] = useState(false)
  const text = typeof value === "string" ? value : ""

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel htmlFor={id} aside={labelAside}>
        {label}
      </FieldLabel>
      <div className="relative">
        <Input
          id={id}
          type={shown ? "text" : "password"}
          value={value}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className="pe-18 max-sm:h-12"
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="xs"
          aria-pressed={shown}
          aria-controls={id}
          onClick={() => setShown((current) => !current)}
          className="absolute inset-e-1.5 top-1.5 max-sm:top-1 max-sm:h-10"
        >
          {shown ? "Hide" : "Show"}
          <span className="sr-only"> password</span>
        </Button>
      </div>
      {showStrength && text ? (
        <StrengthMeter strength={passwordStrength(text)} />
      ) : null}
    </div>
  )
}
