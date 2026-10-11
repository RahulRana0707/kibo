import type { LucideIcon } from "lucide-react"
import {
  BookOpenIcon,
  BotIcon,
  CalendarIcon,
  ChartColumnIcon,
  GiftIcon,
  LayersIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  MonitorPlayIcon,
  PlugIcon,
  RadioIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"

export type AppNavItem = {
  label: string
  href: string
  icon: LucideIcon
  /** False until the feature ships; the item shows Soon. */
  ready: boolean
  count?: number
  /** Warning only for queues that need action. */
  countTone?: "default" | "warning"
  /** Exists on a higher plan: a lock opens the upgrade. */
  lockedPlan?: string
  /** Shown first in the phone menu: live work. */
  live?: boolean
}

export const appNavigation: { title?: string; items: AppNavItem[] }[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboardIcon,
        ready: true,
        live: true,
      },
      {
        label: "Live console",
        href: "/live",
        icon: RadioIcon,
        ready: false,
        live: true,
      },
    ],
  },
  {
    title: "Bot",
    items: [
      { label: "Bots", href: "/bots", icon: BotIcon, ready: false },
      { label: "Knowledge", href: "/knowledge", icon: BookOpenIcon, ready: false },
      {
        label: "Moderation",
        href: "/moderation",
        icon: ShieldIcon,
        ready: false,
        live: true,
      },
      {
        label: "Engagement",
        href: "/engagement",
        icon: MessageSquareIcon,
        ready: false,
      },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Streams", href: "/streams", icon: MonitorPlayIcon, ready: false },
      { label: "Analytics", href: "/analytics", icon: ChartColumnIcon, ready: false },
      { label: "Community", href: "/community", icon: UsersIcon, ready: false },
    ],
  },
  {
    title: "Grow",
    items: [
      { label: "Schedule", href: "/schedule", icon: CalendarIcon, ready: false },
      { label: "Sponsors", href: "/sponsors", icon: GiftIcon, ready: false },
      { label: "Overlays", href: "/overlays", icon: LayersIcon, ready: false },
      {
        label: "Integrations",
        href: "/integrations-settings",
        icon: PlugIcon,
        ready: false,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Team", href: "/team", icon: UserIcon, ready: false },
      { label: "Settings", href: "/settings", icon: SettingsIcon, ready: false },
    ],
  },
]
