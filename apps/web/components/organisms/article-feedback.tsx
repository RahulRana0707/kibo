"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@kibo/ui/components/button"

/** "Was this article helpful?" with a thank-you once answered. */
export function ArticleFeedback() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null)

  return (
    <section
      aria-label="Feedback"
      className="mt-4 flex flex-col gap-3 rounded-xl bg-surface p-6"
    >
      <div role="status" className="flex flex-col gap-3">
        {answer === null ? (
          <>
            <p className="font-medium">Was this article helpful?</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => setAnswer("yes")}>
                Yes, it helped
              </Button>
              <Button variant="secondary" onClick={() => setAnswer("no")}>
                No, I need more help
              </Button>
            </div>
          </>
        ) : answer === "yes" ? (
          <p className="font-medium">Thanks for letting us know.</p>
        ) : (
          <p className="font-medium">
            Sorry it didn’t help.{" "}
            <Link href="/contact" className="text-link">
              Contact our team
            </Link>{" "}
            and we’ll sort it out.
          </p>
        )}
      </div>
    </section>
  )
}
