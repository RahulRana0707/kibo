import type { AccountUser } from "@/components/organisms/account-menu"
import { AppSidebar } from "@/components/organisms/app-sidebar"
import { AppTopbar } from "@/components/organisms/app-topbar"

/**
 * Sidebar, optional system banner, top bar and page body for every
 * signed-in screen.
 */
export function AppTemplate({
  user,
  banner,
  children,
}: {
  user: AccountUser
  banner?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh bg-background">
      <AppSidebar workspace={user.name} />
      <div className="flex min-w-0 flex-1 flex-col">
        {banner}
        <AppTopbar user={user} />
        <main
          id="main"
          className="flex w-full max-w-[1240px] flex-1 flex-col gap-8 p-8 max-sm:gap-6 max-sm:p-4"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
