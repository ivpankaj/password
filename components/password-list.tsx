"use client"

import { useEffect, useState } from "react"
import { ObjectId } from "mongodb"

import PasswordCardList, { Password } from "./password-card-list"
import { Skeleton } from "@/components/ui/skeleton"
import { getPasswords } from "@/lib/actions/passwords"

// Define the shape of data returned from getPasswords
interface PasswordResponse {
  id: string;
  _id: ObjectId;
  password: string;
  platform?: string;
  username?: string;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PasswordListProps {
  userId: string;
}

// Create a context or event system to trigger refetches
// This is a simple event bus for this component
const passwordEvents = {
  listeners: new Set<() => void>(),
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
  emit() {
    this.listeners.forEach(listener => listener());
  }
};

// Export the trigger function to be called from other components
export function refreshPasswordList() {
  passwordEvents.emit();
}

export default function PasswordList({ userId }: PasswordListProps) {
  const [passwords, setPasswords] = useState<Password[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const fetchPasswords = async () => {
    if (!userId) return;
    
    try {
      setLoading(true)
      // Use your server action to fetch passwords
      const passwordData = await getPasswords(userId)
      
      // Transform the data to match the Password type
      const transformedPasswords: Password[] = passwordData.map((p: PasswordResponse) => ({
        id: p.id,
        name: p.platform || "Unknown",
        value: p.password,
        platform: p.platform || "Unknown",
        username: p.username || "",
        password: p.password,
        url: p.url || "",
        createdAt: (p.createdAt ? p.createdAt.toISOString() : new Date().toISOString()),
        updatedAt: (p.updatedAt ? p.updatedAt.toISOString() : new Date().toISOString())
      }));
      
      setPasswords(transformedPasswords)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch passwords:", err)
      if (err instanceof Error) {
        setError(err.message || "Failed to load passwords")
      } else {
        setError("Failed to load passwords")
      }
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchPasswords()
    
    // Subscribe to password events
    const unsubscribe = passwordEvents.subscribe(() => {
      fetchPasswords()
    })
    
    return () => {
      unsubscribe();
    }
  }, [userId])

  if (loading && passwords.length === 0) {
    return <PasswordListSkeleton />
  }

  if (error && passwords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-medium text-destructive">Error loading passwords</h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  return <PasswordCardList passwords={passwords} />
}

function PasswordListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-4">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}