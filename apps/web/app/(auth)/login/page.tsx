import type { Metadata } from "next"
import Link from "next/link"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Panel } from "@kibo/ui/components/panel"
import { Stat } from "@/components/atoms/stat"
import { Eyebrow, Heading } from "@kibo/ui/components/typography"
import { LoginForm } from "@/components/organisms/login-form"
import { AuthTemplate } from "@/components/templates/auth-template"

export const metadata: Metadata = { title: "Log in" }

type Props = { searchParams: Promise<{ session?: string }> }

export default async function LoginPage({ searchParams }: Props) {
  const { session } = await searchParams

  return (
    <AuthTemplate
      switchLink={
        <>
          New to Kibo? <Link href="/signup">Create an account</Link>
        </>
      }
      aside={
        <>
          <Heading as="h2">Welcome back</Heading>
          {/* An example recap until real stream summaries exist. */}
          <Panel className="gap-3">
            <Eyebrow>After every stream</Eyebrow>
            <AutoGrid min="120px" gap="tight">
              <Stat label="Questions answered" value="312" />
              <Stat label="Time saved" value="2h 40m" />
            </AutoGrid>
            <p className="text-caption text-muted-foreground">
              Example · Ranked grind to Immortal — day 14
            </p>
          </Panel>
        </>
      }
    >
      <LoginForm expired={session === "expired"} />
    </AuthTemplate>
  )
}
