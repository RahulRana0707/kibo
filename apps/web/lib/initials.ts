/** Up to two initials from a name, such as "MO" for "Mira Okafor". */
export function initialsOf(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "?"
  )
}

/** A readable name from an email, such as "Mira Okafor" for mira.okafor@…. */
export function nameFromEmail(email: string) {
  const local = email.split("@")[0] ?? email
  const words = local
    .split(/[._\-+\d]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

  return words.join(" ") || local
}
