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
import { signUp } from "@/lib/actions/auth"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
})

export default function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setErrors({})
    setGeneralError("")

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    try {
      // Validate form data
      signupSchema.parse(data)

      // Submit form data
      const result = await signUp(data)

      if (result.success) {
        setIsRedirecting(true)
        // Short delay before redirecting to simulate loading and ensure state updates
        setTimeout(() => {
          router.push("/dashboard")
        }, 500)
      } else {
        setGeneralError(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setGeneralError("Something went wrong. Please try again.")
      }
    } finally {
      if (!isRedirecting) {
        setIsLoading(false)
      }
    }
  }

  if (isRedirecting) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-center text-lg font-medium">
          Account created successfully! Redirecting to dashboard...
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {generalError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Pankaj" required />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="pankaj@example.com" required />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required />
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  )
}