"use client"

import Link from "next/link"
import { type MouseEventHandler, type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { BotIcon, SparklesIcon, type LucideIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@kibo/ui/components/empty"
import { cn } from "@kibo/ui/lib/utils"
import { Button } from "@kibo/ui/components/button"

type Action = {
  label: string
  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
}
type EmptyStateIconName = "bot" | "sparkles"

type EmptyStateProps = {
  title: string
  description: ReactNode
  iconName?: EmptyStateIconName
  primaryAction?: Action
  secondaryAction?: Action
  className?: string
}

const emptyStateIcons: Record<EmptyStateIconName, LucideIcon> = {
  bot: BotIcon,
  sparkles: SparklesIcon,
}

export function EmptyState({
  title,
  description,
  iconName = "bot",
  primaryAction,
  secondaryAction,
  className,
}: EmptyStateProps) {
  const Icon = emptyStateIcons[iconName]
  const reduceMotion = useReducedMotion()

  function renderAction(
    action: Action,
    variant: "default" | "outline",
    icon?: LucideIcon
  ) {
    const IconComponent = icon
    const content = (
      <>
        {IconComponent ? <IconComponent data-icon="inline-start" /> : null}
        {action.label}
      </>
    )

    if (action.href) {
      return (
        <Button variant={variant} asChild>
          <Link href={action.href} onClick={action.onClick}>
            {content}
          </Link>
        </Button>
      )
    }

    return (
      <Button variant={variant} onClick={action.onClick}>
        {content}
      </Button>
    )
  }

  return (
    <Empty className={cn("border-none bg-transparent p-0", className)}>
      <div className="flex w-full max-w-sm flex-col items-center gap-3 py-8">
        <EmptyHeader>
          <EmptyMedia className="text-muted-foreground">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 4 }}
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{
                duration: 0.18,
                ease: [0.23, 1, 0.32, 1],
                delay: 0.04,
              }}
            >
              <Icon />
            </motion.div>
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-sm">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {primaryAction ? renderAction(primaryAction, "default") : null}
            {secondaryAction
              ? renderAction(secondaryAction, "outline", SparklesIcon)
              : null}
          </div>
        </EmptyContent>
      </div>
    </Empty>
  )
}
