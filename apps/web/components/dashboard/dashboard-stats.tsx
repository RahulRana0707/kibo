import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@kibo/ui/components/card"

const stats = [
  {
    title: "Questions answered",
    description: "Waiting for your first connected chat.",
    value: "0",
  },
  {
    title: "Active integrations",
    description: "YouTube and Twitch are ready to connect.",
    value: "0",
  },
  {
    title: "Knowledge items",
    description: "FAQs, links, rules, and creator context.",
    value: "0",
  },
]

export function DashboardStats() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader>
            <CardTitle>{stat.title}</CardTitle>
            <CardDescription>{stat.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-heading text-3xl font-semibold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
