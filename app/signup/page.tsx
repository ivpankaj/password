import Link from "next/link"
import { Shield } from "lucide-react"
import SignupForm from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl">Passkar</span>
            </Link>
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">Enter your information to create an account</p>
          </div>
          <SignupForm />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

