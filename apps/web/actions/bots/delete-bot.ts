"use server"

import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"
import {
  logServerActionError,
  requireActionUser,
} from "@/lib/require-action-user"

export async function deleteBotAction(formData: FormData) {
  const user = await requireActionUser()

  const botId = String(formData.get("botId") ?? "").trim()

  if (!botId) {
    redirect("/bots")
  }

  try {
    const targetBot = await prisma.bot.findFirst({
      where: { id: botId, userId: user.id },
      select: { id: true },
    })

    if (targetBot) {
      const [remainingBots, activeUser] = await prisma.$transaction([
        prisma.bot.findMany({
          where: { userId: user.id, id: { not: botId } },
          orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
          select: { id: true },
          take: 1,
        }),
        prisma.user.findUnique({
          where: { id: user.id },
          select: { activeBotId: true },
        }),
      ])

      await prisma.bot.delete({
        where: { id: botId },
      })

      if (activeUser?.activeBotId === botId) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            activeBotId: remainingBots[0]?.id ?? null,
          },
        })
      }
    }
  } catch (error) {
    logServerActionError("deleteBotAction", error)
    redirect("/bots")
  }

  redirect("/bots")
}
