import * as icons from "lucide-react"

import { BrandLogo } from "@/components/atoms/brand-logo"

import { Board, Group } from "../_components/showcase"

export const metadata = { title: "Foundations · Component library" }

const colors = [
  { title: "Surfaces", items: ["bg-page", "bg-surface", "bg-raised", "bg-sunken", "bg-hovered", "bg-pressed", "bg-overlay", "bg-inverse"] },
  { title: "Text", items: ["text-foreground", "text-muted-foreground", "text-disabled", "text-link"] },
  { title: "Lines", items: ["bg-border-subtle", "bg-separator", "bg-border-control", "bg-border-strong", "bg-ring"] },
  { title: "Accent", items: ["bg-primary-subtle", "bg-primary-subtle-hover", "bg-primary-border", "bg-primary", "bg-primary-hover"] },
  { title: "Danger", items: ["bg-destructive-subtle", "bg-destructive-border", "bg-destructive", "bg-destructive-hover", "text-destructive-text"] },
  { title: "Success", items: ["bg-success-subtle", "bg-success-border", "bg-success", "text-success-text"] },
  { title: "Warning", items: ["bg-warning-subtle", "bg-warning-border", "bg-warning", "text-warning-text"] },
]

const typeStyles = [
  ["text-hero", "Focus on creating. Kibo handles the chat.", "56 / 1.1 / 600 · marketing heroes"],
  ["text-display", "Moderation", "36 / 1.1 / 600 · page h1"],
  ["text-title", "Rules and filters", "24 / 1.2 / 600 · section h2"],
  ["text-heading", "Hydrafuel campaign", "18 / 1.3 / 600 · h3, card and dialog titles"],
  ["text-body", "Pip answers the questions chat asks every stream.", "16 / 1.5 · long-form, inputs"],
  ["text-body-sm", "Menus, table cells, buttons and settings rows.", "14 / 1.5 · interface text"],
  ["text-caption", "Updated 3 minutes ago · 12 questions", "13 / 1.4 · helper, metadata"],
  ["text-overline uppercase", "Last 30 days", "12 / 1.3 / 600 · section labels"],
  ["font-mono text-code", "discord.gg/miraplays · ws_8KdQ2m", "DM Mono 13 · code, IDs"],
]

const iconNames = [
  "Plus", "Minus", "X", "Check", "Pencil", "Copy", "Trash2", "Archive", "Download", "Upload", "Send", "RefreshCw", "Undo2", "ExternalLink", "Link", "Share2", "Filter", "SlidersHorizontal", "ArrowUpDown", "Search", "Ellipsis", "GripVertical",
  "ChevronLeft", "ChevronRight", "ChevronDown", "ChevronUp", "ArrowLeft", "ArrowRight", "ArrowUpRight", "Menu", "PanelLeft", "House", "LayoutDashboard", "LogIn", "LogOut",
  "CircleCheck", "CircleAlert", "TriangleAlert", "Info", "CircleHelp", "Lock", "LockOpen", "Ban", "LoaderCircle", "WifiOff", "Clock", "Hourglass", "Timer",
  "Bot", "MessageSquare", "MessagesSquare", "Shield", "ShieldCheck", "BookOpen", "FileText", "Inbox", "Flag", "Sparkles", "Zap", "Radio", "MonitorPlay", "Layers", "Plug", "Webhook", "KeyRound", "Users", "User", "UserPlus", "AtSign", "Hash", "Globe",
  "Gift", "Trophy", "Music", "Megaphone", "Calendar", "ChartColumn", "TrendingUp", "TrendingDown", "CreditCard", "Receipt", "Store", "Package", "Star", "Heart",
  "Settings", "Bell", "BellOff", "Pause", "Play", "Eye", "EyeOff", "Sun", "Moon", "Monitor", "Keyboard", "Command", "Mail", "Smartphone", "Gamepad2", "Mic", "Image", "Wrench", "Bookmark", "Pin",
] as const

