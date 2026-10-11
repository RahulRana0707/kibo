import { BrandLogo } from "@/components/atoms/brand-logo"
import { AppNav } from "@/components/organisms/app-shell/app-nav"
import {
  PlanUsageCard,
  type PlanUsage,
} from "@/components/organisms/app-shell/plan-usage-card"
import {
  WorkspaceSwitcher,
  type Workspace,
} from "@/components/organisms/app-shell/workspace-switcher"

/**
 * The left column on every app page from 1024 up: brand, workspace
 * switcher, grouped navigation and plan usage. The brand, switcher and plan
 * card stay put; only the navigation scrolls when it's taller than the
 * window. Below 1024 it lives in the phone menu.
 */
export function AppSidebar({
  workspace,
  workspaces,
  usage,
}: {
  workspace: Workspace
  workspaces?: Workspace[]
  usage?: PlanUsage
}) {
  return (
    <aside className="sticky top-0 flex h-svh w-62 shrink-0 flex-col gap-5 border-e border-separator bg-surface px-3 py-4 max-lg:hidden">
      <div className="shrink-0 px-1">
        <BrandLogo href="/dashboard" />
      </div>
      <div className="shrink-0">
        <WorkspaceSwitcher current={workspace} workspaces={workspaces} />
      </div>
      {/* Padding inside the scroller keeps focus rings from being clipped */}
      <div className="-mx-1 min-h-0 flex-1 overflow-y-auto overscroll-contain px-1">
        <AppNav />
      </div>
      <div className="shrink-0">
        <PlanUsageCard usage={usage} />
      </div>
    </aside>
  )
}
