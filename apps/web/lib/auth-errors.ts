type AuthError = { code?: string; status?: number; message?: string } | null

/** Groups better-auth error responses into the cases the forms explain. */
export function classifyAuthError(error: AuthError) {
  if (!error) {
    return null
  }

  if (error.status === 429) {
    return "rate-limited" as const
  }

  switch (error.code) {
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "email-taken" as const
    case "INVALID_EMAIL_OR_PASSWORD":
      return "wrong-credentials" as const
    case "INVALID_EMAIL":
      return "invalid-email" as const
    case "PASSWORD_TOO_SHORT":
      return "weak-password" as const
    default:
      return "unknown" as const
  }
}

export function isEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value)
}

/** At least 10 characters, with a number or symbol. */
export function isStrongPassword(value: string) {
  return value.length >= 10 && /[^A-Za-z]/.test(value)
}
