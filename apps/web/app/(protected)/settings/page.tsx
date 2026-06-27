import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@kibo/ui/components/card"
import { CreditCardIcon, Settings2Icon, UsersIcon } from "lucide-react"

export default function SettingsPage() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Settings
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Manage your account, team, billing, and the defaults Kibo should use
          across every community surface.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Settings2Icon className="text-primary" />
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Creator identity and account details.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Profile editing will land after the core shell is stable.
          </CardContent>
        </Card>
        <Card id="team">
          <CardHeader>
            <UsersIcon className="text-primary" />
            <CardTitle>Team</CardTitle>
            <CardDescription>
              Invite moderators and collaborators.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Team workspaces are planned after creators validate the solo flow.
          </CardContent>
        </Card>
        <Card id="billing">
          <CardHeader>
            <CreditCardIcon className="text-primary" />
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Plans, invoices, and payment methods.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Billing starts when the first useful integration is live.
          </CardContent>
        </Card>
      </section>
    </>
  )
}
