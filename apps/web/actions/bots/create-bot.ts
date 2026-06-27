"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  readBotFormValues,
  validateBotFormValues,
  type BotFormState,
} from "@/components/bots/bot-form-state"

export async function createBotAction(
  _prevState: BotFormState,
  formData: FormData
): Promise<BotFormState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.id) {
    redirect("/login")
  }

  const values = readBotFormValues(formData)
  const validation = validateBotFormValues(values)

  if (validation.formError) {
    return validation
  }

  // TODO: Check the user's plan here before allowing bot creation.
  // This is where we will enforce the 3-bot limit and other plan rules later.

  const botCount = await prisma.bot.count({
    where: { userId: session.user.id },
  })

  const bot = await prisma.bot.create({
    data: {
      userId: session.user.id,
      name: values.name ?? "",
      avatarUrl: values.avatarUrl || null,
      personality: values.personality || null,
      welcomeMessage: values.welcomeMessage || null,
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
