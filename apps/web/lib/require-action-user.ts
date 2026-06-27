import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

export async function requireActionUser() {
  let session: Awaited<ReturnType<typeof auth.api.getSession>>

  try {
    session = await auth.api.getSession({
      headers: await headers(),
    })
  } catch (error) {
    console.error("Failed to resolve action session", error)
    redirect("/login")
  }

  if (!session?.user.id) {
    redirect("/login")
  }

  return {
    id: session.user.id,
  }
}

export function logServerActionError(action: string, error: unknown) {
  console.error(`Server action failed: ${action}`, error)
}
