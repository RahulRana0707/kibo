"use client"

import { useTheme } from "next-themes"
import {
  Toaster as Sonner,
  toast as sonnerToast,
  type ExternalToast,
  type ToasterProps,
} from "sonner"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { Spinner } from "@kibo/ui/components/spinner"

/**
 * Confirms something someone just did: bottom right on desktop, bottom
 * center on phone, three at most. Errors stay until dismissed.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-right"
      visibleToasts={3}
      offset={24}
      mobileOffset={16}
      duration={4000}
      containerAriaLabel="Notifications"
      icons={{
        success: <CircleCheckIcon className="size-4 text-success-text" />,
        info: <InfoIcon className="size-4 text-link" />,
        warning: <TriangleAlertIcon className="size-4 text-warning-text" />,
        error: <CircleAlertIcon className="size-4 text-destructive-text" />,
        loading: <Spinner className="text-muted-foreground" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "transparent",
          "--border-radius": "var(--radius-lg)",
          "--width": "360px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "gap-3! py-2! ps-4! pe-2! min-h-12! shadow-raised! text-body-sm! font-sans!",
          title: "font-normal! text-body-sm!",
          description: "text-caption! text-muted-foreground!",
          actionButton:
            "h-8! rounded-[8px]! bg-transparent! px-3! text-caption! font-medium! text-foreground! hover:bg-hovered!",
        },
      }}
      {...props}
    />
  )
}

type ToastOptions = ExternalToast

/** Toasts with an action (Undo) stay 8 seconds; errors until dismissed. */
function withDefaults(options?: ToastOptions): ToastOptions | undefined {
  if (options?.action && options.duration === undefined) {
    return { ...options, duration: 8000 }
  }
  return options
}

const toast: typeof sonnerToast = Object.assign(
  (message: React.ReactNode, options?: ToastOptions) =>
    sonnerToast(message, withDefaults(options)),
  sonnerToast,
  {
    success: (message: React.ReactNode, options?: ToastOptions) =>
      sonnerToast.success(message, withDefaults(options)),
    info: (message: React.ReactNode, options?: ToastOptions) =>
      sonnerToast.info(message, withDefaults(options)),
    warning: (message: React.ReactNode, options?: ToastOptions) =>
      sonnerToast.warning(message, withDefaults(options)),
    error: (message: React.ReactNode, options?: ToastOptions) =>
      sonnerToast.error(message, { duration: Infinity, ...options }),
  }
)

export { Toaster, toast }
