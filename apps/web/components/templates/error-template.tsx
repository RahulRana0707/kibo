import { BrandLogo } from "@/components/atoms/brand-logo"

/** A centered error page: logo, big status code, message and actions. */
export function ErrorTemplate({
  code,
  title,
  description,
  actions,
  footnote,
}: {
  code: string
  title: string
  description: string
  actions: React.ReactNode
  footnote?: React.ReactNode
}) {
  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background p-10 text-center max-sm:p-6"
    >
      <BrandLogo />
      <span className="text-[4rem] leading-none font-bold tracking-[-0.03em] text-link tabular">
        {code}
      </span>
      <h1 className="text-title">{title}</h1>
      <p className="max-w-[40ch] text-muted-foreground">{description}</p>
      <div className="flex flex-wrap justify-center gap-2">{actions}</div>
      {footnote}
    </main>
  )
}
