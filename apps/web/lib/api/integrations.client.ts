import { apiClientFetch } from "@/lib/api/client"
import type {
  StartIntegrationInput,
  StartIntegrationResponse,
} from "@/lib/api/types"

export async function startIntegration(input: StartIntegrationInput) {
  return apiClientFetch<StartIntegrationResponse>("/integrations/start", {
    method: "POST",
    body: JSON.stringify(input),
  })
}
