"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Pencil, Trash } from "lucide-react"
import { useState } from "react"
import { deletePassword } from "@/lib/actions/passwords"
import EditPasswordDialog from "./edit-password-dialog"
import { refreshPasswordList } from "./password-list"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle 
} from "@/components/ui/alert-dialog"

export interface Password {
  id: string
  platform: string
  username: string
  password: string
  url: string
  createdAt: string
  updatedAt: string
}

export default function PasswordCardList({ passwords }: { passwords: Password[] }) {
  // Add null check to prevent TypeError
  if (!passwords || passwords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-medium">No passwords yet</h3>
        <p className="text-muted-foreground">
          Add your first password by clicking the &quot;Add Password&quot; button above.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {passwords.map((password) => (
        <PasswordCard key={password.id} password={password} />
      ))}
    </div>
  )
}

function PasswordCard({ password }: { password: Password }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState({ title: "", description: "" })
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const showAlert = (title: string, description: string) => {
    setAlertMessage({ title, description })
    setAlertOpen(true)
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const result = await deletePassword(password.id)
      
      if (result.success) {
        showAlert(
          "Password deleted", 
          "Your password has been successfully deleted."
        )
        refreshPasswordList()
      } else {
        throw new Error(result.error || "Failed to delete password")
      }
    } catch (error) {
      console.error("Error deleting password:", error)
      showAlert(
        "Error", 
        (error instanceof Error ? error.message : "Failed to delete password")
      )
    } finally {
      setIsDeleting(false)
      setConfirmDeleteOpen(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            {password.platform}
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setIsEditOpen(true)}
                disabled={isDeleting}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive"
                onClick={() => setConfirmDeleteOpen(true)}
                disabled={isDeleting}
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            {password.url && (
              <a
                href={password.url.startsWith("http") ? password.url : `https://${password.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {password.url}
              </a>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid gap-2">
            <div>
              <div className="text-sm font-medium">Username</div>
              <div className="flex items-center justify-between">
                <div className="text-sm">{password.username}</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 px-2"
                  onClick={() => {
                    navigator.clipboard.writeText(password.username)
                    showAlert("Copied", "Username copied to clipboard")
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Password</div>
              <div className="flex items-center justify-between">
                <div className="text-sm">{showPassword ? password.password : "••••••••"}</div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2"
                    onClick={() => {
                      navigator.clipboard.writeText(password.password)
                      showAlert("Copied", "Password copied to clipboard")
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="text-xs text-muted-foreground">
            Updated {new Date(password.updatedAt).toLocaleDateString()}
          </div>
        </CardFooter>
      </Card>

      {/* Edit Password Dialog */}
      {isEditOpen && (
        <EditPasswordDialog 
          password={password}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {/* Alert Dialog for notifications */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertMessage.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Delete Dialog */}
      <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this password. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}