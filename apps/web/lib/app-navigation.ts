import type { LucideIcon } from "lucide-react"
import {
  BlocksIcon,
  BookIcon,
  BotIcon,
  CalendarIcon,
  ChartColumnIcon,
  LayersIcon,
  LayoutGridIcon,
  MessageSquareIcon,
  RadioIcon,
  SettingsIcon,
  ShieldIcon,
  TagIcon,
  UserIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react"

export type AppNavItem = {
  label: string
  href: string
  icon: LucideIcon
  /** False until the feature ships; the item shows as "Soon". */
  ready: boolean
}

export const appNavigation: { title?: string; items: AppNavItem[] }[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutGridIcon,
        ready: true,
      },
      { label: "Live console", href: "/live", icon: RadioIcon, ready: false },
    ],
  },
  {
    title: "Bot",
    items: [
      { label: "Bots", href: "/bots", icon: BotIcon, ready: false },
      { label: "Knowledge", href: "/knowledge", icon: BookIcon, ready: false },
      {
        label: "Moderation",
        href: "/moderation",
        icon: ShieldIcon,
        ready: false,
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
      { label: "Streams", href: "/streams", icon: VideoIcon, ready: false },
      {
        label: "Analytics",
        href: "/analytics",
        icon: ChartColumnIcon,
        ready: false,
      },
      { label: "Community", href: "/community", icon: UsersIcon, ready: false },
    ],
  },
  {
    title: "Grow",
    items: [
      {
        label: "Schedule",
        href: "/schedule",
        icon: CalendarIcon,
        ready: false,
      },
      { label: "Sponsors", href: "/sponsors", icon: TagIcon, ready: false },
      { label: "Overlays", href: "/overlays", icon: LayersIcon, ready: false },
      {
        label: "Integrations",
        href: "/integrations-settings",
        icon: BlocksIcon,
        ready: false,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Team", href: "/team", icon: UserIcon, ready: false },
      {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        ready: false,
      },
    ],
  },
]
