import Link from "next/link"

import { Icons } from "@/components/icons"
import { NotFoundMagnetic } from "@/components/motion/not-found/magnetic"
import { Badge } from "@kibo/ui/components/badge"

export default function NotFound() {
  return (
    <main className="dark min-h-svh overflow-hidden bg-background text-foreground">
      <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="size-8" />
            <span className="font-heading text-sm font-semibold">Kibo</span>
          </Link>
          <Badge variant="outline">404</Badge>
        </header>
        <section className="grid flex-1 place-items-center py-16">
          <NotFoundMagnetic
            title="This page drifted out of chat."
            description="The route you opened is not available yet. Head back to the creator workspace or return to the landing page."
            homeHref="/"
            homeLabel="Back home"
            browseHref="/dashboard"
            browseLabel="Open dashboard"
          />
        </section>
      </div>
    </main>
  )
}
