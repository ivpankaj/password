
import ChangePassword from "@/components/ChangePassword"
import { getUserProfile } from "@/lib/actions/auth"
import { redirect } from "next/navigation"

export default async function ChangePasswordPage() {
  // Get user data server-side
  const user = await getUserProfile()
  
  // If no user is found, redirect to login
  if (!user) {
    redirect("/login?callbackUrl=/change-password")
  }
  
  // Render the change password component with user data
  return <ChangePassword user={user} />
}