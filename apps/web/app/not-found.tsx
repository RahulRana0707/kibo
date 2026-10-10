import Link from "next/link"

import { buttonVariants } from "@kibo/ui/components/button"

import { ErrorTemplate } from "@/components/templates/error-template"

export default function NotFound() {
  return (
    <ErrorTemplate
      code="404"
      title="This page left the stream"
      description="The link may be old, or the page was moved or deleted."
      actions={
        <>
          <Link href="/dashboard" className={buttonVariants()}>
            Go to dashboard
          </Link>
          <Link href="/help" className={buttonVariants({ variant: "ghost" })}>
            Get help
          </Link>
        </>
      }
    />
  )
}
