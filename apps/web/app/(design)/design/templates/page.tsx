import Link from "next/link"

import { Button, buttonVariants } from "@kibo/ui/components/button"
import { Field, FieldLabel } from "@kibo/ui/components/field"
import { Input } from "@kibo/ui/components/input"
import { Switch } from "@kibo/ui/components/switch"

import { SignupBrandPanel } from "@/components/organisms/auth/brand-panel"
import { LoginForm } from "@/components/organisms/auth/login-form"
import { PageHeader } from "@/components/organisms/data/page-header"
import { SettingsGroup, SettingsRow } from "@/components/organisms/data/settings"
import { AppTemplate } from "@/components/templates/app-template"
import { AuthTemplate } from "@/components/templates/auth-template"
import { ErrorTemplate } from "@/components/templates/error-template"
import { ListDetailTemplate } from "@/components/templates/list-detail-template"
import { OnboardingTemplate } from "@/components/templates/onboarding-template"
import { SettingsTemplate } from "@/components/templates/settings-template"

import { Board } from "../_components/showcase"

export const metadata = { title: "Templates · Component library" }

/** A fixed-height window so a full-page template can be inspected inline. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[720px] overflow-auto rounded-xl shadow-border [&_.min-h-svh]:min-h-full [&_.h-svh]:h-[720px]">
      {children}
    </div>
  )
}

const user = { name: "Mira Okafor", email: "mira@miraplays.gg" }
const workspace = { id: "1", name: "Mira Okafor", role: "Owner" }

export default function TemplatesPage() {
  return (
    <>
      <h1 className="text-display">Templates</h1>
      <p className="max-w-[68ch] text-muted-foreground">
        Page layouts with every slot filled. The marketing template is every
        public page: see the <Link href="/" className="text-link">landing page</Link>.
      </p>
      <Board id="app" layer="Templates" title="App" description="Sidebar, top bar, an optional system banner and the page. Below 1024 the sidebar moves into the phone menu." importLine='import { AppTemplate } from "@/components/templates/app-template"'>
        <Frame>
          <AppTemplate user={user} workspace={workspace}>
            <PageHeader title="Dashboard" description="Six steps and your bot can join your next stream." />
          </AppTemplate>
        </Frame>
      </Board>
      <Board id="settings" layer="Templates" title="Settings" description="Inside the App template: a side nav of sections and settings groups." importLine='import { SettingsTemplate } from "@/components/templates/settings-template"'>
        <Frame>
          <AppTemplate user={user} workspace={workspace}>
            <SettingsTemplate
              sections={[
                { label: "Account", items: [{ href: "#settings", label: "Profile", current: true }, { href: "#s", label: "Security" }, { href: "#n", label: "Notifications", soonReason: "Coming soon." }] },
                { label: "Workspace", items: [{ href: "#m", label: "Members" }, { href: "#b", label: "Billing", soonReason: "Coming soon." }] },
              ]}
            >
              <SettingsGroup title="Profile" footer={<Button size="sm">Save profile</Button>}>
                <SettingsRow label="Display name" htmlFor="t-name" stack control={<Input id="t-name" defaultValue="Mira Okafor" className="w-64" />} />
                <SettingsRow label="Weekly summary email" control={<Switch aria-label="Weekly summary email" defaultChecked />} />
              </SettingsGroup>
            </SettingsTemplate>
          </AppTemplate>
        </Frame>
      </Board>
      <Board id="list-detail" layer="Templates" title="List and detail" description="Page header, filter bar, table and pagination, with a side sheet for one record. See the Organisms page for the filled-in table and sheet." importLine='import { ListDetailTemplate } from "@/components/templates/list-detail-template"'>
        <ListDetailTemplate
          header={<PageHeader title="Viewers" description="Everyone who chatted while Pip was on." />}
          filters={<div className="h-10 rounded-md bg-sunken" />}
          table={<div className="h-48 rounded-xl bg-raised shadow-border" />}
          pagination={<div className="h-8 rounded-md bg-sunken" />}
        />
      </Board>
      <Board id="onboarding" layer="Templates" title="Onboarding" description="Progress bar on top, one centered card per step, Back / Skip / Continue; sticky footer on phones." importLine='import { OnboardingTemplate } from "@/components/templates/onboarding-template"'>
        <Frame>
          <OnboardingTemplate
            step={3}
            title="Teach Pip"
            description="Add a few answers your chat asks every stream."
            exitHref="#onboarding"
            back={<Button variant="ghost">Back</Button>}
            skip={<Button variant="ghost">Skip for now</Button>}
            next={<Button>Continue</Button>}
          >
            <Field>
              <FieldLabel htmlFor="t-q">A question your chat asks</FieldLabel>
              <Input id="t-q" placeholder="discord link?" />
            </Field>
          </OnboardingTemplate>
        </Frame>
      </Board>
      <Board id="auth" layer="Templates" title="Auth" description="Brand panel and form, the form first in the DOM. Below 960 the panel hides." importLine='import { AuthTemplate, AuthCardTemplate } from "@/components/templates/auth-template"'>
        <Frame>
          <AuthTemplate switchLink={<>New to Kibo? <Link href="/signup">Create an account</Link></>} aside={<SignupBrandPanel />}>
            <LoginForm />
          </AuthTemplate>
        </Frame>
      </Board>
      <Board id="error" layer="Templates" title="Error" description="Brand, code, one-line title, what it means for the stream, and two ways out." importLine='import { ErrorTemplate } from "@/components/templates/error-template"'>
        <Frame>
          <ErrorTemplate
            code="403"
            title="You don’t have access to Billing"
            description="You’re a Head moderator in Mira Okafor’s workspace. Only the owner can see billing."
            actions={
              <>
                <Link href="#error" className={buttonVariants()}>
                  Go to dashboard
                </Link>
                <Link href="#error" className={buttonVariants({ variant: "ghost" })}>
                  Get help
                </Link>
              </>
            }
          />
        </Frame>
      </Board>
    </>
  )
}
