export type BotFormValues = {
  botId?: string | null
  name?: string | null
  avatarUrl?: string | null
  personality?: string | null
  welcomeMessage?: string | null
}

export type BotFormFieldName =
  | "name"
  | "avatarUrl"
  | "personality"
  | "welcomeMessage"

export type BotFormFieldErrors = Partial<Record<BotFormFieldName, string[]>>

export type BotFormState = {
  formError?: string
  fieldErrors?: BotFormFieldErrors
  values?: BotFormValues
}

export const initialBotFormState: BotFormState = {
  formError: undefined,
  fieldErrors: {},
  values: {},
}

export function readBotFormValues(formData: FormData): BotFormValues {
  return {
    botId: String(formData.get("botId") ?? "").trim() || null,
    name: String(formData.get("name") ?? "").trim() || null,
    avatarUrl: String(formData.get("avatarUrl") ?? "").trim() || null,
    personality: String(formData.get("personality") ?? "").trim() || null,
    welcomeMessage: String(formData.get("welcomeMessage") ?? "").trim() || null,
  }
}

export function validateBotFormValues(values: BotFormValues): BotFormState {
  const fieldErrors: BotFormFieldErrors = {}

  if (!values.name?.trim()) {
    fieldErrors.name = ["Bot name is required."]
  }

  if (values.avatarUrl) {
    try {
      // eslint-disable-next-line no-new
      new URL(values.avatarUrl)
    } catch {
      fieldErrors.avatarUrl = ["Enter a valid avatar URL."]
    }
  }

  const hasErrors = Object.keys(fieldErrors).length > 0

  return {
    formError: hasErrors ? "Please fix the highlighted fields." : undefined,
    fieldErrors,
    values,
  }
}
