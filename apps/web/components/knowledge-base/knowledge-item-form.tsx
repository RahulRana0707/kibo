"use client"

import { type FormEvent, useRef, useState } from "react"
import { PlusIcon } from "lucide-react"

import {
  initialKnowledgeFormState,
  type KnowledgeFormState,
  readKnowledgeItemFormValues,
  validateKnowledgeItemValues,
} from "@/components/knowledge-base/knowledge-form-state"
import { useKnowledgeBasePage } from "@/components/knowledge-base/use-knowledge-base-page"
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
  const [state, setState] = useState<KnowledgeFormState>(
    initialKnowledgeFormState
  )
  const { createKnowledge, isCreatingKnowledge } = useKnowledgeBasePage()

  const selectedType = KNOWLEDGE_TYPES.find((item) => item.value === type)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const values = readKnowledgeItemFormValues(new FormData(event.currentTarget))
    const validation = validateKnowledgeItemValues(values)

    if (validation.formError) {
      setState(validation)
      return
    }

    try {
      if (type === "LINK") {
        await createKnowledge({
          botId,
          type,
          title: values.title ?? "",
          content: values.sourceUrl ?? "",
          sourceUrl: values.sourceUrl,
        })
      } else {
        await createKnowledge({
          botId,
          type,
          title: values.title ?? "",
          content: values.content ?? "",
        })
      }

      formRef.current?.reset()
      setState({
        formSuccess: `${type.toLowerCase()} added.`,
        fieldErrors: {},
        values: { botId, type },
      })
    } catch {
      setState({
        formError: "We couldn't add that knowledge right now. Please try again.",
        fieldErrors: {},
        values,
      })
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
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
            disabled={isCreatingKnowledge}
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
              disabled={isCreatingKnowledge}
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
              disabled={isCreatingKnowledge}
              aria-invalid={!!state.fieldErrors?.content?.length}
              defaultValue={state.values?.content ?? ""}
            />
            <FieldError errors={errorMessages(state.fieldErrors?.content)} />
          </Field>
        )}
      </FieldGroup>

      <div className="flex justify-end">
        <Button type="submit" disabled={isCreatingKnowledge}>
          <PlusIcon data-icon="inline-start" />
          {isCreatingKnowledge ? "Adding..." : "Add knowledge"}
        </Button>
      </div>
    </form>
  )
}
