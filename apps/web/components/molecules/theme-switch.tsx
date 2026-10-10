"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@kibo/ui/components/dropdown-menu"

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "Auto" },
]

const subscribe = () => () => {}

/**
 * Light, Dark or Auto as a segmented row inside a dropdown menu. The options
 * are menu radio items, so arrow keys reach them like any other item.
 */
export function ThemeMenuSwitch() {
  const { theme, setTheme } = useTheme()
  // The saved theme is only known in the browser.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  return (
    <div className="flex items-center justify-between gap-3 px-2.5 py-1.5">
      <span id="theme-label" className="text-body-sm">
        Theme
      </span>
      <DropdownMenuRadioGroup
        aria-labelledby="theme-label"
        value={mounted ? (theme ?? "system") : ""}
        onValueChange={setTheme}
        className="flex gap-0.5 rounded-lg bg-sunken p-0.5"
      >
        {options.map((option) => (
          <DropdownMenuRadioItem
            key={option.value}
            value={option.value}
            onSelect={(event) => event.preventDefault()}
            className="min-h-7 rounded-md px-2.5! py-0 text-caption font-medium text-muted-foreground data-[state=checked]:bg-raised data-[state=checked]:text-foreground data-[state=checked]:shadow-border [&>[data-slot=dropdown-menu-radio-item-indicator]]:hidden"
          >
            {option.label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </div>
  )
}
