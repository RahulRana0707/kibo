import Link from "next/link"

import { designLayers } from "./_components/design-nav"

export default function DesignIndexPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-display">Component library</h1>
      <p className="max-w-[68ch] text-muted-foreground">
        Every component and variant from the canvas page “01 Component
        library”, rendered from code. Use it to check a component against its
        board. Only available in development.
      </p>
      <ul className="flex flex-col gap-2">
        {designLayers.map((layer) => (
          <li key={layer.slug}>
            <Link href={`/design/${layer.slug}`} className="text-link">
              {layer.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
