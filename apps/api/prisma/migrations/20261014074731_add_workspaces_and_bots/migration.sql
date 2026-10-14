-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('OWNER');

-- CreateEnum
CREATE TYPE "BotStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED');

-- CreateEnum
CREATE TYPE "Personality" AS ENUM ('FRIENDLY', 'HYPE', 'CHILL', 'SARCASTIC', 'PROFESSIONAL');

-- CreateEnum
CREATE TYPE "ReplyMode" AS ENUM ('AUTO', 'APPROVAL', 'SILENT');

-- CreateEnum
CREATE TYPE "UnsureAction" AS ENUM ('DRAFT_FOR_APPROVAL', 'SEND_TO_INBOX', 'REPLY_NOT_SURE');

-- CreateEnum
CREATE TYPE "Approvers" AS ENUM ('OWNER', 'MODERATORS');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('HIGHEST', 'HIGH', 'NORMAL');

-- CreateEnum
CREATE TYPE "EscalationAction" AS ENUM ('ALERT_MODS', 'HIDE_AND_REVIEW', 'DRAFT_FOR_APPROVAL');

-- CreateTable
CREATE TABLE "workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "personal" BOOLEAN NOT NULL DEFAULT true,
    "botLimit" INTEGER NOT NULL DEFAULT 1,
    "defaultBotId" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "MemberRole" NOT NULL DEFAULT 'OWNER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bot" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameKey" TEXT NOT NULL,
    "purpose" TEXT,
    "status" "BotStatus" NOT NULL DEFAULT 'DRAFT',
    "archivedAt" TIMESTAMP(3),
    "pausedAt" TIMESTAMP(3),
    "pausedById" TEXT,
    "templateKey" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "personality" "Personality" NOT NULL DEFAULT 'FRIENDLY',
    "voiceNotes" TEXT,
    "languages" TEXT[] DEFAULT ARRAY['en']::TEXT[],
    "replyInViewerLanguage" BOOLEAN NOT NULL DEFAULT true,
    "welcomeEnabled" BOOLEAN NOT NULL DEFAULT true,
    "welcomeMessage" TEXT,
    "replyMode" "ReplyMode" NOT NULL DEFAULT 'SILENT',
    "confidenceThreshold" INTEGER NOT NULL DEFAULT 85,
    "unsureAction" "UnsureAction" NOT NULL DEFAULT 'SEND_TO_INBOX',
    "approvers" "Approvers" NOT NULL DEFAULT 'OWNER',
    "maxRepliesPerMinute" INTEGER NOT NULL DEFAULT 8,
    "viewerCooldownSeconds" INTEGER NOT NULL DEFAULT 30,
    "answerRepeatedOnce" BOOLEAN NOT NULL DEFAULT true,
    "quietMode" BOOLEAN NOT NULL DEFAULT false,
    "blockedTopics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "blockedTopicReply" TEXT NOT NULL,
    "ignoreChatInstructions" BOOLEAN NOT NULL DEFAULT true,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escalation_rule" (
    "id" TEXT NOT NULL,
    "botId" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "severity" "Severity" NOT NULL,
    "action" "EscalationAction" NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "escalation_rule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workspace_defaultBotId_key" ON "workspace"("defaultBotId");

-- CreateIndex
CREATE INDEX "member_userId_idx" ON "member"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "member_workspaceId_userId_key" ON "member"("workspaceId", "userId");

-- CreateIndex
CREATE INDEX "bot_workspaceId_archivedAt_idx" ON "bot"("workspaceId", "archivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "bot_workspaceId_nameKey_key" ON "bot"("workspaceId", "nameKey");

-- CreateIndex
CREATE INDEX "escalation_rule_botId_position_idx" ON "escalation_rule"("botId", "position");

-- AddForeignKey
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_defaultBotId_fkey" FOREIGN KEY ("defaultBotId") REFERENCES "bot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bot" ADD CONSTRAINT "bot_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "escalation_rule" ADD CONSTRAINT "escalation_rule_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
