"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@kibo/ui/components/button"
import { Callout } from "@kibo/ui/components/callout"
import { Checkbox } from "@kibo/ui/components/checkbox"
import { Field, FieldLabel, FieldMessage } from "@kibo/ui/components/field"
import { Input } from "@kibo/ui/components/input"
import { DividerText } from "@kibo/ui/components/separator"

import { PasswordField } from "@/components/molecules/password-field"
import { SocialSignIn } from "@/components/molecules/social-sign-in"
import { classifyAuthError, isEmail, isStrongPassword } from "@/lib/auth-errors"
import { authClient } from "@/lib/auth-client"

type FieldName = "name" | "email" | "password" | "terms"

const fieldIds: Record<FieldName, string> = {
  name: "su-name",
  email: "su-email",
  password: "su-password",
  terms: "su-terms",
}

const messages = {
  name: "Enter your name.",
  emailInvalid: "Enter an email address like name@example.com.",
  emailTaken: "An account already uses this email.",
  password: "Use at least 10 characters, including a number or symbol.",
  terms: "Agree to the terms to create your account.",
}

type Errors = Partial<Record<FieldName, string>> & { form?: string }

/**
 * Sign up: Name, Email, Password, Terms, Create account. Errors show at
 * each field and in one summary that takes focus and links to them.
 */
export function SignupForm() {
  const router = useRouter()
  const summaryRef = useRef<HTMLDivElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [pending, setPending] = useState(false)
  const [password, setPassword] = useState("")
  const [terms, setTerms] = useState(true)

  function report(next: Errors) {
    setErrors(next)
    // Move focus to the summary once it renders.
    requestAnimationFrame(() => summaryRef.current?.focus())
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()

    const next: Errors = {}
    if (!name) next.name = messages.name
    if (!isEmail(email)) next.email = messages.emailInvalid
    if (!isStrongPassword(password)) next.password = messages.password
    if (!terms) next.terms = messages.terms
    if (Object.keys(next).length) {
      report(next)
      return
    }

    setErrors({})
    setPending(true)
    const { error } = await authClient.signUp.email({ name, email, password })
    setPending(false)

    const kind = classifyAuthError(error)
    if (!kind) {
      router.push("/dashboard")
      router.refresh()
      return
    }

    if (kind === "email-taken") report({ email: messages.emailTaken })
    else if (kind === "invalid-email") report({ email: messages.emailInvalid })
    else if (kind === "weak-password") report({ password: messages.password })
    else if (kind === "rate-limited")
      report({ form: "Too many attempts. Wait a minute and try again." })
    else
      report({
        form: "Unable to create your account. Check your connection and try again.",
      })
  }

  const fieldErrors = (Object.keys(fieldIds) as FieldName[]).filter(
    (field) => errors[field]
  )

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="su-title"
      aria-busy={pending || undefined}
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
        <Callout ref={summaryRef} tabIndex={-1} tone="danger">
          {errors.form}
        </Callout>
      ) : fieldErrors.length ? (
        <Callout
          ref={summaryRef}
          tabIndex={-1}
          tone="danger"
          title={
            fieldErrors.length === 1
              ? "Fix 1 thing to continue"
              : `Fix ${fieldErrors.length} things to continue`
          }
        >
          <ul className="flex flex-col gap-1">
            {fieldErrors.map((field) => (
              <li key={field}>
                <a
                  href={`#${fieldIds[field]}`}
                  onClick={(event) => {
                    event.preventDefault()
                    document.getElementById(fieldIds[field])?.focus()
                  }}
                >
                  {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </Callout>
      ) : null}

      <Field>
        <FieldLabel htmlFor="su-name">Your name</FieldLabel>
        <Input
          id="su-name"
          name="name"
          autoComplete="name"
          placeholder="Mira Okafor"
          enterKeyHint="next"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby="su-name-msg"
          className="max-sm:h-12"
        />
        <FieldMessage id="su-name-msg" error={Boolean(errors.name)}>
          {errors.name ?? "Shown to your team, never to viewers."}
        </FieldMessage>
      </Field>

      <Field>
        <FieldLabel htmlFor="su-email">Email</FieldLabel>
        <Input
          id="su-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          enterKeyHint="next"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "su-email-msg" : undefined}
          className="max-sm:h-12"
        />
        {errors.email ? (
          <FieldMessage id="su-email-msg" error>
            {errors.email}
            {errors.email === messages.emailTaken ? (
              <>
                {" "}
                <Link href="/login">Log in</Link> instead.
              </>
            ) : null}
          </FieldMessage>
        ) : null}
      </Field>

      <Field>
        <PasswordField
          id="su-password"
          name="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          showStrength
          invalid={Boolean(errors.password)}
          describedBy="su-password-msg"
        />
        <FieldMessage id="su-password-msg" error={Boolean(errors.password)}>
          {errors.password ?? "At least 10 characters, with a number or symbol."}
        </FieldMessage>
      </Field>

      <Field>
        <div className="flex min-h-10 items-start gap-3 py-2.5">
          <Checkbox
            id="su-terms"
            checked={terms}
            onCheckedChange={(value) => setTerms(value === true)}
            aria-invalid={errors.terms ? true : undefined}
            aria-describedby={errors.terms ? "su-terms-msg" : undefined}
            className="mt-px"
          />
          <label htmlFor="su-terms" className="text-body-sm/5">
            I agree to the{" "}
            <Link href="/legal/terms" className="text-link">
              Terms of service
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className="text-link">
              Privacy policy
            </Link>
          </label>
        </div>
        {errors.terms ? (
          <FieldMessage id="su-terms-msg" error>
            {errors.terms}
          </FieldMessage>
        ) : null}
      </Field>

      <Button type="submit" size="lg" block loading={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  )
}
