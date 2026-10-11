import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"
import { SoonLabel } from "@kibo/ui/components/soon-label"
import { Spinner } from "@kibo/ui/components/spinner"

// Unavailable buttons (loading, soon, disabled with a reason) use
// aria-disabled so they stay focusable and can say why.
const unavailable =
  "disabled:cursor-not-allowed disabled:bg-sunken disabled:text-disabled disabled:shadow-none aria-disabled:cursor-not-allowed aria-disabled:bg-sunken aria-disabled:text-disabled aria-disabled:shadow-none aria-busy:cursor-progress"

const buttonVariants = cva(
  `group/button inline-flex shrink-0 press items-center justify-center gap-2 rounded-md border border-transparent font-medium whitespace-nowrap no-underline select-none [-webkit-tap-highlight-color:transparent] ${unavailable} [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "bg-raised text-foreground shadow-border hover:shadow-border-hover aria-expanded:shadow-border-hover",
        ghost:
          "bg-transparent text-foreground hover:bg-hovered active:bg-pressed disabled:bg-transparent aria-disabled:bg-transparent aria-expanded:bg-hovered",
        destructive: "bg-destructive text-on-accent hover:bg-destructive-hover",
        link: "h-auto! px-0! text-link underline-offset-2 hover:text-primary-hover hover:underline disabled:bg-transparent aria-disabled:bg-transparent",
      },
      size: {
        xs: "h-7 gap-1 rounded-sm px-2 text-caption leading-none [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 rounded-[8px] px-3 text-caption leading-none has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5",
        default:
          "h-10 px-4 text-body-sm leading-none has-data-[icon=inline-end]:pe-3.5 has-data-[icon=inline-start]:ps-3.5",
        lg: "h-12 rounded-[12px] px-5 text-body leading-none has-data-[icon=inline-end]:pe-4.5 has-data-[icon=inline-start]:ps-4.5",
        "icon-xs":
          "size-7 rounded-sm text-muted-foreground hover:text-foreground",
        "icon-sm":
          "size-8 rounded-[8px] text-muted-foreground hover:text-foreground",
        icon: "size-10 text-muted-foreground hover:text-foreground [&_svg:not([class*='size-'])]:size-5",
        "icon-lg":
          "size-11 rounded-[12px] text-muted-foreground hover:text-foreground [&_svg:not([class*='size-'])]:size-5",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      block: false,
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    /** Shows a spinner; pass the in-progress label (“Saving…”) as children. */
    loading?: boolean
    /**
     * Not available yet: aria-disabled with a Soon label. Write the reason
     * nearby and link it with aria-describedby.
     */
    soon?: boolean
  }

function Button({
  className,
  variant = "primary",
  size = "default",
  block = false,
  asChild = false,
  loading = false,
  soon = false,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  const unavailable = loading || soon || props["aria-disabled"] === true

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, block, className }))}
      {...props}
      aria-disabled={unavailable || undefined}
      aria-busy={loading || undefined}
      // Only wrap a handler that exists, so server components can render
      // buttons without one.
      onClick={
        onClick
          ? (event: React.MouseEvent<HTMLButtonElement>) => {
              if (unavailable) {
                event.preventDefault()
                return
              }
              onClick(event)
            }
          : undefined
      }
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? <Spinner /> : null}
          {children}
          {soon ? <SoonLabel /> : null}
        </>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
