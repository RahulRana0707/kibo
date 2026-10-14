/**
 * Languages a bot can reply in. Hinglish is Hindi written in Latin script
 * and mixed with English, the way most Indian chats talk; `hi-Latn` is its
 * standard language tag. Add a language here and every form offers it.
 */
export const replyLanguages = [
  { code: "en", name: "English", hint: null },
  { code: "hi-Latn", name: "Hinglish", hint: "Hindi and English, in Latin script" },
] as const

export type ReplyLanguage = (typeof replyLanguages)[number]["code"]

export const replyLanguageCodes = replyLanguages.map((item) => item.code) as [
  ReplyLanguage,
  ...ReplyLanguage[],
]

export function languageName(code: ReplyLanguage) {
  return replyLanguages.find((item) => item.code === code)?.name ?? code
}
