"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@kibo/ui/components/button"
import { Input } from "@kibo/ui/components/input"
import { Label } from "@kibo/ui/components/label"

import { DividerText } from "@/components/atoms/divider-text"
import { Callout } from "@/components/molecules/callout"
import { PasswordField } from "@/components/molecules/password-field"
import { SocialSignIn } from "@/components/molecules/social-sign-in"
import { classifyAuthError, isEmail } from "@/lib/auth-errors"
import { authClient } from "@/lib/auth-client"

type Problem = "missing" | "wrong" | "rate-limited" | "unknown"

const messages: Record<Problem, string> = {
  missing: "Enter your email address and password to log in.",
  wrong: "That email and password don’t match. Check both and try again.",
  "rate-limited":
    "Too many attempts. Logins are paused for a moment to keep your channel safe. Wait a minute, then try again.",
  unknown: "Unable to log in. Check your connection and try again.",
}

/** Email and password log-in. `expired` shows the session-expired heading. */
export function LoginForm({ expired = false }: { expired?: boolean }) {
  const router = useRouter()
  const [problem, setProblem] = useState<Problem | null>(null)
  const [pending, setPending] = useState(false)

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
      rememberMe: data.get("remember") === "on",
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
          role="alert"
        >
          {messages[problem]}
        </Callout>
      ) : null}

      <SocialSignIn />
      <DividerText>or with email</DividerText>

      <div className="flex flex-col gap-2">
        <Label htmlFor="li-email">Email</Label>
        <Input
          id="li-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          aria-invalid={invalid || undefined}
        />
      </div>
      <div className="flex flex-col gap-2">
        <PasswordField
          id="li-password"
          name="password"
          autoComplete="current-password"
          invalid={invalid}
          describedBy="li-forgot-note"
          labelAside={
            <span aria-disabled="true" className="text-caption text-disabled">
              Forgot password?
            </span>
          }
        />
        <p id="li-forgot-note" className="text-caption text-muted-foreground">
          Password reset is coming soon.
        </p>
      </div>
      <label className="flex min-h-10 cursor-pointer items-center gap-3">
        <input
          name="remember"
          type="checkbox"
          defaultChecked
          className="size-5 shrink-0 accent-primary"
        />
        <span className="text-body-sm">Keep me logged in on this device</span>
      </label>
      <Button
        type="submit"
        size="lg"
        aria-disabled={pending || undefined}
        className="w-full"
      >
        {pending ? "Logging in…" : "Log in"}
      </Button>
    </form>
  )
}
