"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"
import { useRef, type ReactNode } from "react"

import { SPRING_MOUSE } from "@/lib/ease"
import { useHoverCapable } from "@/lib/hooks/use-hover-capable"
import { cn } from "@kibo/ui/lib/utils"

export interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const canHover = useHoverCapable()
  const enabled = !reduce && canHover
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING_MOUSE)
  const springY = useSpring(y, SPRING_MOUSE)

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    const element = ref.current

    if (!element || !enabled) {
      return
    }

    const rect = element.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * strength)
    y.set((event.clientY - rect.top - rect.height / 2) * strength)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  )
}
