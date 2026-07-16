"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { toast } from "sonner"

import {
  createKnowledgeItem,
  deleteKnowledgeItem,
  importFaqCsv,
  updateKnowledgeItem,
} from "@/lib/api/knowledge-base.client"
import type {
  CreateKnowledgeInput,
  ImportFaqCsvInput,
  UpdateKnowledgeInput,
} from "@/lib/api/types"
import { useRequest } from "@/hooks/use-request"

export function useKnowledgeBasePage() {
  const router = useRouter()

  const createKnowledgeRequest = useRequest(
    useCallback(async (input: CreateKnowledgeInput) => createKnowledgeItem(input), []),
    {
      onSuccess: () => {
        toast.success("Knowledge added.")
        router.refresh()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const updateKnowledgeRequest = useRequest(
    useCallback(
      async (input: { itemId: string; values: UpdateKnowledgeInput }) =>
        updateKnowledgeItem(input.itemId, input.values),
      []
    ),
    {
      onSuccess: () => {
        toast.success("Knowledge updated.")
        router.refresh()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const deleteKnowledgeRequest = useRequest(
    useCallback(async (itemId: string) => deleteKnowledgeItem(itemId), []),
    {
      onSuccess: () => {
        toast.success("Knowledge deleted.")
        router.refresh()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const importFaqCsvRequest = useRequest(
    useCallback(async (input: ImportFaqCsvInput) => importFaqCsv(input), []),
    {
      onSuccess: (result) => {
        toast.success(
          `${result.importedCount} ${
            result.importedCount === 1 ? "FAQ" : "FAQs"
          } imported.`
        )
        router.refresh()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  return {
    createKnowledge: createKnowledgeRequest.run,
    isCreatingKnowledge: createKnowledgeRequest.isPending,
    updateKnowledge: updateKnowledgeRequest.run,
    isUpdatingKnowledge: updateKnowledgeRequest.isPending,
    deleteKnowledge: deleteKnowledgeRequest.run,
    isDeletingKnowledge: deleteKnowledgeRequest.isPending,
    importFaqCsv: importFaqCsvRequest.run,
    isImportingFaqCsv: importFaqCsvRequest.isPending,
  }
}
