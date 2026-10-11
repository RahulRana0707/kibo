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
 * switcher, grouped navigation and plan usage. Below that it lives in the
 * phone menu.
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
    <aside className="sticky top-0 flex h-svh w-62 shrink-0 flex-col gap-5 overflow-y-auto overscroll-contain border-e border-separator bg-surface px-3 py-4 max-lg:hidden">
      <div className="px-1">
        <BrandLogo href="/dashboard" />
      </div>
      <WorkspaceSwitcher current={workspace} workspaces={workspaces} />
      <AppNav />
      <div className="mt-auto">
        <PlanUsageCard usage={usage} />
      </div>
    </aside>
  )
}
