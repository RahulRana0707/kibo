import { redirect } from "next/navigation"

import { SetupBanner } from "@/components/organisms/setup-banner"
import { AppTemplate } from "@/components/templates/app-template"
import { getCurrentSession } from "@/lib/api/auth.server"

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getCurrentSession()

  if (!session?.user.id) {
    redirect("/login")
  }

  const user = {
    name: session.user.name || "Creator",
    email: session.user.email ?? "",
  }

  return (
    <AppTemplate user={user} banner={<SetupBanner />}>
      {children}
    </AppTemplate>
  )
}
