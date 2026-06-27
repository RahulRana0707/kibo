"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import {
  logServerActionError,
  requireActionUser,
} from "@/lib/require-action-user"
import {
  readFaqFormValues,
  validateFaqValues,
  type KnowledgeFormState,
} from "@/components/knowledge-base/knowledge-form-state"

export async function createFaqAction(
  _prevState: KnowledgeFormState,
  formData: FormData
): Promise<KnowledgeFormState> {
  const user = await requireActionUser()

  const values = readFaqFormValues(formData)

  if (!values.botId) {
    return {
      formError: "Create a bot before adding knowledge.",
      fieldErrors: {},
      values,
    }
  }

  const validation = validateFaqValues(values)

  if (validation.formError) {
    return validation
  }

  try {
    const bot = await prisma.bot.findFirst({
      where: { id: values.botId, userId: user.id },
      select: { id: true },
    })

    if (!bot) {
      return {
        formError: "We couldn't find that bot.",
        fieldErrors: {},
        values,
      }
    }

    await prisma.knowledgeItem.create({
      data: {
        userId: user.id,
        botId: bot.id,
        type: "FAQ",
        question: values.question,
        answer: values.answer,
        title: values.question,
        content: values.answer,
      },
    })

    revalidatePath("/knowledge-base")

    return {
      formSuccess: "FAQ added.",
      fieldErrors: {},
      values: { botId: bot.id },
    }
  } catch (error) {
    logServerActionError("createFaqAction", error)

    return {
      formError: "We couldn't add that FAQ right now. Please try again.",
      fieldErrors: {},
      values,
    }
  }
}
