"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { signIn } from "@/lib/actions/auth"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    try {
      // Validate form data
      loginSchema.parse(data)

      // Submit form data
      const result = await signIn(data)

      if (result.success) {
        setIsRedirecting(true)
        // Router.push doesn't immediately redirect, so we keep the loader showing
        router.push("/dashboard")
        router.refresh()
      } else {
        setError(result.error || "Invalid email or password")
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      // Only turn off loading if there was an error
      if (!isRedirecting) {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="relative">
      {(isLoading || isRedirecting) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 z-10 rounded-md">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="pankaj@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading || isRedirecting}>
          {isLoading || isRedirecting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  )
}