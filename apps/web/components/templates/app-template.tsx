import type { AccountUser } from "@/components/organisms/app-shell/account-menu"
import { AppSidebar } from "@/components/organisms/app-shell/app-sidebar"
import { AppTopbar } from "@/components/organisms/app-shell/app-topbar"
import type { BotSummary } from "@/components/organisms/app-shell/bot-switcher"
import type { PlanUsage } from "@/components/organisms/app-shell/plan-usage-card"
import type { Workspace } from "@/components/organisms/app-shell/workspace-switcher"

/**
 * Every signed-in page: sidebar, top bar, an optional system banner under
 * it, and the page. Below 1024 the sidebar moves into the phone menu.
 * Landmarks: skip link, nav, header, main.
 */
export function AppTemplate({
  user,
  workspace,
  bot,
  usage,
  banner,
  children,
}: {
  user: AccountUser
  workspace: Workspace
  bot?: BotSummary
  usage?: PlanUsage
  /** One SystemBanner at a time; the highest priority wins. */
  banner?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh bg-background">
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-raised px-3 py-2 shadow-raised focus:not-sr-only focus:fixed focus:start-3 focus:top-3"
      >
        Skip to content
      </a>
      <AppSidebar workspace={workspace} usage={usage} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar user={user} workspace={workspace} bot={bot} />
        {banner}
        <main
          id="main"
          className="flex w-full max-w-[1240px] flex-1 flex-col gap-6 p-6 max-sm:p-4"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
