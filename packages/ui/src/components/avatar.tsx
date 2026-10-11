import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@kibo/ui/lib/utils"

const avatarVariants = cva(
  "relative inline-grid shrink-0 place-items-center font-semibold select-none",
  {
    variants: {
      size: {
        xs: "size-5 text-[0.6875rem]",
        sm: "size-6 text-[0.6875rem]",
        default: "size-8 text-xs",
        md: "size-10 text-body-sm",
        lg: "size-12 text-body",
        xl: "size-[72px] text-[1.375rem]",
      },
      variant: {
        person: "bg-sunken text-muted-foreground",
        // Bots use the accent tint so they never look like a person.
        bot: "bg-primary-subtle text-link",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: { size: "default", variant: "person", shape: "circle" },
  }
)

const statusDot = {
  live: "bg-success",
  paused: "bg-warning",
  offline: "bg-border-strong",
}

const statusWord = { live: "live", paused: "paused", offline: "offline" }

/** Up to two initials from a name: “Mira Okafor” → “MO”. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
}

/**
 * A person, viewer, workspace or bot: an image when there is one, else one
 * or two initials. Bots show the first letter of their name. Beside a
 * visible name the avatar is hidden from screen readers; pass `label` when
 * it stands alone.
 */
function Avatar({
  name,
  initials: initialsProp,
  src,
  size,
  variant,
  shape,
  status,
  badge,
  label,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof avatarVariants> & {
    /** Used for the initials. */
    name: string
    /** Overrides the initials taken from `name`. */
    initials?: string
    src?: string
    status?: keyof typeof statusDot
    /** A small mark at the bottom end, such as a platform logo. */
    badge?: React.ReactNode
    /** The accessible name when the avatar stands alone. */
    label?: string
  }) {
  const letters =
    initialsProp ??
    (variant === "bot" ? name.charAt(0).toUpperCase() : initials(name))

  return (
    <span
      data-slot="avatar"
      data-size={size ?? "default"}
      role={label ? "img" : undefined}
      aria-label={
        label ? (status ? `${label}, ${statusWord[status]}` : label) : undefined
      }
      aria-hidden={label ? undefined : true}
      className={cn(avatarVariants({ size, variant, shape }), className)}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt=""
          className={cn(
            "size-full object-cover image-outline",
            shape === "square" ? "rounded-md" : "rounded-full"
          )}
        />
      ) : (
        letters
      )}
      {status ? (
        <span
          className={cn(
            "absolute inset-e-0 bottom-0 size-2.5 rounded-full ring-2 ring-page",
            statusDot[status]
          )}
        />
      ) : null}
      {badge ? (
        <span className="absolute -inset-e-1 -bottom-1 grid size-4 place-items-center overflow-hidden rounded-[4px] bg-white ring-2 ring-page [&_img]:size-4! [&_img]:rounded-[4px]! [&_img]:p-0.5! [&_img]:shadow-none!">
          {badge}
        </span>
      ) : null}
    </span>
  )
}

/** Overlapping avatars, with a “+N” count after the last one shown. */
function AvatarGroup({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-group"
      className={cn(
        "inline-flex items-center -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-page",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  count,
  className,
  ...props
}: React.ComponentProps<"span"> & { count: number }) {
  return (
    <span
      data-slot="avatar-group-count"
      aria-hidden="true"
      className={cn(
        "relative inline-grid size-8 shrink-0 place-items-center rounded-full bg-hovered text-xs font-semibold text-muted-foreground tabular ring-2 ring-page",
        className
      )}
      {...props}
    >
      +{count}
    </span>
  )
}

export { Avatar, AvatarGroup, AvatarGroupCount, initials as avatarInitials }
