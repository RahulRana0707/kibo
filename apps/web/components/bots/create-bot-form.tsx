import { createBotAction } from "@/actions/bots/create-bot"

import { BotForm } from "@/components/bots/bot-form"

export function CreateBotForm() {
  return <BotForm action={createBotAction} submitLabel="Create bot" />
}
