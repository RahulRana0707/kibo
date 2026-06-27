"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import {
  logServerActionError,
  requireActionUser,
} from "@/lib/require-action-user"

export async function setActiveBotAction(formData: FormData) {
  const user = await requireActionUser()
  const botId = String(formData.get("botId") ?? "").trim()

  if (!botId) {
    return
  }

  try {
    const bot = await prisma.bot.findFirst({
      where: {
        id: botId,
        userId: user.id,
      },
      select: { id: true },
    })

    if (!bot) {
      return
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        activeBotId: bot.id,
      },
    })

    revalidatePath("/bots")
    revalidatePath("/knowledge-base")
  } catch (error) {
    logServerActionError("setActiveBotAction", error)
  }
}
