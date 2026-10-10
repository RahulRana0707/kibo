import Link from "next/link"

import { buttonVariants } from "@kibo/ui/components/button"

/** The large "Start free trial" call to action used across marketing pages. */
export function TrialLink({ label = "Start free trial" }: { label?: string }) {
  return (
    <Link href="/signup" className={buttonVariants({ size: "lg" })}>
      {label}
    </Link>
  )
}
