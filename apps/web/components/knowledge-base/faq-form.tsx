"use client"

import { useActionState } from "react"
import { PlusIcon } from "lucide-react"

import { createFaqAction } from "@/actions/knowledge-base/create-faq"
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

function errorMessages(errors?: string[]) {
  return errors?.map((message) => ({ message }))
}

export function FaqForm({ botId }: { botId: string }) {
  const [state, formAction, pending] = useActionState<KnowledgeFormState, FormData>(
    createFaqAction,
    initialKnowledgeFormState
  )

  return (
    <form action={formAction} className="flex flex-col gap-4" id="faqs">
      <input type="hidden" name="botId" value={botId} />

      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          Add an FAQ
        </h2>
        <p className="text-sm text-muted-foreground">
          Add the repeat questions Kibo should answer without guessing.
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
        <Field data-invalid={!!state.fieldErrors?.question?.length}>
          <FieldLabel htmlFor="question">Question</FieldLabel>
          <Input
            id="question"
            name="question"
            defaultValue={state.values?.question ?? ""}
            placeholder="What microphone do you use?"
            aria-invalid={!!state.fieldErrors?.question?.length}
          />
          <FieldError errors={errorMessages(state.fieldErrors?.question)} />
        </Field>

        <Field data-invalid={!!state.fieldErrors?.answer?.length}>
          <FieldLabel htmlFor="answer">Approved answer</FieldLabel>
          <Textarea
            id="answer"
            name="answer"
            rows={4}
            defaultValue={state.values?.answer ?? ""}
            placeholder="I use a Shure SM7B with a clean gain setup."
            aria-invalid={!!state.fieldErrors?.answer?.length}
          />
          <FieldDescription>
            Write it the way you would want the bot to say it in chat.
          </FieldDescription>
          <FieldError errors={errorMessages(state.fieldErrors?.answer)} />
        </Field>
      </FieldGroup>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          <PlusIcon data-icon="inline-start" />
          {pending ? "Adding..." : "Add FAQ"}
        </Button>
      </div>
    </form>
  )
}
