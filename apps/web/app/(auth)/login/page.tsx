import type { Metadata } from "next"
import Link from "next/link"

import { LoginBrandPanel } from "@/components/organisms/auth/brand-panel"
import { LoginForm } from "@/components/organisms/auth/login-form"
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
      aside={<LoginBrandPanel />}
    >
      <LoginForm expired={session === "expired"} />
    </AuthTemplate>
  )
}
