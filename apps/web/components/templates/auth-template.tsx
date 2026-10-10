import { BrandLogo } from "@/components/atoms/brand-logo"

/**
 * The split sign-up and log-in layout: a brand panel on the leading side and
 * the form centered on the other. The brand panel stacks above the form when
 * the row stops fitting.
 */
export function AuthTemplate({
  aside,
  switchLink,
  children,
}: {
  aside: React.ReactNode
  switchLink: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-wrap bg-background">
      <aside className="flex flex-[1_1_480px] flex-col justify-between gap-12 bg-surface p-12 max-lg:hidden">
        <BrandLogo />
        <div className="flex max-w-[460px] flex-col gap-6">{aside}</div>
        <p className="text-caption text-muted-foreground">
          © {new Date().getFullYear()} Kibo
        </p>
      </aside>
      <main
        id="main"
        className="flex min-w-0 flex-[1_1_520px] flex-col p-6 max-sm:p-4"
      >
        <div className="flex min-h-12 flex-wrap items-center justify-between gap-3">
          <BrandLogo size="sm" className="lg:hidden" />
          <p className="ms-auto text-body-sm text-muted-foreground [&_a]:text-link">
            {switchLink}
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

/** A centered card on the surface background, for one-off auth states. */
export function AuthCardTemplate({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-center gap-8 bg-surface px-6 pt-8 pb-12 max-sm:px-4"
    >
      <BrandLogo />
      <div className="flex w-full flex-1 items-center justify-center">
        <div className="flex w-full max-w-[440px] flex-col gap-6 rounded-xl border border-transparent bg-raised p-8 shadow-border max-sm:p-6">
          {children}
        </div>
      </div>
    </main>
  )
}
