"use client"

import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@kibo/ui/components/input-group"

type PasswordInputProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "type"
>

export function PasswordInput(props: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const visibilityLabel = isPasswordVisible ? "Hide password" : "Show password"

  return (
    <InputGroup className="h-10 rounded-xl bg-background">
      <InputGroupInput
        {...props}
        type={isPasswordVisible ? "text" : "password"}
        className="px-3 text-foreground placeholder:text-muted-foreground"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label={visibilityLabel}
          aria-pressed={isPasswordVisible}
          disabled={props.disabled}
          onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
          size="icon-xs"
        >
          {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
