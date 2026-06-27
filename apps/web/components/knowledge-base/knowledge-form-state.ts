export type KnowledgeFormValues = {
  itemId?: string | null
  botId?: string | null
  question?: string | null
  answer?: string | null
  type?: string | null
  title?: string | null
  content?: string | null
  sourceUrl?: string | null
}

export type KnowledgeFormFieldName =
  | "question"
  | "answer"
  | "csv"
  | "type"
  | "title"
  | "content"
  | "sourceUrl"

export type KnowledgeFormState = {
  formError?: string
  formSuccess?: string
  importedCount?: number
  fieldErrors?: Partial<Record<KnowledgeFormFieldName, string[]>>
  values?: KnowledgeFormValues
}

export const initialKnowledgeFormState: KnowledgeFormState = {
  fieldErrors: {},
  values: {},
}

export function readFaqFormValues(formData: FormData): KnowledgeFormValues {
  return {
    botId: String(formData.get("botId") ?? "").trim() || null,
    question: String(formData.get("question") ?? "").trim() || null,
    answer: String(formData.get("answer") ?? "").trim() || null,
  }
}

export function validateFaqValues(
  values: KnowledgeFormValues
): KnowledgeFormState {
  const fieldErrors: KnowledgeFormState["fieldErrors"] = {}

  if (!values.question) {
    fieldErrors.question = ["Question is required."]
  }

  if (!values.answer) {
    fieldErrors.answer = ["Answer is required."]
  }

  const hasErrors = Object.keys(fieldErrors).length > 0

  return {
    formError: hasErrors ? "Please fix the highlighted fields." : undefined,
    fieldErrors,
    values,
  }
}

export function readKnowledgeItemFormValues(
  formData: FormData
): KnowledgeFormValues {
  return {
    itemId: String(formData.get("itemId") ?? "").trim() || null,
    botId: String(formData.get("botId") ?? "").trim() || null,
    type: String(formData.get("type") ?? "").trim() || null,
    title: String(formData.get("title") ?? "").trim() || null,
    content: String(formData.get("content") ?? "").trim() || null,
    sourceUrl: String(formData.get("sourceUrl") ?? "").trim() || null,
  }
}

export function validateKnowledgeItemValues(
  values: KnowledgeFormValues
): KnowledgeFormState {
  const fieldErrors: KnowledgeFormState["fieldErrors"] = {}
  const type = values.type

  if (!type || !["LINK", "RULE", "NOTE"].includes(type)) {
    fieldErrors.type = ["Choose a knowledge type."]
  }

  if (!values.title) {
    fieldErrors.title = ["Title is required."]
  }

  if (type === "LINK") {
    if (!values.sourceUrl) {
      fieldErrors.sourceUrl = ["URL is required for links."]
    } else {
      try {
        new URL(values.sourceUrl)
      } catch {
        fieldErrors.sourceUrl = ["Enter a valid URL."]
      }
    }
  }

  if ((type === "RULE" || type === "NOTE") && !values.content) {
    fieldErrors.content = ["Content is required."]
  }

  const hasErrors = Object.keys(fieldErrors).length > 0

  return {
    formError: hasErrors ? "Please fix the highlighted fields." : undefined,
    fieldErrors,
    values,
  }
}

export function readKnowledgeEditFormValues(
  formData: FormData
): KnowledgeFormValues {
  return {
    itemId: String(formData.get("itemId") ?? "").trim() || null,
    type: String(formData.get("type") ?? "").trim() || null,
    question: String(formData.get("question") ?? "").trim() || null,
    answer: String(formData.get("answer") ?? "").trim() || null,
    title: String(formData.get("title") ?? "").trim() || null,
    content: String(formData.get("content") ?? "").trim() || null,
    sourceUrl: String(formData.get("sourceUrl") ?? "").trim() || null,
  }
}

export function validateKnowledgeEditValues(
  values: KnowledgeFormValues
): KnowledgeFormState {
  if (values.type === "FAQ") {
    return validateFaqValues(values)
  }

  return validateKnowledgeItemValues(values)
}
