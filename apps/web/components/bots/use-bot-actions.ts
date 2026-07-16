"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { toast } from "sonner"

import {
  deleteBot,
  setActiveBot,
} from "@/lib/api/bots.client"
import { useRequest } from "@/hooks/use-request"

export function useBotActions() {
  const router = useRouter()

  const deleteBotRequest = useRequest(
    useCallback(async (botId: string) => deleteBot(botId), []),
    {
      onSuccess: () => {
        toast.success("Bot deleted.")
        router.refresh()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const setActiveBotRequest = useRequest(
    useCallback(async (botId: string) => setActiveBot(botId), []),
    {
      onSuccess: () => {
        toast.success("Active bot updated.")
        router.refresh()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  return {
    deleteBot: deleteBotRequest.run,
    isDeletingBot: deleteBotRequest.isPending,
    setActiveBot: setActiveBotRequest.run,
    isSettingActiveBot: setActiveBotRequest.isPending,
  }
}
