"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@kibo/ui/components/button"
import { Callout } from "@kibo/ui/components/callout"
import { CheckboxField } from "@kibo/ui/components/checkbox"
import { Field, FieldLabel } from "@kibo/ui/components/field"
import { Input } from "@kibo/ui/components/input"
import { DividerText } from "@kibo/ui/components/separator"
import { SoonLabel } from "@kibo/ui/components/soon-label"

import { PasswordField } from "@/components/molecules/password-field"
import { SocialSignIn } from "@/components/molecules/social-sign-in"
import { classifyAuthError, isEmail } from "@/lib/auth-errors"
import { authClient } from "@/lib/auth-client"

type Problem = "missing" | "wrong" | "rate-limited" | "unknown"

const messages: Record<Problem, string> = {
  missing: "Enter your email address and password to log in.",
  wrong: "That email and password don’t match. Check both and try again.",
  "rate-limited": "Too many attempts. Wait a minute and try again.",
  unknown: "Unable to log in. Check your connection and try again.",
}

/**
 * Email and password log-in. Wrong credentials never say which field was
 * wrong; too many attempts is a warning and the form stays usable.
 * `expired` shows the session-expired heading, which knows nothing about
 * who was signed in.
 */
export function LoginForm({ expired = false }: { expired?: boolean }) {
  const router = useRouter()
  const [problem, setProblem] = useState<Problem | null>(null)
  const [pending, setPending] = useState(false)
  const [remember, setRemember] = useState(true)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const data = new FormData(event.currentTarget)
    const email = String(data.get("email") ?? "").trim()
    const password = String(data.get("password") ?? "")

    if (!isEmail(email) || !password) {
      setProblem("missing")
      document
        .getElementById(isEmail(email) ? "li-password" : "li-email")
        ?.focus()
      return
    }

    setPending(true)
    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: remember,
    })
    setPending(false)

    const kind = classifyAuthError(error)
    if (!kind) {
      router.push("/dashboard")
      router.refresh()
      return
    }

    setProblem(
      kind === "wrong-credentials" || kind === "invalid-email"
        ? "wrong"
        : kind === "rate-limited"
          ? "rate-limited"
          : "unknown"
    )
  }

  const invalid = problem === "wrong" || problem === "missing"

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="li-title"
      aria-busy={pending || undefined}
      className="flex w-full max-w-[400px] flex-col gap-6"
    >
      {expired ? (
        <div className="flex flex-col gap-2">
          <h1 id="li-title" className="text-title">
            Your session expired
          </h1>
          <p className="text-muted-foreground">
            For your security we log you out after a while. Log in to pick up
            where you left off.
          </p>
        </div>
      ) : (
        <h1 id="li-title" className="text-title">
          Log in
        </h1>
      )}

      {problem ? (
        <Callout
          tone={problem === "rate-limited" ? "warning" : "danger"}
          role={problem === "rate-limited" ? "status" : "alert"}
        >
          {messages[problem]}
        </Callout>
      ) : null}

      <SocialSignIn />
      <DividerText>or with email</DividerText>

      <Field>
        <FieldLabel htmlFor="li-email">Email</FieldLabel>
        <Input
          id="li-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          aria-invalid={invalid || undefined}
          className="max-sm:h-12"
        />
      </Field>
      <Field>
        <PasswordField
          id="li-password"
          name="password"
          autoComplete="current-password"
          invalid={invalid}
          describedBy="li-forgot-note"
          labelAside={
            <span
              aria-disabled="true"
              className="flex items-center gap-1.5 text-caption text-disabled"
            >
              Forgot password? <SoonLabel />
            </span>
          }
        />
        <p id="li-forgot-note" className="text-caption text-muted-foreground">
          Password reset is coming soon.
        </p>
      </Field>
      <CheckboxField
        label="Keep me logged in for 30 days"
        checked={remember}
        onCheckedChange={(value) => setRemember(value === true)}
        className="py-0"
      />
      <Button type="submit" size="lg" block loading={pending}>
        {pending ? "Logging in…" : "Log in"}
      </Button>
    </form>
  )
}
