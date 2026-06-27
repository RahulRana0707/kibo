"use client"

import Link from "next/link"
import { useActionState } from "react"

import { Button } from "@kibo/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@kibo/ui/components/field"
import { Input } from "@kibo/ui/components/input"
import { Textarea } from "@kibo/ui/components/textarea"

import {
  initialBotFormState,
  type BotFormState,
  type BotFormValues,
} from "@/components/bots/bot-form-state"

type BotFormProps = {
  action: (
    prevState: BotFormState,
    formData: FormData
  ) => Promise<BotFormState>
  submitLabel: string
  cancelHref?: string
  values?: BotFormValues
}

function errorMessages(errors?: string[]) {
  return errors?.map((message) => ({ message }))
}

export function BotForm({
  action,
  submitLabel,
  cancelHref = "/bots",
  values,
}: BotFormProps) {
  const [state, formAction, pending] = useActionState(
    action,
    initialBotFormState
  )

  const formValues = {
    ...values,
    ...state.values,
  }

  return (
    <form action={formAction} className="space-y-8">
      {formValues.botId ? <input type="hidden" name="botId" value={formValues.botId} /> : null}

      {state.formError ? (
        <p className="text-sm text-destructive" aria-live="polite">
          {state.formError}
        </p>
      ) : null}

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
              defaultValue={formValues.name ?? ""}
              maxLength={64}
              required
              aria-invalid={!!state.fieldErrors?.name?.length}
            />
            <FieldError errors={errorMessages(state.fieldErrors?.name)} />
          </Field>
          <Field>
            <FieldLabel htmlFor="avatarUrl">Avatar URL</FieldLabel>
            <Input
              id="avatarUrl"
              name="avatarUrl"
              type="url"
              placeholder="https://..."
              defaultValue={formValues.avatarUrl ?? ""}
              aria-invalid={!!state.fieldErrors?.avatarUrl?.length}
            />
            <FieldError errors={errorMessages(state.fieldErrors?.avatarUrl)} />
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
              defaultValue={formValues.personality ?? ""}
              maxLength={120}
              aria-invalid={!!state.fieldErrors?.personality?.length}
            />
            <FieldError
              errors={errorMessages(state.fieldErrors?.personality)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="welcomeMessage">Welcome message</FieldLabel>
            <Textarea
              id="welcomeMessage"
              name="welcomeMessage"
              rows={4}
              maxLength={280}
              defaultValue={formValues.welcomeMessage ?? ""}
              aria-invalid={!!state.fieldErrors?.welcomeMessage?.length}
            />
            <FieldError
              errors={errorMessages(state.fieldErrors?.welcomeMessage)}
            />
          </Field>
        </FieldGroup>
      </FieldSet>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button variant="outline" asChild>
          <Link href={cancelHref}>Cancel</Link>
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  )
}
