// Creates the shared development account through the running API, the same
// way the sign-up form does. Safe to run again: an existing account is
// checked by logging in instead. Development only.
//
//   pnpm --filter api seed:dev-user
//
// Override with DEV_USER_NAME, DEV_USER_EMAIL and DEV_USER_PASSWORD.

if (process.env.NODE_ENV === "production") {
  console.error("Refusing to create the dev user in production.")
  process.exit(1)
}

const api = process.env.API_URL ?? "http://localhost:4000"
const web = process.env.WEB_URL ?? "http://localhost:3005"
const user = {
  name: process.env.DEV_USER_NAME ?? "Mira Okafor",
  email: process.env.DEV_USER_EMAIL ?? "mira@kibo.test",
  password: process.env.DEV_USER_PASSWORD ?? "kibo-dev-pass-1",
}

async function post(path, body) {
  const response = await fetch(`${api}/api/auth/${path}`, {
    method: "POST",
    // better-auth checks the origin against its trusted origins
    headers: { "Content-Type": "application/json", Origin: web },
    body: JSON.stringify(body),
  })
  return { ok: response.ok, body: await response.json().catch(() => ({})) }
}

try {
  const signUp = await post("sign-up/email", user)

  if (signUp.ok) {
    console.log(`Created ${user.email}`)
  } else if (signUp.body.code === "USER_ALREADY_EXISTS" || signUp.body.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
    const signIn = await post("sign-in/email", {
      email: user.email,
      password: user.password,
    })
    if (!signIn.ok) {
      console.error(
        `${user.email} exists but the password doesn’t match: ${signIn.body.message ?? "unknown error"}`
      )
      process.exit(1)
    }
    console.log(`${user.email} already exists and the password works`)
  } else {
    console.error(`Sign-up failed: ${signUp.body.message ?? JSON.stringify(signUp.body)}`)
    process.exit(1)
  }
} catch (error) {
  console.error(`Couldn’t reach the API at ${api}. Start it with pnpm dev.`)
  console.error(error.message)
  process.exit(1)
}

console.log(`Log in at ${web}/login with ${user.email} / ${user.password}`)
