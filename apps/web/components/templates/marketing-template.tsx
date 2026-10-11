import { CookieBanner } from "@/components/organisms/marketing/cookie-banner"
import { SiteFooter } from "@/components/organisms/marketing/site-footer"
import { SiteHeader } from "@/components/organisms/marketing/site-header"

/** Header, page content and footer for every public page. */
export function MarketingTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <CookieBanner />
    </div>
  )
}
