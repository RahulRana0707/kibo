"use client"

import { useRouter } from "next/navigation"
import { toast } from "@kibo/ui/components/sonner"

import { authClient } from "@/lib/auth-client"

/** Ends the session and shows the "You’re logged out" screen. */
export function useLogOut() {
  const router = useRouter()

  return async function logOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/logged-out")
          router.refresh()
        },
        onError: () => {
          toast.error("Unable to log out. Check your connection and try again.")
        },
      },
    })
  }
}
