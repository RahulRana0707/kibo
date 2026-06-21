import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "@/components/theme-toggler"
import { Button } from "@kibo/ui/components/button"
import { Icons } from "@/components/icons"

export default function Home() {
  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground select-none">
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/landing-background.png"
          alt="Landing Background"
          fill
          priority
          className="object-cover opacity-90"
        />
      </div>

      {/* Bottom fade so content reads cleanly over the image */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-1/4 bg-gradient-to-t from-background via-background/40 to-transparent" />

      {/* Floating nav */}
      <header className="fixed top-6 left-1/2 z-50 flex w-[90%] max-w-4xl -translate-x-1/2 items-center justify-between rounded-full border border-border bg-background/50 px-5 py-2.5 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Icons.logo className="size-7" />
          <span className="text-base font-bold tracking-tight text-foreground">
            Kibo
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Sign In
          </Link>
          <ModeToggle />
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-20 mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center gap-8 px-4 text-center">
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-7xl">
            Let Kibo handle<br className="hidden md:block" /> the chat.
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground md:text-xl">
            Kibo joins your live stream, answers viewer questions, moderates spam, and keeps your community engaged — so you can focus on creating.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/signup">
            <Button
              variant="default"
              className="h-12 w-full rounded-xl px-8 font-semibold sm:w-auto"
            >
              Get Started Free
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="h-12 w-full rounded-xl px-8 font-semibold sm:w-auto"
            >
              Sign In
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          Works with YouTube Live · Twitch · Discord — more coming soon
        </p>
      </main>

      {/* Footer */}
      <footer className="relative z-20 px-8 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kibo. All rights reserved.
      </footer>
    </div>
  )
}
