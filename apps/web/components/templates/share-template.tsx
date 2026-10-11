import { Container } from "@/components/atoms/container"
import { MainAside } from "@/components/atoms/main-aside"

/**
 * A public, read-only page someone shared: a slim bar on top, a 1040-wide
 * column, and a main column beside an aside that stacks under it on
 * narrow screens.
 */
export function ShareTemplate({
  bar,
  header,
  main,
  aside,
  footer,
  children,
}: {
  /** Who shared it, and the product that made it. */
  bar: React.ReactNode
  header: React.ReactNode
  /** Full-width blocks between the header and the columns. */
  children?: React.ReactNode
  main: React.ReactNode
  aside?: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <div className="min-h-svh bg-surface text-foreground">
      <header className="border-b border-separator bg-background">
        <Container className="flex min-h-16 max-w-[1040px] flex-wrap items-center justify-between gap-3 py-3">
          {bar}
        </Container>
      </header>
      <main id="main">
        <Container className="flex max-w-[1040px] flex-col gap-8 pt-12 pb-24">
          {header}
          {children}
          <MainAside main={main} aside={aside} />
          <footer className="flex flex-wrap items-center justify-between gap-3 pt-4 text-caption text-muted-foreground">
            {footer}
          </footer>
        </Container>
      </main>
    </div>
  )
}
