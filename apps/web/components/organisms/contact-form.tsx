"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"

import { Button } from "@kibo/ui/components/button"
import { Input } from "@kibo/ui/components/input"
import { Label } from "@kibo/ui/components/label"
import { Textarea } from "@kibo/ui/components/textarea"
import { cn } from "@kibo/ui/lib/utils"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { chipClassName } from "@/components/atoms/chip"
import { NativeSelect } from "@/components/atoms/native-select"

const platformOptions = ["YouTube", "Twitch", "Kick", "TikTok"]

type Errors = Partial<Record<"name" | "email", string>>

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="text-caption text-destructive-text">
      {message}
    </p>
  ) : null
}

/** The sales contact form. Validates on submit. */
export function ContactForm() {
  const [platforms, setPlatforms] = useState(["YouTube", "Twitch"])
  const [errors, setErrors] = useState<Errors>({})

  function togglePlatform(platform: string) {
    setPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform]
    )
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const next: Errors = {}

    if (!name) {
      next.name = "Enter your full name."
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = "Enter an email address like name@example.com."
    }

    setErrors(next)

    const firstInvalid = Object.keys(next)[0]
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }

    // The sales inbox isn't connected yet.
    toast.info(
      "The contact form isn’t connected yet. Email sales@kibo.gg instead."
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-label="Contact sales"
      className="flex min-w-0 flex-[1_1_480px] flex-col gap-6 rounded-xl border border-transparent bg-raised p-8 shadow-border max-sm:p-5"
    >
      <AutoGrid min="200px" gap="tight">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name">Full name</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Priya Shah"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email">Work email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="priya@northbound.gg"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </AutoGrid>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-company">Company or channel</Label>
        <Input
          id="contact-company"
          name="company"
          placeholder="Northbound Talent"
        />
      </div>
      <AutoGrid min="200px" gap="tight">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-creators">Creators you manage</Label>
          <NativeSelect
            id="contact-creators"
            name="creators"
            defaultValue="10–49"
          >
            <option>Just me</option>
            <option>2–9</option>
            <option>10–49</option>
            <option>50 or more</option>
          </NativeSelect>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-viewers">
            Biggest channel’s average viewers
          </Label>
          <NativeSelect
            id="contact-viewers"
            name="viewers"
            defaultValue="1,000–9,999"
          >
            <option>Under 100</option>
            <option>100–999</option>
            <option>1,000–9,999</option>
            <option>10,000 or more</option>
          </NativeSelect>
        </div>
      </AutoGrid>
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-body-sm font-medium">
          Platforms you stream on
        </legend>
        <div className="flex flex-wrap gap-2">
          {platformOptions.map((platform) => {
            const checked = platforms.includes(platform)
            return (
              <label
                key={platform}
                className={cn(
                  chipClassName,
                  "cursor-pointer",
                  checked
                    ? "bg-primary-subtle text-link shadow-[inset_0_0_0_1px_var(--vi-accent-border)]"
                    : "bg-raised shadow-border"
                )}
              >
                <input
                  type="checkbox"
                  name="platforms"
                  value={platform}
                  checked={checked}
                  onChange={() => togglePlatform(platform)}
                  className="accent-primary"
                />
                {platform}
              </label>
            )
          })}
        </div>
      </fieldset>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">What would you like help with?</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="We run 18 creators and want shared ban lists plus monthly sponsor reports."
        />
      </div>
      <label className="flex min-h-10 cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          name="updates"
          className="size-5 accent-primary"
        />
        <span className="text-body-sm font-medium">
          Send me product updates
        </span>
      </label>
      <Button type="submit" size="lg">
        Send message
      </Button>
      <p className="text-caption text-muted-foreground">
        We reply within one business day. By sending, you agree to our{" "}
        <Link href="/legal/privacy" className="text-link">
          Privacy policy
        </Link>
        .
      </p>
    </form>
  )
}
