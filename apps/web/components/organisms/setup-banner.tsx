import { InfoIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"

/** Shown until setup is finished: the bot can't join chat yet. */
export function SetupBanner() {
  return (
    <div
      role="status"
      className="flex flex-wrap items-center gap-3 bg-primary-subtle px-6 py-2.5 text-body-sm text-link max-sm:px-4"
    >
      <InfoIcon aria-hidden="true" className="size-4 shrink-0" />
      <span id="setup-banner-text" className="min-w-[200px] flex-1">
        Setup isn’t finished. Your bot won’t join chat until a platform is
        connected. Setup opens soon.
      </span>
      <Button
        variant="secondary"
        size="sm"
        disabled
        aria-describedby="setup-banner-text"
      >
        Resume setup
      </Button>
    </div>
  )
}
