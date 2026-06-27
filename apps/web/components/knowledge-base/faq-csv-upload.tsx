"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { UploadIcon } from "lucide-react"

import { importFaqCsvAction } from "@/actions/knowledge-base/import-faq-csv"
import {
  initialKnowledgeFormState,
  type KnowledgeFormState,
} from "@/components/knowledge-base/knowledge-form-state"
import {
  FileUpload,
  type FileUploadItem,
} from "@/components/motion/file-upload"
import { parseFaqCsv, type ParsedFaqRow } from "@/lib/parse-faq-csv"
import { Button } from "@kibo/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@kibo/ui/components/field"

function errorMessages(errors?: string[]) {
  return errors?.map((message) => ({ message }))
}

export function FaqCsvUpload({ botId }: { botId: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [items, setItems] = useState<FileUploadItem[]>([])
  const [previewRows, setPreviewRows] = useState<ParsedFaqRow[]>([])
  const [previewError, setPreviewError] = useState<string | null>(null)
  const [state, formAction, pending] = useActionState<KnowledgeFormState, FormData>(
    importFaqCsvAction,
    initialKnowledgeFormState
  )
  const file = items[0]?.file ?? null

  function syncFile(nextFile: File | null) {
    const dataTransfer = new DataTransfer()

    if (nextFile) {
      dataTransfer.items.add(nextFile)
    }

    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files
    }
  }

  async function previewFile(item: FileUploadItem) {
    if (!item.file) {
      return
    }

    syncFile(item.file)
    setPreviewError(null)

    try {
      const rows = parseFaqCsv(await item.file.text())

      if (!rows.length) {
        setPreviewRows([])
        setPreviewError("No valid rows found. Use question and answer columns.")
        setItems([{ ...item, status: "error", error: "No rows found" }])
        return
      }

      setPreviewRows(rows)
      setItems([{ ...item, status: "success", progress: 100 }])
    } catch {
      setPreviewRows([])
      setPreviewError("We couldn't read this CSV file.")
      setItems([{ ...item, status: "error", error: "Preview failed" }])
    }
  }

  function clearFile() {
    syncFile(null)
    setItems([])
    setPreviewRows([])
    setPreviewError(null)
  }

  useEffect(() => {
    if (state.formSuccess) {
      clearFile()
    }
  }, [state.formSuccess])

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="botId" value={botId} />
      <input
        ref={inputRef}
        id="csv"
        name="csv"
        type="file"
        accept=".csv,text/csv"
        className="sr-only"
        aria-invalid={!!state.fieldErrors?.csv?.length}
      />

      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          Import FAQ CSV
        </h2>
        <p className="text-sm text-muted-foreground">
          Upload a CSV with `question` and `answer` columns.
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

      <Field data-invalid={!!state.fieldErrors?.csv?.length}>
        <FieldLabel htmlFor="csv">CSV file</FieldLabel>
        <FileUpload
          value={items}
          onValueChange={setItems}
          onFilesAdded={(added) => {
            const item = added[0]

            if (item) {
              setItems([{ ...item, status: "uploading", progress: 30 }])
              void previewFile(item)
            }
          }}
          onRemove={clearFile}
          onRetry={(item) => {
            setItems([{ ...item, status: "uploading", progress: 30 }])
            void previewFile(item)
          }}
          accept=".csv,text/csv"
          multiple={false}
          maxFiles={1}
          disabled={pending}
          title="Drop a FAQ CSV here"
          description="Preview question and answer rows before importing."
          browseLabel="Choose CSV"
          classNames={{
            dropzone: "bg-muted/20",
          }}
        />
        <FieldDescription>
          Example: `question,answer` followed by one FAQ per row.
        </FieldDescription>
        <FieldError errors={errorMessages(state.fieldErrors?.csv)} />
      </Field>

      {previewError ? (
        <p className="text-sm text-destructive" aria-live="polite">
          {previewError}
        </p>
      ) : null}

      {previewRows.length ? (
        <div className="rounded-lg border border-border bg-background">
          <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
            <p className="text-sm font-medium">
              {previewRows.length} {previewRows.length === 1 ? "row" : "rows"}{" "}
              ready to import
            </p>
            <p className="text-xs text-muted-foreground">Preview only</p>
          </div>
          <div className="max-h-64 overflow-auto">
            {previewRows.slice(0, 5).map((row, index) => (
              <div
                key={`${row.question}-${index}`}
                className="grid gap-2 border-b border-border/70 px-3 py-3 last:border-b-0"
              >
                <p className="text-sm font-medium">{row.question}</p>
                <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {row.answer}
                </p>
              </div>
            ))}
          </div>
          {previewRows.length > 5 ? (
            <p className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
              Showing first 5 rows. The full CSV will be imported.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={pending || !file || !previewRows.length || !!previewError}
        >
          <UploadIcon data-icon="inline-start" />
          {pending ? "Importing..." : "Import FAQs"}
        </Button>
      </div>
    </form>
  )
}
