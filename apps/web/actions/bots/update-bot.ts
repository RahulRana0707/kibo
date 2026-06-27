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

export async function updateBotAction(
  _prevState: BotFormState,
  formData: FormData
): Promise<BotFormState> {
  const user = await requireActionUser()

  const values = readBotFormValues(formData)

  if (!values.botId) {
    return {
      formError: "Bot id is required.",
      fieldErrors: {},
      values,
    }
  }

  const validation = validateBotFormValues(values)

  if (validation.formError) {
    return validation
  }

  try {
    const result = await prisma.bot.updateMany({
      where: { id: values.botId, userId: user.id },
      data: {
        name: values.name ?? "",
        avatarUrl: values.avatarUrl || null,
        personality: values.personality || null,
        welcomeMessage: values.welcomeMessage || null,
      },
    })

    if (!result.count) {
      return {
        formError: "We couldn't update that bot. Please try again.",
        fieldErrors: {},
        values,
      }
    }
  } catch (error) {
    logServerActionError("updateBotAction", error)

    return {
      formError: "We couldn't update that bot right now. Please try again.",
      fieldErrors: {},
      values,
    }
  }

  redirect("/bots")
}
