import * as React from "react"

import { cn } from "@kibo/ui/lib/utils"
import { controlSurface } from "@kibo/ui/components/input"

/**
 * Multi-line text. `autoGrow` grows from 3 to 8 lines, then scrolls;
 * otherwise it resizes vertically.
 */
function Textarea({
  className,
  autoGrow = false,
  ...props
}: React.ComponentProps<"textarea"> & { autoGrow?: boolean }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `flex min-h-24 w-full px-3 py-2.5 leading-normal ${controlSurface}`,
        autoGrow
          ? "field-sizing-content max-h-[calc(8lh+1.25rem+2px)] resize-none"
          : "resize-y",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
