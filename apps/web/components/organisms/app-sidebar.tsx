import { BrandLogo } from "@/components/atoms/brand-logo"
import { AppNav } from "@/components/organisms/app-nav"
import { PlanUsageCard } from "@/components/organisms/plan-usage-card"
import { WorkspaceSwitcher } from "@/components/organisms/workspace-switcher"

/** The persistent left navigation on wide screens. */
export function AppSidebar({ workspace }: { workspace: string }) {
  return (
    <aside className="sticky top-0 flex h-svh w-62 shrink-0 flex-col gap-5 overflow-y-auto overscroll-contain border-e border-separator bg-surface px-3 py-4 max-lg:hidden">
      <div className="px-1">
        <BrandLogo href="/dashboard" />
      </div>
      <WorkspaceSwitcher workspace={workspace} />
      <AppNav />
      <PlanUsageCard />
    </aside>
  )
}
