"use client"

import { useEffect, useState } from "react"

export function useHoverCapable() {
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    if (!window.matchMedia) {
      return
    }

    const media = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setCanHover(media.matches)

    update()
    media.addEventListener?.("change", update)

    return () => {
      media.removeEventListener?.("change", update)
    }
  }, [])

  return canHover
}
