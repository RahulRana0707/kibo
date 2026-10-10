"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@kibo/ui/components/button"
import { Input } from "@kibo/ui/components/input"
import { Label } from "@kibo/ui/components/label"

import { Container } from "@/components/atoms/container"
import { Section } from "@/components/atoms/section"

/** The monthly email signup band. */
export function NewsletterSignup() {
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get("email")

    if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter an email address like name@example.com.")
      return
    }

    setError(null)
    // The newsletter service isn't connected yet.
    toast.info("Newsletter signup isn’t connected yet.")
  }

  return (
    <Section tone="alt" id="newsletter" className="scroll-mt-20">
      <Container className="flex flex-wrap items-end justify-between gap-8">
        <div className="flex max-w-[520px] flex-col gap-2">
          <h2 className="text-title">Get one useful email a month</h2>
          <p className="text-muted-foreground">
            Community tips and what’s new in Kibo. No spam — we’d moderate
            ourselves.
          </p>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit}
          aria-label="Newsletter"
          className="flex max-w-[480px] flex-[1_1_360px] items-end gap-3"
        >
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="newsletter-email">Email</Label>
            <Input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "newsletter-error" : undefined}
            />
          </div>
          <Button type="submit">Subscribe</Button>
        </form>
        {error ? (
          <p
            id="newsletter-error"
            className="w-full text-end text-caption text-destructive-text"
          >
            {error}
          </p>
        ) : null}
      </Container>
    </Section>
  )
}
