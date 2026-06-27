import Link from "next/link"

import { Button } from "@kibo/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@kibo/ui/components/field"
import { Input } from "@kibo/ui/components/input"
import { Textarea } from "@kibo/ui/components/textarea"

type BotFormValues = {
  name?: string | null
  avatarUrl?: string | null
  personality?: string | null
  welcomeMessage?: string | null
}

type BotFormProps = {
  action: (formData: FormData) => Promise<void>
  submitLabel: string
  cancelHref?: string
  values?: BotFormValues
}

export function BotForm({
  action,
  submitLabel,
  cancelHref = "/bots",
  values,
}: BotFormProps) {
  return (
    <form action={action} className="space-y-8">
      <FieldSet className="gap-6">
        <FieldLegend variant="legend">1. Identity</FieldLegend>
        <FieldDescription>
          Give the bot a clear name and optional avatar so it feels rooted in
          your workspace.
        </FieldDescription>

        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="name">Bot name</FieldLabel>
            <Input
              id="name"
              name="name"
              defaultValue={values?.name ?? ""}
              maxLength={64}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="avatarUrl">Avatar URL</FieldLabel>
            <Input
              id="avatarUrl"
              name="avatarUrl"
              type="url"
              placeholder="https://..."
              defaultValue={values?.avatarUrl ?? ""}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="h-px bg-border/60" />

      <FieldSet className="gap-6">
        <FieldLegend variant="legend">2. Voice</FieldLegend>
        <FieldDescription>
          Set the personality and first message so the bot sounds consistent
          from the first reply.
        </FieldDescription>

        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="personality">Personality</FieldLabel>
            <Input
              id="personality"
              name="personality"
              defaultValue={values?.personality ?? ""}
              maxLength={120}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="welcomeMessage">Welcome message</FieldLabel>
            <Textarea
              id="welcomeMessage"
              name="welcomeMessage"
              rows={4}
              maxLength={280}
              defaultValue={values?.welcomeMessage ?? ""}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button variant="outline" asChild>
          <Link href={cancelHref}>Cancel</Link>
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}
