import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeaderActions } from "@/components/dashboard-header-actions"
import { RouteBreadcrumbs } from "@/components/route-breadcrumbs"
import { getCurrentSession } from "@/lib/api/auth.server"
import { Separator } from "@kibo/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@kibo/ui/components/sidebar"

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getCurrentSession()

  const user = {
    name: session?.user.name ?? "Creator",
    email: session?.user.email ?? "creator@getkibo.com",
    avatar: session?.user.image,
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="h-svh min-w-0 overflow-hidden">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <RouteBreadcrumbs />
          <DashboardHeaderActions />
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
