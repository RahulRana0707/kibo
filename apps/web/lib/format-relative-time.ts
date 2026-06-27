export function formatRelativeTime(input: Date | string | number, now = new Date()) {
  const date = input instanceof Date ? input : new Date(input)
  const diffSeconds = Math.round((date.getTime() - now.getTime()) / 1000)
  const absSeconds = Math.abs(diffSeconds)

  let value = diffSeconds
  let unit: Intl.RelativeTimeFormatUnit = "second"

  if (absSeconds < 60) {
    value = diffSeconds
    unit = "second"
  } else if (absSeconds < 60 * 60) {
    value = Math.round(diffSeconds / 60)
    unit = "minute"
  } else if (absSeconds < 60 * 60 * 24) {
    value = Math.round(diffSeconds / (60 * 60))
    unit = "hour"
  } else if (absSeconds < 60 * 60 * 24 * 7) {
    value = Math.round(diffSeconds / (60 * 60 * 24))
    unit = "day"
  } else if (absSeconds < 60 * 60 * 24 * 30) {
    value = Math.round(diffSeconds / (60 * 60 * 24 * 7))
    unit = "week"
  } else if (absSeconds < 60 * 60 * 24 * 365) {
    value = Math.round(diffSeconds / (60 * 60 * 24 * 30))
    unit = "month"
  } else {
    value = Math.round(diffSeconds / (60 * 60 * 24 * 365))
    unit = "year"
  }

  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  return formatter.format(value, unit)
}
