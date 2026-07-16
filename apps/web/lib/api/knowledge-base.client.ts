import { apiClientFetch } from "@/lib/api/client"
import type {
  CreateKnowledgeInput,
  ImportFaqCsvInput,
  ImportFaqCsvResponse,
  KnowledgeBaseItem,
  UpdateKnowledgeInput,
} from "@/lib/api/types"

export async function createKnowledgeItem(input: CreateKnowledgeInput) {
  return apiClientFetch<KnowledgeBaseItem>("/knowledge-base", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export async function updateKnowledgeItem(
  itemId: string,
  input: UpdateKnowledgeInput
) {
  return apiClientFetch<KnowledgeBaseItem>(`/knowledge-base/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  })
}

export async function deleteKnowledgeItem(itemId: string) {
  return apiClientFetch<{ deleted: boolean }>(`/knowledge-base/${itemId}`, {
    method: "DELETE",
  })
}

export async function importFaqCsv(input: ImportFaqCsvInput) {
  return apiClientFetch<ImportFaqCsvResponse>("/knowledge-base/faq/import", {
    method: "POST",
    body: JSON.stringify(input),
  })
}
