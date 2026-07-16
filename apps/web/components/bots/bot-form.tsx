"use client"

import Link from "next/link"
import { type FormEvent, useState } from "react"

import { useBotForm } from "@/components/bots/use-bot-form"
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
  readBotFormValues,
  validateBotFormValues,
} from "@/components/bots/bot-form-state"

type BotFormProps = {
  submitLabel: string
  cancelHref?: string
  values?: BotFormValues
}

function errorMessages(errors?: string[]) {
  return errors?.map((message) => ({ message }))
}

export function BotForm({
  submitLabel,
  cancelHref = "/bots",
  values,
}: BotFormProps) {
  const [state, setState] = useState<BotFormState>(initialBotFormState)
  const { saveBot, isSavingBot } = useBotForm(values?.botId)

  const formValues = {
    ...values,
    ...state.values,
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextValues = readBotFormValues(new FormData(event.currentTarget))
    const validation = validateBotFormValues(nextValues)

    if (validation.formError) {
      setState(validation)
      return
    }

    setState({ fieldErrors: {}, values: nextValues })

    try {
      await saveBot({
        name: nextValues.name ?? "",
        avatarUrl: nextValues.avatarUrl,
        personality: nextValues.personality,
        welcomeMessage: nextValues.welcomeMessage,
      })
    } catch {
      setState({
        formError: "We couldn't save that bot right now. Please try again.",
        fieldErrors: {},
        values: nextValues,
      })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {formValues.botId ? (
        <input type="hidden" name="botId" value={formValues.botId} />
      ) : null}

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
              disabled={isSavingBot}
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
              disabled={isSavingBot}
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
              disabled={isSavingBot}
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
              disabled={isSavingBot}
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
        <Button type="submit" disabled={isSavingBot}>
          {isSavingBot ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  )
}
