"use client"

import { useSyncExternalStore } from "react"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@kibo/ui/components/dropdown-menu"

const options = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "Auto", icon: MonitorIcon },
]

const subscribe = () => () => {}

/**
 * Light, Dark or Auto (follows the device) as radio items in the account
 * menu. Picking one applies at once and keeps the menu open.
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
    <>
      <DropdownMenuLabel id="theme-label">Theme</DropdownMenuLabel>
      <DropdownMenuRadioGroup
        aria-labelledby="theme-label"
        value={mounted ? (theme ?? "system") : ""}
        onValueChange={setTheme}
      >
        {options.map((option) => (
          <DropdownMenuRadioItem
            key={option.value}
            value={option.value}
            onSelect={(event) => event.preventDefault()}
          >
            <option.icon aria-hidden="true" />
            {option.label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </>
  )
}
