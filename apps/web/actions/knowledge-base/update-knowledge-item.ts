"use server"

import { revalidatePath } from "next/cache"

import {
  readKnowledgeEditFormValues,
  validateKnowledgeEditValues,
  type KnowledgeFormState,
} from "@/components/knowledge-base/knowledge-form-state"
import { prisma } from "@/lib/prisma"
import {
  logServerActionError,
  requireActionUser,
} from "@/lib/require-action-user"

export async function updateKnowledgeItemAction(
  _prevState: KnowledgeFormState,
  formData: FormData
): Promise<KnowledgeFormState> {
  const user = await requireActionUser()
  const values = readKnowledgeEditFormValues(formData)

  if (!values.itemId) {
    return {
      formError: "Knowledge item id is required.",
      fieldErrors: {},
      values,
    }
  }

  const validation = validateKnowledgeEditValues(values)

  if (validation.formError) {
    return validation
  }

  try {
    const item = await prisma.knowledgeItem.findFirst({
      where: {
        id: values.itemId,
        userId: user.id,
      },
      select: {
        id: true,
        type: true,
      },
    })

    if (!item) {
      return {
        formError: "We couldn't find that knowledge item.",
        fieldErrors: {},
        values,
      }
    }

    if (item.type !== values.type) {
      return {
        formError: "Knowledge type cannot be changed while editing.",
        fieldErrors: {},
        values,
      }
    }

    await prisma.knowledgeItem.update({
      where: { id: item.id },
      data:
        item.type === "FAQ"
          ? {
              question: values.question,
              answer: values.answer,
              title: values.question,
              content: values.answer,
              sourceUrl: null,
            }
          : {
              title: values.title,
              content: values.content,
              sourceUrl: item.type === "LINK" ? values.sourceUrl : null,
              question: null,
              answer: null,
            },
    })

    revalidatePath("/knowledge-base")

    return {
      formSuccess: "Knowledge updated.",
      fieldErrors: {},
      values,
    }
  } catch (error) {
    logServerActionError("updateKnowledgeItemAction", error)

    return {
      formError: "We couldn't update that knowledge right now. Please try again.",
      fieldErrors: {},
      values,
    }
  }
}
