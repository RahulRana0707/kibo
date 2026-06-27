"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function deleteBotAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.id) {
    redirect("/login")
  }

  const botId = String(formData.get("botId") ?? "").trim()

  if (!botId) {
    throw new Error("Bot id is required")
  }

  const targetBot = await prisma.bot.findFirst({
    where: { id: botId, userId: session.user.id },
    select: { id: true },
  })

  if (!targetBot) {
    redirect("/bots")
  }

  const [remainingBots, activeUser] = await prisma.$transaction([
    prisma.bot.findMany({
      where: { userId: session.user.id, id: { not: botId } },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      select: { id: true },
      take: 1,
    }),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { activeBotId: true },
    }),
  ])

  await prisma.bot.delete({
    where: { id: botId },
  })

  if (activeUser?.activeBotId === botId) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        activeBotId: remainingBots[0]?.id ?? null,
      },
    })
  }

  redirect("/bots")
}
