"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@kibo/ui/components/button"
import { Input } from "@kibo/ui/components/input"
import { Label } from "@kibo/ui/components/label"

import { DividerText } from "@kibo/ui/components/separator"
import { FieldMessage } from "@kibo/ui/components/field"
import { Meter } from "@kibo/ui/components/meter"
import { Callout } from "@kibo/ui/components/callout"
import { PasswordField } from "@/components/molecules/password-field"
import { SocialSignIn } from "@/components/molecules/social-sign-in"
import { classifyAuthError, isEmail, isStrongPassword } from "@/lib/auth-errors"
import { authClient } from "@/lib/auth-client"
import { nameFromEmail } from "@/lib/initials"

type Errors = {
  email?: "invalid" | "taken"
  password?: boolean
  terms?: boolean
  form?: string
}

export function SignupForm() {
  const router = useRouter()
  const [errors, setErrors] = useState<Errors>({})
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const data = new FormData(event.currentTarget)
    const email = String(data.get("email") ?? "").trim()
    const password = String(data.get("password") ?? "")
    const terms = data.get("terms") === "on"

    const next: Errors = {}
    if (!isEmail(email)) next.email = "invalid"
    if (!isStrongPassword(password)) next.password = true
    if (!terms) next.terms = true
    setErrors(next)

    const firstInvalid = next.email
      ? "su-email"
      : next.password
        ? "su-password"
        : next.terms
          ? "su-terms"
          : null
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }

    setPending(true)
    const { error } = await authClient.signUp.email({
      email,
      password,
      // The design asks only for email; the display name is set during onboarding.
      name: nameFromEmail(email),
    })
    setPending(false)

    const kind = classifyAuthError(error)
    if (!kind) {
      router.push("/dashboard")
      router.refresh()
      return
    }

    if (kind === "email-taken") {
      setErrors({ email: "taken" })
      document.getElementById("su-email")?.focus()
    } else if (kind === "invalid-email") {
      setErrors({ email: "invalid" })
      document.getElementById("su-email")?.focus()
    } else if (kind === "weak-password") {
      setErrors({ password: true })
      document.getElementById("su-password")?.focus()
    } else if (kind === "rate-limited") {
      setErrors({ form: "Too many attempts. Wait a minute, then try again." })
    } else {
      setErrors({
        form: "Unable to create your account. Check your connection and try again.",
      })
    }
  }

  const hasFieldError = Boolean(errors.email || errors.password || errors.terms)

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="su-title"
      className="flex w-full max-w-[400px] flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <h1 id="su-title" className="text-title">
          Create your Kibo account
        </h1>
        <p className="text-muted-foreground">
          Start your free trial. Set up your first bot in a few minutes.
        </p>
      </div>

      <SocialSignIn />
      <DividerText>or with email</DividerText>

      {errors.form ? (
        <Callout tone="danger" role="alert">
          {errors.form}
        </Callout>
      ) : hasFieldError ? (
        <Callout tone="danger" role="alert">
          Fix the highlighted field to continue.
        </Callout>
      ) : null}

      <div className="flex flex-col gap-2">
        <Label htmlFor="su-email">Email</Label>
        <Input
          id="su-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "su-email-msg" : undefined}
        />
        {errors.email === "taken" ? (
          <FieldMessage id="su-email-msg" error>
            An account already uses this email.{" "}
            <Link href="/login">Log in</Link> instead.
          </FieldMessage>
        ) : errors.email === "invalid" ? (
          <FieldMessage id="su-email-msg" error>
            Enter an email address like name@example.com.
          </FieldMessage>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <PasswordField
          id="su-password"
          name="password"
          autoComplete="new-password"
          invalid={errors.password}
          describedBy="su-password-msg"
        />
        {errors.password ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Meter value={25} tone="danger" className="flex-1" />
              <span className="text-caption font-medium text-destructive-text">
                Weak
              </span>
            </div>
            <FieldMessage id="su-password-msg" error>
              Use at least 10 characters, including a number or symbol.
            </FieldMessage>
          </div>
        ) : (
          <FieldMessage id="su-password-msg">
            At least 10 characters, with a number or symbol.
          </FieldMessage>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex min-h-10 cursor-pointer items-start gap-3 py-2.5">
          <input
            id="su-terms"
            name="terms"
            type="checkbox"
            defaultChecked
            aria-invalid={errors.terms ? true : undefined}
            aria-describedby={errors.terms ? "su-terms-msg" : undefined}
            className="mt-px size-5 shrink-0 accent-primary"
          />
          <span className="text-body-sm/5">
            I agree to the{" "}
            <Link href="/legal/terms" className="text-link">
              Terms of service
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className="text-link">
              Privacy policy
            </Link>
          </span>
        </label>
        {errors.terms ? (
          <FieldMessage id="su-terms-msg" error>
            Agree to the terms to create your account.
          </FieldMessage>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        aria-disabled={pending || undefined}
        className="w-full"
      >
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  )
}
