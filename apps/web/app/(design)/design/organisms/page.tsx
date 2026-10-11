import { LoginBrandPanel, SignupBrandPanel } from "@/components/organisms/auth/brand-panel"
import { LoginForm } from "@/components/organisms/auth/login-form"
import { SignupForm } from "@/components/organisms/auth/signup-form"
import { CookieBanner } from "@/components/organisms/marketing/cookie-banner"
import { CtaBanner } from "@/components/organisms/marketing/cta-banner"
import { HeroChatDemo } from "@/components/organisms/marketing/hero-chat-demo"
import { PlatformStrip } from "@/components/organisms/marketing/platform-strip"
import { PricingPlans } from "@/components/organisms/marketing/pricing-plans"
import { SiteFooter } from "@/components/organisms/marketing/site-footer"
import { SiteHeader } from "@/components/organisms/marketing/site-header"

import { Board, Group } from "../_components/showcase"
import { DataBoard, ShellBoard } from "../_boards/organisms-app"
import { ProductCardsBoard } from "../_boards/organisms-cards"

export const metadata = { title: "Organisms · Component library" }

export default function OrganismsPage() {
  return (
    <>
      <h1 className="text-display">Organisms</h1>
      <Board
        id="marketing"
        layer="Organisms"
        title="Marketing: header, footer, pricing, CTA, hero demo"
        description="The site header opens a Product menu and lifts after 8px of scroll; on phones it collapses to Get started and a full-screen menu. Open the menus and resize to check."
        importLine='import { SiteHeader, SiteFooter, PricingPlans, CtaBanner, … } from "@/components/organisms/marketing/…"'
      >
        <div className="relative overflow-visible rounded-xl shadow-border">
          <SiteHeader />
        </div>
        <Group title="Hero chat demo · platform strip" className="grid w-full grid-cols-2 gap-8 max-lg:grid-cols-1">
          <HeroChatDemo />
          <PlatformStrip />
        </Group>
        <PricingPlans heading={<h3 className="text-title">Pick the plan your chat needs</h3>} />
        <CtaBanner title="Give your chat a community manager" lede="Start free for 14 days." />
        <div className="overflow-hidden rounded-xl shadow-border">
          <SiteFooter />
        </div>
        <CookieBanner />
      </Board>
      <Board
        id="auth"
        layer="Organisms"
        title="Auth: sign up, log in, brand panels"
        description="Sign up asks for Name, Email, Password and Terms; errors show at each field and in one summary that takes focus. Log in never says which field was wrong. Brand panels show labelled examples, nothing personal."
        importLine='import { SignupForm, LoginForm, SignupBrandPanel, LoginBrandPanel } from "@/components/organisms/auth/…"'
      >
        <Group title="Forms" className="grid w-full grid-cols-3 gap-8 max-lg:grid-cols-1">
          <SignupForm />
          <LoginForm />
          <LoginForm expired />
        </Group>
        <Group title="Brand panels" className="grid w-full grid-cols-2 gap-8 max-lg:grid-cols-1">
          <div className="flex flex-col gap-5 rounded-xl bg-surface p-8">
            <SignupBrandPanel />
          </div>
          <div className="flex flex-col gap-5 rounded-xl bg-surface p-8">
            <LoginBrandPanel />
          </div>
        </Group>
      </Board>
      <ShellBoard />
      <DataBoard />
      <ProductCardsBoard />
    </>
  )
}
