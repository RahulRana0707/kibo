"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"

import { Button } from "@kibo/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@kibo/ui/components/dialog"

const storageKey = "kibo.cookie-consent"

type Consent = { analytics: boolean }

function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(storageKey)
    return raw ? (JSON.parse(raw) as Consent) : null
  } catch {
    return null
  }
}

function saveConsent(consent: Consent) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(consent))
  } catch {
    // Storage can be blocked; the banner simply shows again next visit.
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  return () => window.removeEventListener("storage", onChange)
}

/** Asks once for analytics consent and remembers the answer in this browser. */
export function CookieBanner() {
  // The server never shows the banner; the client shows it until a choice is saved.
  const recorded = useSyncExternalStore(
    subscribe,
    () => readConsent() !== null,
    () => true
  )
  const [decided, setDecided] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(true)

  function decide(consent: Consent) {
    saveConsent(consent)
    setCustomizing(false)
    setDecided(true)
  }

  if (recorded || decided) {
    return null
  }

  return (
    <>
      <div
        role="region"
        aria-label="Cookie consent"
        className="fixed inset-x-6 bottom-6 z-50 mx-auto flex max-w-[760px] flex-wrap items-center gap-4 rounded-xl border border-transparent bg-raised px-6 py-5 shadow-raised max-sm:inset-x-4 max-sm:bottom-4 max-sm:px-4"
      >
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-1">
          <p className="font-semibold">We use cookies</p>
          <p className="text-caption text-muted-foreground">
            Essential cookies keep you signed in. With your OK we also use
            analytics cookies to see which pages help creators most.{" "}
            <Link href="/legal/cookies" className="text-link">
              Cookie policy
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => setCustomizing(true)}>
            Customize
          </Button>
          <Button
            variant="secondary"
            onClick={() => decide({ analytics: false })}
          >
            Reject non-essential
          </Button>
          <Button onClick={() => decide({ analytics: true })}>
            Accept all
          </Button>
        </div>
      </div>
      <Dialog open={customizing} onOpenChange={setCustomizing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cookie settings</DialogTitle>
            <DialogDescription>
              Choose which cookies Kibo can use in this browser.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked
                disabled
                className="mt-0.5 size-5 accent-primary"
              />
              <span className="flex flex-col gap-0.5">
                <span className="font-medium">Essential</span>
                <span className="text-caption text-muted-foreground">
                  Keep you signed in. Always on.
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="mt-0.5 size-5 accent-primary"
              />
              <span className="flex flex-col gap-0.5">
                <span className="font-medium">Use analytics cookies</span>
                <span className="text-caption text-muted-foreground">
                  Help us see which pages help creators most.
                </span>
              </span>
            </label>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCustomizing(false)}>
              Cancel
            </Button>
            <Button onClick={() => decide({ analytics })}>Save choices</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
