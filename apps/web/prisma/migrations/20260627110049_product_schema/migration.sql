/*
  Warnings:

  - A unique constraint covering the columns `[activeBotId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "BotStatus" AS ENUM ('DRAFT', 'READY', 'ACTIVE', 'PAUSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "KnowledgeItemType" AS ENUM ('FAQ', 'LINK', 'RULE', 'NOTE');

-- CreateEnum
CREATE TYPE "IntegrationProvider" AS ENUM ('YOUTUBE', 'TWITCH', 'DISCORD');

-- CreateEnum
CREATE TYPE "IntegrationStatus" AS ENUM ('PENDING', 'CONNECTED', 'DISCONNECTED', 'ERROR');

-- CreateEnum
CREATE TYPE "ConversationStatus" AS ENUM ('OPEN', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ConversationChannelType" AS ENUM ('YOUTUBE_LIVE', 'TWITCH_CHAT', 'DISCORD_CHANNEL');

-- CreateEnum
CREATE TYPE "MessageSenderType" AS ENUM ('VIEWER', 'BOT', 'CREATOR', 'MODERATOR', 'SYSTEM');

-- CreateEnum
CREATE TYPE "EventSeverity" AS ENUM ('INFO', 'WARN', 'ERROR', 'CRITICAL');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('CONVERSATION_STARTED', 'CONVERSATION_ENDED', 'KNOWLEDGE_LOOKUP', 'ANSWER_GENERATED', 'REPLY_SENT', 'MODERATION_FLAGGED', 'MODERATION_ACTION', 'INTEGRATION_CONNECTED', 'INTEGRATION_DISCONNECTED', 'ONBOARDING_BLOCKED', 'ERROR', 'SYSTEM');

-- CreateEnum
CREATE TYPE "PricingPlanCode" AS ENUM ('STARTER', 'CREATOR', 'STUDIO');

-- CreateEnum
CREATE TYPE "PricingInterval" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED', 'INCOMPLETE', 'MANUAL');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "activeBotId" TEXT;

-- CreateTable
CREATE TABLE "bot" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "personality" TEXT,
    "welcomeMessage" TEXT,
    "avatarUrl" TEXT,
    "status" "BotStatus" NOT NULL DEFAULT 'DRAFT',
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_item" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "botId" TEXT NOT NULL,
    "type" "KnowledgeItemType" NOT NULL,
    "title" TEXT,
    "question" TEXT,
    "answer" TEXT,
    "content" TEXT,
    "sourceUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "knowledge_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "botId" TEXT NOT NULL,
    "provider" "IntegrationProvider" NOT NULL,
    "status" "IntegrationStatus" NOT NULL DEFAULT 'PENDING',
    "externalAccountId" TEXT,
    "externalChannelId" TEXT,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "tokenExpiresAt" TIMESTAMP(3),
    "config" JSONB,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "botId" TEXT NOT NULL,
    "integrationId" TEXT NOT NULL,
    "externalConversationId" TEXT,
    "channelType" "ConversationChannelType" NOT NULL,
    "status" "ConversationStatus" NOT NULL DEFAULT 'OPEN',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "botId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "externalMessageId" TEXT,
    "senderType" "MessageSenderType" NOT NULL,
    "senderName" TEXT,
    "content" TEXT NOT NULL,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "botId" TEXT NOT NULL,
    "conversationId" TEXT,
    "messageId" TEXT,
    "type" "EventType" NOT NULL,
    "severity" "EventSeverity" NOT NULL DEFAULT 'INFO',
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_plan" (
    "id" TEXT NOT NULL,
    "code" "PricingPlanCode" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priceCents" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "interval" "PricingInterval" NOT NULL DEFAULT 'MONTHLY',
    "botLimit" INTEGER,
    "integrationLimit" INTEGER,
    "knowledgeItemLimit" INTEGER,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_plan_feature" (
    "id" TEXT NOT NULL,
    "pricingPlanId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isIncluded" BOOLEAN NOT NULL DEFAULT true,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_plan_feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pricingPlanId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'MANUAL',
    "billingProvider" TEXT,
    "externalCustomerId" TEXT,
    "externalSubscriptionId" TEXT,
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bot_userId_idx" ON "bot"("userId");

-- CreateIndex
CREATE INDEX "bot_userId_status_idx" ON "bot"("userId", "status");

-- CreateIndex
CREATE INDEX "knowledge_item_userId_idx" ON "knowledge_item"("userId");

-- CreateIndex
CREATE INDEX "knowledge_item_botId_type_idx" ON "knowledge_item"("botId", "type");

-- CreateIndex
CREATE INDEX "knowledge_item_botId_isActive_idx" ON "knowledge_item"("botId", "isActive");

-- CreateIndex
CREATE INDEX "integration_userId_idx" ON "integration"("userId");

-- CreateIndex
CREATE INDEX "integration_externalAccountId_idx" ON "integration"("externalAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "integration_botId_provider_key" ON "integration"("botId", "provider");

-- CreateIndex
CREATE INDEX "conversation_userId_idx" ON "conversation"("userId");

-- CreateIndex
CREATE INDEX "conversation_botId_startedAt_idx" ON "conversation"("botId", "startedAt");

-- CreateIndex
CREATE INDEX "conversation_integrationId_startedAt_idx" ON "conversation"("integrationId", "startedAt");

-- CreateIndex
CREATE UNIQUE INDEX "conversation_botId_externalConversationId_key" ON "conversation"("botId", "externalConversationId");

-- CreateIndex
CREATE INDEX "message_userId_idx" ON "message"("userId");

-- CreateIndex
CREATE INDEX "message_botId_createdAt_idx" ON "message"("botId", "createdAt");

-- CreateIndex
CREATE INDEX "message_conversationId_createdAt_idx" ON "message"("conversationId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "message_conversationId_externalMessageId_key" ON "message"("conversationId", "externalMessageId");

-- CreateIndex
CREATE INDEX "event_userId_createdAt_idx" ON "event"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "event_botId_createdAt_idx" ON "event"("botId", "createdAt");

-- CreateIndex
CREATE INDEX "event_conversationId_createdAt_idx" ON "event"("conversationId", "createdAt");

-- CreateIndex
CREATE INDEX "event_messageId_idx" ON "event"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "pricing_plan_code_key" ON "pricing_plan"("code");

-- CreateIndex
CREATE INDEX "pricing_plan_feature_pricingPlanId_sortOrder_idx" ON "pricing_plan_feature"("pricingPlanId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "user_subscription_userId_key" ON "user_subscription"("userId");

-- CreateIndex
CREATE INDEX "user_subscription_pricingPlanId_status_idx" ON "user_subscription"("pricingPlanId", "status");

-- CreateIndex
CREATE INDEX "user_subscription_billingProvider_externalCustomerId_idx" ON "user_subscription"("billingProvider", "externalCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "user_activeBotId_key" ON "user"("activeBotId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_activeBotId_fkey" FOREIGN KEY ("activeBotId") REFERENCES "bot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "bot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_item" ADD CONSTRAINT "knowledge_item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_item" ADD CONSTRAINT "knowledge_item_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integration" ADD CONSTRAINT "integration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integration" ADD CONSTRAINT "integration_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "integration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_plan_feature" ADD CONSTRAINT "pricing_plan_feature_pricingPlanId_fkey" FOREIGN KEY ("pricingPlanId") REFERENCES "pricing_plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscription" ADD CONSTRAINT "user_subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscription" ADD CONSTRAINT "user_subscription_pricingPlanId_fkey" FOREIGN KEY ("pricingPlanId") REFERENCES "pricing_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
