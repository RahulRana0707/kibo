export type KnowledgeBaseItem = {
  id: string
  type: string
  title: string | null
  question: string | null
  answer: string | null
  content: string | null
  sourceUrl: string | null
  isActive: boolean
  createdAtLabel: string
}

export type KnowledgeBaseBot = {
  id: string
  name: string
}

export type KnowledgeBaseBotOption = KnowledgeBaseBot & {
  isActive: boolean
  knowledgeCount: number
}
