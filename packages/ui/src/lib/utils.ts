import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge Violet's theme names. Without this it reads
// `text-body-sm` as a text color and drops the real color beside it, and
// reads `shadow-border` as a shadow color.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "hero",
        "display",
        "title",
        "heading",
        "body",
        "body-sm",
        "caption",
        "overline",
        "code",
      ],
      shadow: ["border", "border-hover", "raised"],
    },
    classGroups: {
      duration: [{ duration: ["instant", "fast", "moderate", "slow"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
