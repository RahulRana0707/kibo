"use server"

import { revalidatePath } from "next/cache"

import {
  readKnowledgeItemFormValues,
  validateKnowledgeItemValues,
  type KnowledgeFormState,
} from "@/components/knowledge-base/knowledge-form-state"
import { prisma } from "@/lib/prisma"
import {
  logServerActionError,
  requireActionUser,
} from "@/lib/require-action-user"

export async function createKnowledgeItemAction(
  _prevState: KnowledgeFormState,
  formData: FormData
): Promise<KnowledgeFormState> {
  const user = await requireActionUser()

  const values = readKnowledgeItemFormValues(formData)

  if (!values.botId) {
    return {
      formError: "Create a bot before adding knowledge.",
      fieldErrors: {},
      values,
    }
  }

  const validation = validateKnowledgeItemValues(values)

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
        type: values.type as "LINK" | "RULE" | "NOTE",
        title: values.title,
        content: values.content,
        sourceUrl: values.sourceUrl,
        meta: {
          source: "manual",
        },
      },
    })

    revalidatePath("/knowledge-base")

    return {
      formSuccess: `${values.type?.toLowerCase()} added.`,
      fieldErrors: {},
      values: { botId: bot.id, type: values.type },
    }
  } catch (error) {
    logServerActionError("createKnowledgeItemAction", error)

    return {
      formError: "We couldn't add that knowledge right now. Please try again.",
      fieldErrors: {},
      values,
    }
  }
}
