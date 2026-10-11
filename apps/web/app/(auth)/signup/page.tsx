import type { Metadata } from "next"
import Link from "next/link"

import { SignupBrandPanel } from "@/components/organisms/auth/brand-panel"
import { SignupForm } from "@/components/organisms/auth/signup-form"
import { AuthTemplate } from "@/components/templates/auth-template"

export const metadata: Metadata = { title: "Sign up" }

export default function SignupPage() {
  return (
    <AuthTemplate
      switchLink={
        <>
          Already have an account? <Link href="/login">Log in</Link>
        </>
      }
      aside={<SignupBrandPanel />}
    >
      <SignupForm />
    </AuthTemplate>
  )
}
