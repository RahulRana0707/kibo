"use client"

import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react"

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): readonly [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item === null) {
        return
      }

      setValue(JSON.parse(item) as T)
    } catch {
      // Ignore invalid storage values and fall back to the default.
    }
  }, [key])

  const setStoredValue = useCallback<Dispatch<SetStateAction<T>>>(
    (nextValue) => {
      setValue((currentValue) => {
        const resolvedValue =
          typeof nextValue === "function"
            ? (nextValue as (currentValue: T) => T)(currentValue)
            : nextValue

        try {
          window.localStorage.setItem(key, JSON.stringify(resolvedValue))
        } catch {
          // Ignore write failures.
        }

        return resolvedValue
      })
    },
    [key]
  )

  return [value, setStoredValue]
}
