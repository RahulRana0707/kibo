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

export async function updateBotAction(
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

  const result = await prisma.bot.updateMany({
    where: { id: values.botId, userId: session.user.id },
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

  redirect("/bots")
}
