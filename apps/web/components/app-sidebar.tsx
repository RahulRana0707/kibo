"use client"

import * as React from "react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { Icons } from "@/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@kibo/ui/components/sidebar"
import {
  BarChart3Icon,
  BookOpenIcon,
  BotIcon,
  CableIcon,
  CircleHelpIcon,
  GaugeIcon,
  MessageSquareTextIcon,
  Settings2Icon,
  SparklesIcon,
} from "lucide-react"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: GaugeIcon,
      isActive: true,
    },
    {
      title: "Bots",
      url: "/bots",
      icon: BotIcon,
    },
    {
      title: "Knowledge Base",
      url: "/knowledge-base",
      icon: BookOpenIcon,
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: CableIcon,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3Icon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2Icon,
    },
  ],
  projects: [
    {
      name: "Connect YouTube",
      url: "/integrations#youtube",
      icon: MessageSquareTextIcon,
    },
    {
      name: "Add FAQs",
      url: "/knowledge-base#faqs",
      icon: CircleHelpIcon,
    },
    {
      name: "Tune Kibo",
      url: "/bots#personality",
      icon: SparklesIcon,
    },
  ],
}

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string
    email: string
    avatar?: string | null
  }
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/dashboard">
                  <Icons.logo />
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-medium">Kibo</span>
                    <span className="truncate text-xs">Community manager</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
