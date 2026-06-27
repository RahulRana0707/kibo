"use server"

import { revalidatePath } from "next/cache"

import { parseFaqCsv } from "@/lib/parse-faq-csv"
import { prisma } from "@/lib/prisma"
import {
  logServerActionError,
  requireActionUser,
} from "@/lib/require-action-user"
import type { KnowledgeFormState } from "@/components/knowledge-base/knowledge-form-state"

export async function importFaqCsvAction(
  _prevState: KnowledgeFormState,
  formData: FormData
): Promise<KnowledgeFormState> {
  const user = await requireActionUser()

  const botId = String(formData.get("botId") ?? "").trim()
  const file = formData.get("csv")

  if (!botId) {
    return {
      formError: "Create a bot before importing FAQs.",
      fieldErrors: {},
      values: {},
    }
  }

  if (!(file instanceof File) || file.size === 0) {
    return {
      formError: "Choose a CSV file to import.",
      fieldErrors: { csv: ["CSV file is required."] },
      values: { botId },
    }
  }

  try {
    const bot = await prisma.bot.findFirst({
      where: { id: botId, userId: user.id },
      select: { id: true },
    })

    if (!bot) {
      return {
        formError: "We couldn't find that bot.",
        fieldErrors: {},
        values: { botId },
      }
    }

    const rows = parseFaqCsv(await file.text())

    if (!rows.length) {
      return {
        formError: "No FAQ rows found. Use CSV headers: question, answer.",
        fieldErrors: { csv: ["No valid question and answer rows were found."] },
        values: { botId },
      }
    }

    await prisma.knowledgeItem.createMany({
      data: rows.map((row, index) => ({
        userId: user.id,
        botId: bot.id,
        type: "FAQ",
        question: row.question,
        answer: row.answer,
        title: row.question,
        content: row.answer,
        sortOrder: index,
        meta: {
          source: "csv",
          filename: file.name,
        },
      })),
    })

    revalidatePath("/knowledge-base")

    return {
      formSuccess: `${rows.length} ${rows.length === 1 ? "FAQ" : "FAQs"} imported.`,
      importedCount: rows.length,
      fieldErrors: {},
      values: { botId },
    }
  } catch (error) {
    logServerActionError("importFaqCsvAction", error)

    return {
      formError: "We couldn't import that CSV right now. Please try again.",
      fieldErrors: {},
      values: { botId },
    }
  }
}
