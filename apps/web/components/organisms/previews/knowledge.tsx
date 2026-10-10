import { Badge } from "@kibo/ui/components/badge"
import { Label } from "@kibo/ui/components/label"
import { Textarea } from "@kibo/ui/components/textarea"

import { DemoButton } from "@/components/atoms/demo-button"
import { Panel } from "@kibo/ui/components/panel"
import { ListRow } from "@/components/molecules/list-row"

const items = [
  { type: "FAQ", title: "What sens do you play on?", used: 41 },
  { type: "Link", title: "Discord invite", used: 77 },
  { type: "Rule", title: "No backseating in ranked", used: 12 },
  { type: "Gear", title: "Keystrike 75 keyboard", used: 23 },
  { type: "Sponsor", title: "Hydrafuel — code MIRA10", used: 9 },
]

/** A short list of knowledge items, for the product overview. */
export function KnowledgeSnippet() {
  return (
    <Panel>
      <div>
        <ListRow leading={<Badge>FAQ</Badge>}>What rank are you?</ListRow>
        <ListRow leading={<Badge>Link</Badge>}>Discord server invite</ListRow>
        <ListRow leading={<Badge>Gear</Badge>}>Keystrike 75 keyboard</ListRow>
        <ListRow leading={<Badge variant="warning">Unanswered</Badge>}>
          “are you going to Twitchcon?” · asked 9×
        </ListRow>
      </div>
    </Panel>
  )
}

/** The knowledge list with types and how often each was used. */
export function KnowledgeList() {
  return (
    <Panel className="gap-0 overflow-hidden p-0 max-sm:p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-separator px-6 py-4">
        <p className="font-medium">Knowledge · 64 items</p>
        <span className="flex gap-2">
          <Badge>All</Badge>
          <Badge>FAQ</Badge>
          <Badge>Gear</Badge>
        </span>
      </div>
      <div>
        {items.map((item) => (
          <ListRow
            key={item.title}
            inset
            leading={<Badge className="w-16">{item.type}</Badge>}
            trailing={
              <span className="text-caption text-muted-foreground">
                Used {item.used}×
              </span>
            }
          >
            {item.title}
          </ListRow>
        ))}
      </div>
    </Panel>
  )
}

/** An unanswered question, grouped with its variants, ready to answer. */
export function UnansweredCard() {
  return (
    <Panel>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-medium">“Are you going to TwitchCon?”</p>
        <Badge variant="warning">Asked 9×</Badge>
      </div>
      <p className="text-caption text-muted-foreground">
        Also: “twitchcon this year?”, “will u be at the con”, +6 more · 3
        streams
      </p>
      <div className="flex flex-col gap-2" aria-hidden="true">
        <Label>Your answer</Label>
        <Textarea
          tabIndex={-1}
          readOnly
          rows={2}
          defaultValue="Not this year — but I’ll be at IndiaGameCon in December!"
          className="min-h-0"
        />
      </div>
      <div className="flex justify-end gap-3">
        <DemoButton variant="ghost" size="default">
          Dismiss
        </DemoButton>
        <DemoButton variant="primary" size="default">
          Save as FAQ
        </DemoButton>
      </div>
    </Panel>
  )
}
