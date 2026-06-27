"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function createBotAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.id) {
    redirect("/login")
  }

  const name = String(formData.get("name") ?? "").trim()
  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim()
  const personality = String(formData.get("personality") ?? "").trim()
  const welcomeMessage = String(formData.get("welcomeMessage") ?? "").trim()

  if (!name) {
    throw new Error("Bot name is required")
  }

  // TODO: Check the user's plan here before allowing bot creation.
  // This is where we will enforce the 3-bot limit and other plan rules later.

  const botCount = await prisma.bot.count({
    where: { userId: session.user.id },
  })

  const bot = await prisma.bot.create({
    data: {
      userId: session.user.id,
      name,
      avatarUrl: avatarUrl || null,
      personality: personality || null,
      welcomeMessage: welcomeMessage || null,
      status: "DRAFT",
      meta: {
        source: "manual",
        botIndex: botCount + 1,
      },
    },
  })

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      activeBotId: bot.id,
    },
  })

  redirect("/bots")
}
