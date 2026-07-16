export type BotStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "ARCHIVED"

export type IntegrationProvider = "YOUTUBE" | "TWITCH"

export type IntegrationStatus =
  | "PENDING"
  | "CONNECTED"
  | "DISCONNECTED"
  | "ERROR"

export type IntegrationSummary = {
  id: string
  provider: IntegrationProvider
  status: IntegrationStatus
  externalChannelId: string | null
  updatedAt: string
}

export type IntegrationsPageData = {
  selectedBot: {
    id: string
    name: string
    avatarUrl: string | null
    status: BotStatus
    integrations: IntegrationSummary[]
  } | null
  bots: Array<{
    id: string
    name: string
    avatarUrl: string | null
    status: BotStatus
    isActive: boolean
    isSelected: boolean
    knowledgeCount: number
    integrationCount: number
  }>
  integrations: IntegrationSummary[]
}

export type StartIntegrationInput = {
  botId: string
  provider: IntegrationProvider
}

export type StartIntegrationResponse = {
  provider: IntegrationProvider
  status: "PENDING" | "CONNECTED" | "ERROR"
  authorizationUrl?: string
}

export type BotSummary = {
  id: string
  name: string
  status: BotStatus
  avatarUrl: string | null
  createdAt: string
  knowledgeCount: number
  integrationCount: number
  isActive: boolean
}

export type BotsPageData = {
  activeBotId: string | null
  bots: BotSummary[]
}

export type BotDetail = Omit<BotSummary, "isActive"> & {
  personality: string | null
  welcomeMessage: string | null
}

export type BotInput = {
  name: string
  avatarUrl?: string | null
  personality?: string | null
  welcomeMessage?: string | null
}

export type KnowledgeType = "FAQ" | "RULE" | "NOTE" | "LINK"

export type KnowledgeBaseItem = {
  id: string
  type: KnowledgeType
  title: string | null
  question: string | null
  answer: string | null
  content: string | null
  sourceUrl: string | null
  isActive: boolean
  createdAt: string
}

export type KnowledgeBasePageData = {
  selectedBot: {
    id: string
    name: string
    knowledgeItems: KnowledgeBaseItem[]
  } | null
  bots: Array<{
    id: string
    name: string
    isActive: boolean
    knowledgeCount: number
  }>
}

export type CreateKnowledgeInput =
  | {
      botId: string
      type: "FAQ"
      question: string
      answer: string
    }
  | {
      botId: string
      type: "RULE" | "NOTE"
      title: string
      content: string
    }
  | {
      botId: string
      type: "LINK"
      title: string
      content: string
      sourceUrl?: string | null
    }

export type UpdateKnowledgeInput =
  | {
      type: "FAQ"
      question: string
      answer: string
    }
  | {
      type: "RULE" | "NOTE"
      title: string
      content: string
    }
  | {
      type: "LINK"
      title: string
      content: string
      sourceUrl?: string | null
    }

export type ImportFaqCsvInput = {
  botId: string
  rows: Array<{
    question: string
    answer: string
  }>
  filename?: string | null
}

export type ImportFaqCsvResponse = {
  importedCount: number
}

export type DashboardPageData = {
  activeBot: {
    id: string
    name: string
    avatarUrl: string | null
    welcomeMessage: string | null
    status: BotStatus
    integrations: Array<{
      id: string
      provider: IntegrationProvider
      status: IntegrationStatus
    }>
    knowledgeItems: Array<{
      id: string
      type: KnowledgeType
      title: string | null
      question: string | null
      content: string | null
      sourceUrl: string | null
    }>
    _count: {
      knowledgeItems: number
      integrations: number
      conversations: number
    }
  } | null
  activeBotKnowledgeTypes: Array<{
    type: KnowledgeType
    count: number
  }>
  botCount: number
  knowledgeCount: number
  connectedIntegrationCount: number
  integrationCount: number
  botReplyCount: number
  openConversationCount: number
  recentEvents: Array<{
    id: string
    type: string
    severity: string
    createdAt: string
  }>
}
