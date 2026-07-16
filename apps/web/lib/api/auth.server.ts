import { apiServerFetch } from "@/lib/api/server"

export type AuthSession = {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
} | null

export async function getCurrentSession() {
  return apiServerFetch<AuthSession>("/auth/session")
}
