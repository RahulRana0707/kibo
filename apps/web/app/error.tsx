"use client"

import Link from "next/link"

import { Button, buttonVariants } from "@kibo/ui/components/button"

import { ErrorTemplate } from "@/components/templates/error-template"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorTemplate
      code="500"
      title="Something went wrong on our side"
      description="Your live bots keep running — this only affects the dashboard. Try again in a moment."
      actions={
        <>
          <Button onClick={reset}>Try again</Button>
          <Link href="/help" className={buttonVariants({ variant: "ghost" })}>
            Get help
          </Link>
        </>
      }
      footnote={
        error.digest ? (
          <span className="font-mono text-caption text-muted-foreground">
            Error ID {error.digest}
          </span>
        ) : null
      }
    />
  )
}
