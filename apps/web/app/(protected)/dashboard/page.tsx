import { redirect } from "next/navigation"

import { AnswerQueue } from "@/components/dashboard/answer-queue"
import { DashboardCommandCenter } from "@/components/dashboard/dashboard-command-center"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { LaunchChecklist } from "@/components/dashboard/launch-checklist"
import { getCurrentSession } from "@/lib/api/auth.server"
import { getDashboardPageData } from "@/lib/api/dashboard.server"

export default async function Page() {
  const session = await getCurrentSession()

  if (!session?.user.id) {
    redirect("/login")
  }

  const data = await getDashboardPageData()

  return (
    <>
      <DashboardCommandCenter data={data} />

      <DashboardStats data={data} />

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <AnswerQueue data={data} />
        <LaunchChecklist data={data} />
      </section>
    </>
  )
}
