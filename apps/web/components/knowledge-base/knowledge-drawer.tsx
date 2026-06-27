"use client"

import { useState } from "react"
import { ChevronDownIcon, PlusIcon } from "lucide-react"

import { FaqCsvUpload } from "@/components/knowledge-base/faq-csv-upload"
import { FaqForm } from "@/components/knowledge-base/faq-form"
import {
  KnowledgeItemForm,
  KNOWLEDGE_TYPES,
  type KnowledgeType,
} from "@/components/knowledge-base/knowledge-item-form"
import { Drawer } from "@/components/motion/drawer"
import { Button } from "@kibo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"
import { Separator } from "@kibo/ui/components/separator"

type DrawerKnowledgeType = "FAQ" | KnowledgeType

const KNOWLEDGE_TYPE_OPTIONS = [
  {
    value: "FAQ",
    label: "FAQ",
    description: "A question and approved answer.",
  },
  ...KNOWLEDGE_TYPES,
] as const

export function KnowledgeDrawer({
  botId,
  botName,
}: {
  botId: string
  botName?: string
}) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<DrawerKnowledgeType>("FAQ")
  const selectedType = KNOWLEDGE_TYPE_OPTIONS.find((item) => item.value === type)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon data-icon="inline-start" />
        Add knowledge
      </Button>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        ariaLabel="Add knowledge"
        className="w-[560px] max-w-[calc(100vw-1rem)]"
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-5">
            <div className="flex min-w-0 flex-col gap-1">
              <h2 className="font-heading text-xl font-semibold tracking-tight">
                Add knowledge
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                Choose what Kibo should learn, then save it to{" "}
                <span className="font-medium text-foreground">
                  {botName ?? "this bot"}
                </span>
                .
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Knowledge type</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="justify-between"
                  >
                    <span>{selectedType?.label ?? "FAQ"}</span>
                    <ChevronDownIcon data-icon="inline-end" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Pick a type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={type}
                    onValueChange={(value) =>
                      setType(value as DrawerKnowledgeType)
                    }
                  >
                    <DropdownMenuGroup>
                      {KNOWLEDGE_TYPE_OPTIONS.map((item) => (
                        <DropdownMenuRadioItem
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="text-sm leading-6 text-muted-foreground">
                {selectedType?.description}
              </p>
            </div>

            <Separator />

            {type === "FAQ" ? (
              <div className="flex flex-col gap-7">
                <FaqForm botId={botId} />
                <Separator />
                <FaqCsvUpload botId={botId} />
              </div>
            ) : (
              <KnowledgeItemForm key={type} botId={botId} type={type} />
            )}
          </div>
        </div>
      </Drawer>
    </>
  )
}
