import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { getDashboardPageData } from "@/actions/dashboard/get-dashboard-page-data"
import { AnswerQueue } from "@/components/dashboard/answer-queue"
import { DashboardCommandCenter } from "@/components/dashboard/dashboard-command-center"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { LaunchChecklist } from "@/components/dashboard/launch-checklist"
import { auth } from "@/lib/auth"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.id) {
    redirect("/login")
  }

  const data = await getDashboardPageData(session.user.id)

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