export default function FoundationsPage() {
  const iconSet = icons as unknown as Record<string, React.ElementType>

  return (
    <>
      <h1 className="text-display">Foundations</h1>
      <Board id="color" layer="Foundations" title="Color roles" origin="violet" description="Every semantic role, as the Tailwind name code uses. Components use only these; dark mode swaps the primitives underneath." importLine="packages/ui/src/styles/globals.css">
        {colors.map((group) => (
          <Group key={group.title} title={group.title} className="grid w-full grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
            {group.items.map((name) => (
              <div key={name} className="flex flex-col gap-1.5">
                <span
                  className={`h-12 rounded-lg shadow-border ${name.startsWith("text-") ? `${name} grid place-items-center bg-page font-semibold` : name}`}
                >
                  {name.startsWith("text-") ? "Aa" : null}
                </span>
                <code className="font-mono text-[0.75rem] text-muted-foreground">{name}</code>
              </div>
            ))}
          </Group>
        ))}
      </Board>
      <Board id="type" layer="Foundations" title="Type styles" origin="violet" description="DM Sans for everything, DM Mono for code. Emphasis is one weight step, never a size change. Hero and display shrink at phone width." importLine="text-hero … text-code">
        <div className="flex flex-col gap-5">
          {typeStyles.map(([cls, sample, note]) => (
            <div key={cls} className="grid grid-cols-[180px_1fr] items-baseline gap-6 border-b border-separator pb-4 max-md:grid-cols-1 max-md:gap-1">
              <code className="font-mono text-[0.75rem] text-muted-foreground">{cls}<br />{note}</code>
              <span className={cls}>{sample}</span>
            </div>
          ))}
        </div>
      </Board>
      <Board id="space" layer="Foundations" title="Spacing, radius and shadow" origin="violet" description="4px base; the gap between groups is at least twice the gap inside one. Nested corners are concentric." importLine="space-1 … space-9 · rounded-sm/md/lg/xl/full · shadow-border/-hover/raised">
        <Group title="Space (Violet → Tailwind)" className="flex-col items-start">
          {[["space-1", 4, "1"], ["space-2", 8, "2"], ["space-3", 12, "3"], ["space-4", 16, "4"], ["space-5", 24, "6"], ["space-6", 32, "8"], ["space-7", 48, "12"], ["space-8", 64, "16"], ["space-9", 96, "24"]].map(([name, px, tw]) => (
            <div key={name} className="flex items-center gap-4">
              <code className="w-40 font-mono text-[0.75rem] text-muted-foreground">{name} · {px}px · gap-{tw}</code>
              <span className="h-3 rounded-sm bg-primary" style={{ width: Number(px) * 2 }} />
            </div>
          ))}
        </Group>
        <Group title="Radius">
          {["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-full"].map((radius) => (
            <div key={radius} className="flex flex-col items-center gap-2">
              <span className={`size-16 bg-primary-subtle shadow-border ${radius}`} />
              <code className="font-mono text-[0.75rem] text-muted-foreground">{radius}</code>
            </div>
          ))}
        </Group>
        <Group title="Shadow">
          {["shadow-border", "shadow-border-hover", "shadow-raised"].map((shadow) => (
            <div key={shadow} className={`flex h-24 w-48 items-end rounded-xl bg-raised p-3 ${shadow}`}>
              <code className="font-mono text-[0.75rem] text-muted-foreground">{shadow}</code>
            </div>
          ))}
        </Group>
      </Board>
      <Board id="icons" layer="Foundations" title="Icons" origin="violet" description="Every icon on the canvas, from lucide-react. 16 inline, 20 in nav and inputs, 24 in empty states and tiles. Never an icon alone for status." importLine='import { BotIcon } from "lucide-react"'>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
          {iconNames.map((name) => {
            const Icon = iconSet[`${name}Icon`] ?? iconSet[name]
            return (
              <div key={name} className="flex flex-col items-center gap-2 rounded-lg p-3 text-center hover:bg-hovered">
                <span className="flex items-end gap-3 text-foreground">
                  {Icon ? (
                    <>
                      <Icon className="size-4" />
                      <Icon className="size-5" strokeWidth={1.5} />
                      <Icon className="size-6" strokeWidth={1.5} />
                    </>
                  ) : null}
                </span>
                <code className="font-mono text-[0.6875rem] text-muted-foreground">{name}</code>
              </div>
            )
          })}
        </div>
      </Board>
      <Board id="brand" layer="Foundations" title="Brand mark" origin="kibo" description="The K mark is the inverse fill with inverse lettering, so it flips with the theme. The wordmark is Kibo in DM Sans 600." importLine="app/icon.svg · app/apple-icon.tsx · BrandLogo">
        <Group title="Sizes · on a dark section">
          <BrandLogo />
          <BrandLogo size="sm" />
          <BrandLogo markOnly />
          <div className="dark rounded-xl bg-page p-6">
            <BrandLogo />
          </div>
        </Group>
      </Board>
      <Board id="motion" layer="Foundations" title="Motion" origin="violet" description="Frequent interactions change color only. Movement, scale and blur run only without reduced motion. Name exact properties; never transition-all." importLine="duration-instant · duration-fast · duration-moderate · duration-slow · ease-out · ease-emphasized">
        <Group title="Durations">
          {[["duration-instant", "100ms · row and ghost hover"], ["duration-fast", "150ms · press, exits, switch"], ["duration-moderate", "200ms · sheets and drawers"], ["duration-slow", "300ms · entrances, icon cross-fades"]].map(([name, note]) => (
            <div key={name} className="flex w-56 flex-col gap-1">
              <code className="font-mono text-[0.75rem]">{name}</code>
              <span className="text-caption text-muted-foreground">{note}</span>
            </div>
          ))}
        </Group>
      </Board>
    </>
  )
}
