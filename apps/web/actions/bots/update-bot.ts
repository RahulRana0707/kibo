"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function updateBotAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.id) {
    redirect("/login")
  }

  const botId = String(formData.get("botId") ?? "").trim()
  const name = String(formData.get("name") ?? "").trim()
  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim()
  const personality = String(formData.get("personality") ?? "").trim()
  const welcomeMessage = String(formData.get("welcomeMessage") ?? "").trim()

  if (!botId) {
    throw new Error("Bot id is required")
  }

  if (!name) {
    throw new Error("Bot name is required")
  }

  await prisma.bot.updateMany({
    where: { id: botId, userId: session.user.id },
    data: {
      name,
      avatarUrl: avatarUrl || null,
      personality: personality || null,
      welcomeMessage: welcomeMessage || null,
    },
  })

  redirect("/bots")
}
