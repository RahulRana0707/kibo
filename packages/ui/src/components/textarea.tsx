import * as React from "react"

import { cn } from "@kibo/ui/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full resize-none rounded-md border border-input bg-sunken px-3 py-2 text-body text-foreground caret-primary placeholder:text-disabled disabled:cursor-not-allowed disabled:text-disabled aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
