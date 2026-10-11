"use client"

import { MailIcon } from "lucide-react"

import { Avatar } from "@kibo/ui/components/avatar"
import { Badge } from "@kibo/ui/components/badge"
import { Button } from "@kibo/ui/components/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@kibo/ui/components/select"

export const memberRoles = ["Head moderator", "Moderator", "Editor", "Manager"]

export type Member = {
  id: string
  name?: string
  email: string
  /** Also known on a platform as: “tacocat_88”. */
  handle?: string
  role: "Owner" | (typeof memberRoles)[number]
  lastActive: string
  you?: boolean
  pending?: { invited: string; expires: string }
}

/** The person cell: avatar, name and email; pending invites get a mail mark. */
export function MemberIdentity({ member }: { member: Member }) {
  return (
    <span className="flex items-center gap-3">
      {member.pending ? (
        <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full border border-dashed border-border-strong text-muted-foreground">
          <MailIcon className="size-4" />
        </span>
      ) : (
        <Avatar name={member.name ?? member.email} />
      )}
      <span className="flex min-w-0 flex-col">
        <span className="flex items-center gap-2 truncate text-body-sm font-semibold">
          {member.name ?? member.email}
          {member.you ? <Badge variant="outline">You</Badge> : null}
        </span>
        <span className="truncate text-caption text-muted-foreground">
          {member.pending
            ? `Invited ${member.pending.invited} · expires ${member.pending.expires}`
            : [member.email, member.handle].filter(Boolean).join(" · ")}
        </span>
      </span>
    </span>
  )
}

/** The role cell: a select, plain text for the owner, a badge when pending. */
export function MemberRole({
  member,
  onRoleChange,
}: {
  member: Member
  onRoleChange?: (role: string) => void
}) {
  if (member.pending) return <Badge variant="outline">Pending · {member.role}</Badge>
  if (member.role === "Owner") return <span className="text-body-sm">Owner</span>
  return (
    <Select value={member.role} onValueChange={onRoleChange}>
      <SelectTrigger aria-label={`Role for ${member.name ?? member.email}`} className="h-8 w-44 text-body-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {memberRoles.map((role) => (
          <SelectItem key={role} value={role}>
            {role}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

/** Resend and Revoke for pending invites; nothing for the owner. */
export function MemberActions({
  member,
  onResend,
  onRevoke,
}: {
  member: Member
  onResend?: () => void
  onRevoke?: () => void
}) {
  if (!member.pending) return null
  return (
    <span className="flex gap-1">
      <Button variant="ghost" size="xs" onClick={onResend}>
        Resend
      </Button>
      <Button variant="ghost" size="xs" onClick={onRevoke}>
        Revoke
      </Button>
    </span>
  )
}

/** The seat count under the members table, with Invite. */
export function SeatFooter({
  used,
  seats,
  plan,
  pending,
  action,
}: {
  used: number
  seats: number
  plan: string
  pending: number
  action: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-caption text-muted-foreground tabular">
        {used} of {seats} seats used on {plan}
        {pending ? ` · ${pending} pending invite${pending > 1 ? "s" : ""} (counts as a seat)` : ""}
      </p>
      {action}
    </div>
  )
}
