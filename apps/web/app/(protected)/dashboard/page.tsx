import { AnswerQueue } from "@/components/dashboard/answer-queue"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { LaunchChecklist } from "@/components/dashboard/launch-checklist"

export default function Page() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Set up Kibo once, then let it answer repeat questions and keep live
          chat moving while you focus on the stream.
        </p>
      </section>

      <DashboardStats />

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <LaunchChecklist />
        <AnswerQueue />
      </section>
    </>
  )
}
