import type { Personality, ReplyMode } from "./enums.js"

/**
 * Starting points for a new bot. Creating from a template applies the
 * personality, reply mode, voice, welcome and blocked topics now; the
 * starter FAQs, commands and rules are applied by the Knowledge, Engagement
 * and Moderation modules, which read `templateKey` from the bot.
 */
export type BotTemplate = {
  key: string
  title: string
  summary: string
  personality: Personality
  replyMode: ReplyMode
  voiceNotes: string
  welcomeMessage: string
  blockedTopics: string[]
  starterFaqs: string[]
  commands: string[]
  rules: string[]
  /** Integrations that fit, by integration slug. */
  integrations: string[]
}

export const botTemplates = [
  {
    key: "gaming",
    title: "Gaming",
    summary: "Settings, rank and gear questions, backseat rule, predictions.",
    personality: "hype",
    replyMode: "approval",
    voiceNotes:
      "Talk like a hyped teammate. Short replies, two sentences at most. Say “GG” and “W” naturally.",
    welcomeMessage: "Welcome in {viewer}! Grab a seat — !discord if you want to queue for customs later.",
    blockedTopics: [],
    starterFaqs: ["Sens and DPI", "Crosshair", "PC specs", "Peripherals", "Rank", "Schedule", "Discord", "Customs"],
    commands: ["!rank", "!setup", "!crosshair", "!gear", "!join", "!discord"],
    rules: ["No backseating", "No spoilers for story games", "Links only from allowed domains"],
    integrations: ["riot", "steam"],
  },
  {
    key: "irl",
    title: "IRL & Just Chatting",
    summary: "Location privacy, schedule, “where are you?” handled safely.",
    personality: "friendly",
    replyMode: "approval",
    voiceNotes: "Warm and chatty. Never share where the stream is or will be.",
    welcomeMessage: "Hey {viewer}, welcome to the stream! Pull up a chair.",
    blockedTopics: ["Exact location or address", "Travel plans before they happen"],
    starterFaqs: ["Schedule", "Camera and mic", "Socials", "How to support"],
    commands: ["!schedule", "!socials", "!gear"],
    rules: ["Never share the creator’s location", "No personal questions about family"],
    integrations: [],
  },
  {
    key: "music",
    title: "Music",
    summary: "Song requests, gear and DAW questions, no spam during sets.",
    personality: "chill",
    replyMode: "approval",
    voiceNotes: "Laid back. Keep replies short while a song is playing.",
    welcomeMessage: "Welcome in {viewer} — drop a request with !sr.",
    blockedTopics: [],
    starterFaqs: ["Gear", "DAW and plugins", "Song requests", "Where to listen"],
    commands: ["!sr", "!song", "!gear", "!spotify"],
    rules: ["One song request per viewer at a time", "No spam during sets"],
    integrations: ["spotify"],
  },
  {
    key: "education",
    title: "Education",
    summary: "Course links, Q&A mode, professional tone, strict link rules.",
    personality: "professional",
    replyMode: "approval",
    voiceNotes: "Clear and polite. Point to the course page instead of long answers.",
    welcomeMessage: "Welcome {viewer}! Questions are welcome — ask any time.",
    blockedTopics: [],
    starterFaqs: ["Course link", "Prerequisites", "Notes and slides", "Office hours"],
    commands: ["!course", "!notes", "!qa"],
    rules: ["Links only from allowed domains", "Questions queue during Q&A"],
    integrations: ["notion"],
  },
  {
    key: "coding",
    title: "Coding",
    summary: "Stack and editor setup, repo links, “what are you building?”.",
    personality: "friendly",
    replyMode: "approval",
    voiceNotes: "Friendly and precise. Use the project’s real names for tools.",
    welcomeMessage: "Welcome {viewer}! Today’s project: {title}.",
    blockedTopics: [],
    starterFaqs: ["What are you building?", "Editor and theme", "Stack", "Repo link"],
    commands: ["!project", "!repo", "!setup"],
    rules: ["No unsolicited code reviews in chat", "Links only from allowed domains"],
    integrations: [],
  },
  {
    key: "fitness",
    title: "Fitness",
    summary: "Workout plans, form disclaimers, medical-advice escalation.",
    personality: "hype",
    replyMode: "approval",
    voiceNotes: "Encouraging. Never give medical advice; suggest asking a professional.",
    welcomeMessage: "Welcome {viewer}! Hydrate and join in when you’re ready.",
    blockedTopics: ["Medical diagnosis or treatment"],
    starterFaqs: ["Today’s workout", "Plans and programs", "Equipment", "Nutrition basics"],
    commands: ["!workout", "!plan", "!gear"],
    rules: ["Medical questions go to a human", "Form disclaimer on exercise advice"],
    integrations: [],
  },
] as const satisfies readonly BotTemplate[]

export type BotTemplateKey = (typeof botTemplates)[number]["key"]

export const botTemplateKeys = botTemplates.map((item) => item.key) as [
  BotTemplateKey,
  ...BotTemplateKey[],
]

export function getBotTemplate(key: string): BotTemplate | undefined {
  return botTemplates.find((item) => item.key === key)
}
