"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { Button } from "@kibo/ui/components/button"
import { Input } from "@kibo/ui/components/input"
import { FieldGroup, Field, FieldLabel } from "@kibo/ui/components/field"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@kibo/ui/components/card"
import { Icons } from "@/components/icons"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)
    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          setIsLoading(false)
          toast.success("Account created successfully!")
          router.push("/dashboard")
        },
        onError: (ctx) => {
          setIsLoading(false)
          toast.error(ctx.error.message || "Failed to create account")
        },
      }
    )
  }

  const handleSocialLogin = (provider: "google" | "github") => {
    console.log(provider)
    toast.info(
      `${provider.charAt(0).toUpperCase() + provider.slice(1)} sign-up is not connected yet.`
    )
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground select-none">
      <div className="w-full max-w-md px-4">
        <Card className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lg">
          <CardHeader className="space-y-1 pt-8 text-center">
            <div className="mb-3 flex justify-center">
              <Icons.logo className="size-16" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Create your account
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Start building your Kibo workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <FieldGroup>
                <Field data-disabled={isLoading}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    className="h-10 rounded-xl border border-input bg-background px-3 text-foreground placeholder-muted-foreground focus-visible:ring-primary"
                  />
                </Field>

                <Field data-disabled={isLoading}>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="h-10 rounded-xl border border-input bg-background px-3 text-foreground placeholder-muted-foreground focus-visible:ring-primary"
                  />
                </Field>

                <Field data-disabled={isLoading}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-10 rounded-xl border border-input bg-background px-3 text-foreground placeholder-muted-foreground focus-visible:ring-primary"
                  />
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                disabled={isLoading}
                className="active-scale mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150"
              >
                {isLoading ? (
                  <Icons.loader2 className="size-4 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute w-full border-t border-border" />
              <span className="relative bg-card px-3 text-xs tracking-wider text-muted-foreground uppercase">
                Or continue with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
                className="active-scale flex h-10 items-center justify-center gap-2 rounded-xl border border-input bg-background text-foreground transition-colors duration-150 hover:bg-muted"
              >
                <Icons.google className="size-4" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin("github")}
                disabled={isLoading}
                className="active-scale flex h-10 items-center justify-center gap-2 rounded-xl border border-input bg-background text-foreground transition-colors duration-150 hover:bg-muted"
              >
                <Icons.gitHub className="size-4" />
                GitHub
              </Button>
            </div>
          </CardContent>

          <CardFooter className="justify-center pt-4 pb-8 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="ml-1 font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
