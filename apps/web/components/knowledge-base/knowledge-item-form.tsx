"use client"

import { useActionState, useEffect, useRef } from "react"
import { PlusIcon } from "lucide-react"

import { createKnowledgeItemAction } from "@/actions/knowledge-base/create-knowledge-item"
import {
  initialKnowledgeFormState,
  type KnowledgeFormState,
} from "@/components/knowledge-base/knowledge-form-state"
import { Button } from "@kibo/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@kibo/ui/components/field"
import { Input } from "@kibo/ui/components/input"
import { Textarea } from "@kibo/ui/components/textarea"

export const KNOWLEDGE_TYPES = [
  {
    value: "RULE",
    label: "Rule",
    description: "Hard guidance Kibo should follow.",
  },
  {
    value: "NOTE",
    label: "Note",
    description: "Extra context, policy, or product detail.",
  },
  {
    value: "LINK",
    label: "Link",
    description: "A source URL Kibo can reference.",
  },
] as const

export type KnowledgeType = (typeof KNOWLEDGE_TYPES)[number]["value"]

function errorMessages(errors?: string[]) {
  return errors?.map((message) => ({ message }))
}

export function KnowledgeItemForm({
  botId,
  type,
}: {
  botId: string
  type: KnowledgeType
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, pending] = useActionState<KnowledgeFormState, FormData>(
    createKnowledgeItemAction,
    initialKnowledgeFormState
  )

  useEffect(() => {
    if (state.formSuccess) {
      formRef.current?.reset()
    }
  }, [state.formSuccess])

  const selectedType = KNOWLEDGE_TYPES.find((item) => item.value === type)

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="botId" value={botId} />
      <input type="hidden" name="type" value={type} />

      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          Add {selectedType?.label.toLowerCase() ?? "knowledge"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {selectedType?.description ?? "Store approved knowledge for this bot."}
        </p>
      </div>

      {state.formError ? (
        <p className="text-sm text-destructive" aria-live="polite">
          {state.formError}
        </p>
      ) : null}

      {state.formSuccess ? (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {state.formSuccess}
        </p>
      ) : null}

      <FieldGroup>
        <Field data-invalid={!!state.fieldErrors?.title?.length}>
          <FieldLabel htmlFor="knowledge-title">Title</FieldLabel>
          <Input
            id="knowledge-title"
            name="title"
            placeholder="Refund policy"
            disabled={pending}
            aria-invalid={!!state.fieldErrors?.title?.length}
            defaultValue={state.values?.title ?? ""}
          />
          <FieldError errors={errorMessages(state.fieldErrors?.title)} />
        </Field>

        {type === "LINK" ? (
          <Field data-invalid={!!state.fieldErrors?.sourceUrl?.length}>
            <FieldLabel htmlFor="knowledge-source-url">URL</FieldLabel>
            <Input
              id="knowledge-source-url"
              name="sourceUrl"
              type="url"
              placeholder="https://example.com/help/refunds"
              disabled={pending}
              aria-invalid={!!state.fieldErrors?.sourceUrl?.length}
              defaultValue={state.values?.sourceUrl ?? ""}
            />
            <FieldDescription>
              Add the public page Kibo should treat as a trusted source.
            </FieldDescription>
            <FieldError errors={errorMessages(state.fieldErrors?.sourceUrl)} />
          </Field>
        ) : (
          <Field data-invalid={!!state.fieldErrors?.content?.length}>
            <FieldLabel htmlFor="knowledge-content">
              {type === "RULE" ? "Rule" : "Note"}
            </FieldLabel>
            <Textarea
              id="knowledge-content"
              name="content"
              placeholder={
                type === "RULE"
                  ? "Always ask for the order email before discussing refunds."
                  : "Our pro plan includes priority onboarding for teams."
              }
              rows={4}
              disabled={pending}
              aria-invalid={!!state.fieldErrors?.content?.length}
              defaultValue={state.values?.content ?? ""}
            />
            <FieldError errors={errorMessages(state.fieldErrors?.content)} />
          </Field>
        )}
      </FieldGroup>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          <PlusIcon data-icon="inline-start" />
          {pending ? "Adding..." : "Add knowledge"}
        </Button>
      </div>
    </form>
  )
}
