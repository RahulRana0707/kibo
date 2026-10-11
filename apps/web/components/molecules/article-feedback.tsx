"use client"

import { useState } from "react"

import { Button } from "@kibo/ui/components/button"
import { FieldCounter, FieldLabel } from "@kibo/ui/components/field"
import { Textarea } from "@kibo/ui/components/textarea"

type Step = "ask" | "thanks" | "follow-up" | "sending" | "sent"

/**
 * “Was this helpful?” at the end of help articles. A No asks one optional
 * follow-up. `onSend` receives it; until feedback is stored it can be left
 * out and the note is only acknowledged.
 */
export function ArticleFeedback({
  onSend,
}: {
  onSend?: (note: string) => Promise<void>
}) {
  const [step, setStep] = useState<Step>("ask")
  const [note, setNote] = useState("")

  async function send() {
    setStep("sending")
    try {
      await onSend?.(note)
    } finally {
      setStep("sent")
    }
  }

  return (
    <section
      aria-label="Feedback"
      className="mt-4 flex max-w-130 flex-col gap-3 rounded-xl bg-surface p-5"
    >
      {step === "ask" ? (
        <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
          <legend className="mb-3 p-0 text-[0.9375rem] font-medium">
            Was this article helpful?
          </legend>
          <div className="flex flex-wrap gap-3 max-sm:*:h-11 max-sm:*:flex-1">
            <Button variant="secondary" size="sm" onClick={() => setStep("thanks")}>
              Yes
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setStep("follow-up")}>
              No
            </Button>
          </div>
        </fieldset>
      ) : null}
      {step === "thanks" || step === "sent" ? (
        <p role="status" className="text-[0.9375rem] font-medium">
          Thanks for letting us know.
        </p>
      ) : null}
      {step === "follow-up" || step === "sending" ? (
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault()
            void send()
          }}
        >
          <FieldLabel htmlFor="feedback-note" optional>
            What were you looking for?
          </FieldLabel>
          <Textarea
            id="feedback-note"
            autoFocus
            maxLength={500}
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
          <FieldCounter value={note.length} max={500} />
          <div className="flex flex-wrap gap-3">
            <Button type="submit" size="sm" loading={step === "sending"}>
              {step === "sending" ? "Sending…" : "Send feedback"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setStep("thanks")}
            >
              Skip
            </Button>
          </div>
        </form>
      ) : null}
    </section>
  )
}
