import * as React from "react"

import { cn } from "@kibo/ui/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-md border border-input bg-sunken px-3 text-body text-foreground caret-primary file:me-3 file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-body-sm file:font-medium file:text-foreground placeholder:text-disabled disabled:cursor-not-allowed disabled:text-disabled aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
