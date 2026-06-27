"use client"

import { useActionState, useEffect, useState } from "react"
import { PencilIcon, SaveIcon } from "lucide-react"

import { updateKnowledgeItemAction } from "@/actions/knowledge-base/update-knowledge-item"
import {
  initialKnowledgeFormState,
  type KnowledgeFormState,
} from "@/components/knowledge-base/knowledge-form-state"
import type { KnowledgeBaseItem } from "@/components/knowledge-base/types"
import { Button } from "@kibo/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@kibo/ui/components/dialog"
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

function itemTypeLabel(type: string) {
  if (type === "FAQ") {
    return "FAQ"
  }

  return type.charAt(0) + type.slice(1).toLowerCase()
}

export function KnowledgeEditDialog({ item }: { item: KnowledgeBaseItem }) {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState<KnowledgeFormState, FormData>(
    updateKnowledgeItemAction,
    initialKnowledgeFormState
  )
  const typeLabel = itemTypeLabel(item.type)

  useEffect(() => {
    if (state.formSuccess) {
      setOpen(false)
    }
  }, [state.formSuccess])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost" size="icon">
          <PencilIcon />
          <span className="sr-only">Edit knowledge item</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit {typeLabel}</DialogTitle>
          <DialogDescription>
            Update this knowledge item. The type stays fixed so existing bot
            behavior remains predictable.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="type" value={item.type} />

          {state.formError ? (
            <p className="text-sm text-destructive" aria-live="polite">
              {state.formError}
            </p>
          ) : null}

          {item.type === "FAQ" ? (
            <FieldGroup>
              <Field data-invalid={!!state.fieldErrors?.question?.length}>
                <FieldLabel htmlFor={`question-${item.id}`}>Question</FieldLabel>
                <Input
                  id={`question-${item.id}`}
                  name="question"
                  defaultValue={state.values?.question ?? item.question ?? ""}
                  disabled={pending}
                  aria-invalid={!!state.fieldErrors?.question?.length}
                />
                <FieldError errors={errorMessages(state.fieldErrors?.question)} />
              </Field>

              <Field data-invalid={!!state.fieldErrors?.answer?.length}>
                <FieldLabel htmlFor={`answer-${item.id}`}>
                  Approved answer
                </FieldLabel>
                <Textarea
                  id={`answer-${item.id}`}
                  name="answer"
                  defaultValue={state.values?.answer ?? item.answer ?? ""}
                  rows={5}
                  disabled={pending}
                  aria-invalid={!!state.fieldErrors?.answer?.length}
                />
                <FieldDescription>
                  Keep this phrased the way Kibo should answer in chat.
                </FieldDescription>
                <FieldError errors={errorMessages(state.fieldErrors?.answer)} />
              </Field>
            </FieldGroup>
          ) : (
            <FieldGroup>
              <Field data-invalid={!!state.fieldErrors?.title?.length}>
                <FieldLabel htmlFor={`title-${item.id}`}>Title</FieldLabel>
                <Input
                  id={`title-${item.id}`}
                  name="title"
                  defaultValue={state.values?.title ?? item.title ?? ""}
                  disabled={pending}
                  aria-invalid={!!state.fieldErrors?.title?.length}
                />
                <FieldError errors={errorMessages(state.fieldErrors?.title)} />
              </Field>

              {item.type === "LINK" ? (
                <Field data-invalid={!!state.fieldErrors?.sourceUrl?.length}>
                  <FieldLabel htmlFor={`source-url-${item.id}`}>URL</FieldLabel>
                  <Input
                    id={`source-url-${item.id}`}
                    name="sourceUrl"
                    type="url"
                    defaultValue={
                      state.values?.sourceUrl ?? item.sourceUrl ?? ""
                    }
                    disabled={pending}
                    aria-invalid={!!state.fieldErrors?.sourceUrl?.length}
                  />
                  <FieldDescription>
                    This source URL will stay attached to the selected bot.
                  </FieldDescription>
                  <FieldError
                    errors={errorMessages(state.fieldErrors?.sourceUrl)}
                  />
                </Field>
              ) : (
                <Field data-invalid={!!state.fieldErrors?.content?.length}>
                  <FieldLabel htmlFor={`content-${item.id}`}>
                    {typeLabel}
                  </FieldLabel>
                  <Textarea
                    id={`content-${item.id}`}
                    name="content"
                    defaultValue={state.values?.content ?? item.content ?? ""}
                    rows={5}
                    disabled={pending}
                    aria-invalid={!!state.fieldErrors?.content?.length}
                  />
                  <FieldError
                    errors={errorMessages(state.fieldErrors?.content)}
                  />
                </Field>
              )}
            </FieldGroup>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={pending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              <SaveIcon data-icon="inline-start" />
              {pending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
