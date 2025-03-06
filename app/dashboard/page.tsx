import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/auth"
import DashboardHeader from "@/components/dashboard-header"
import PasswordList from "@/components/password-list"
import AddPasswordButton from "@/components/add-password-button"

export default async function DashboardPage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect("/login")
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={session.user} />
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Passwords</h1>
          <AddPasswordButton />
        </div>
        <PasswordList userId={session.user.id} />
      </main>
    </div>
  )
}
