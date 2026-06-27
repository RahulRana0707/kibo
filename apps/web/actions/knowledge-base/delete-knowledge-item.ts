"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import {
  logServerActionError,
  requireActionUser,
} from "@/lib/require-action-user"

export async function deleteKnowledgeItemAction(formData: FormData) {
  const user = await requireActionUser()

  const itemId = String(formData.get("itemId") ?? "").trim()

  if (!itemId) {
    return
  }

  try {
    await prisma.knowledgeItem.deleteMany({
      where: {
        id: itemId,
        userId: user.id,
      },
    })

    revalidatePath("/knowledge-base")
  } catch (error) {
    logServerActionError("deleteKnowledgeItemAction", error)
  }
}
