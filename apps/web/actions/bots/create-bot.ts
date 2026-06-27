"use server"

import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"
import {
  logServerActionError,
  requireActionUser,
} from "@/lib/require-action-user"
import {
  readBotFormValues,
  validateBotFormValues,
  type BotFormState,
} from "@/components/bots/bot-form-state"

export async function createBotAction(
  _prevState: BotFormState,
  formData: FormData
): Promise<BotFormState> {
  const user = await requireActionUser()

  const values = readBotFormValues(formData)
  const validation = validateBotFormValues(values)

  if (validation.formError) {
    return validation
  }

  // TODO: Check the user's plan here before allowing bot creation.
  // This is where we will enforce the 3-bot limit and other plan rules later.

  try {
    const botCount = await prisma.bot.count({
      where: { userId: user.id },
    })

    const bot = await prisma.bot.create({
      data: {
        userId: user.id,
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
      where: { id: user.id },
      data: {
        activeBotId: bot.id,
      },
    })
  } catch (error) {
    logServerActionError("createBotAction", error)

    return {
      formError: "We couldn't create that bot right now. Please try again.",
      fieldErrors: {},
      values,
    }
  }

  redirect("/bots")
}
