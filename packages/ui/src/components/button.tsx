import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@kibo/ui/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 press items-center justify-center gap-2 rounded-md border border-transparent font-medium whitespace-nowrap select-none [-webkit-tap-highlight-color:transparent] disabled:cursor-not-allowed disabled:bg-sunken disabled:text-disabled disabled:shadow-none aria-[disabled=true]:cursor-progress [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "bg-raised text-foreground shadow-border hover:shadow-border-hover aria-expanded:shadow-border-hover",
        outline:
          "bg-raised text-foreground shadow-border hover:shadow-border-hover aria-expanded:shadow-border-hover",
        ghost:
          "bg-transparent text-foreground hover:bg-hovered disabled:bg-transparent aria-expanded:bg-hovered",
        destructive: "bg-destructive text-on-accent hover:bg-destructive-hover",
        link: "h-auto! px-0! text-link underline-offset-4 hover:underline disabled:bg-transparent",
      },
      size: {
        default:
          "h-10 px-4 text-body-sm leading-none has-data-[icon=inline-end]:pe-3.5 has-data-[icon=inline-start]:ps-3.5",
        xs: "h-7 gap-1.5 rounded-sm px-2.5 text-caption leading-none [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 rounded-[8px] px-3 text-caption leading-none has-data-[icon=inline-end]:pe-2.5 has-data-[icon=inline-start]:ps-2.5",
        lg: "h-12 rounded-[12px] px-5 text-body leading-none has-data-[icon=inline-end]:pe-4.5 has-data-[icon=inline-start]:ps-4.5 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10 text-muted-foreground hover:text-foreground [&_svg:not([class*='size-'])]:size-5",
        "icon-xs":
          "size-7 rounded-sm text-muted-foreground hover:text-foreground",
        "icon-sm":
          "size-8 rounded-[8px] text-muted-foreground hover:text-foreground",
        "icon-lg":
          "size-12 rounded-[12px] text-muted-foreground hover:text-foreground [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
