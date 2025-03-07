"use server"

import { revalidatePath } from "next/cache"
import { connectToDatabase } from "@/lib/mongodb"
import { getServerSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import crypto from "crypto"
import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"

// Properly handle the encryption key for AES-256-CBC (needs 32 bytes)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY 
  ? Buffer.from(process.env.ENCRYPTION_KEY).slice(0, 32).toString('hex')
  : crypto.randomBytes(32).toString('hex')

const IV_LENGTH = 16 // For AES, this is always 16

// Encrypt data
function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH)
  const key = Buffer.from(ENCRYPTION_KEY, 'hex')
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)
  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")
  return `${iv.toString("hex")}:${encrypted}`
}

// Decrypt data
function decrypt(text: string) {
  const [ivHex, encryptedText] = text.split(":")
  const iv = Buffer.from(ivHex, "hex")
  const key = Buffer.from(ENCRYPTION_KEY, 'hex')
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
  let decrypted = decipher.update(encryptedText, "hex", "utf8")
  decrypted += decipher.final("utf8")
  return decrypted
}

// The rest of your code remains the same...
export async function getPasswords(userId: string) {
  const session = await getServerSession()

  if (!session || session.user.id !== userId) {
    redirect("/login")
  }

  try {
    const { db } = await connectToDatabase()

    const passwords = await db.collection("passwords").find({ userId }).sort({ updatedAt: -1 }).toArray()

    return passwords.map((password) => ({
      ...password,
      password: decrypt(password.password),
      id: password._id.toString(),
    }))
  } catch (error) {
    console.error("Get passwords error:", error)
    return []
  }
}

export async function addPassword(data: {
  platform: string
  username: string
  password: string
  url?: string
}) {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  try {
    const { db } = await connectToDatabase()

    // Encrypt password
    const encryptedPassword = encrypt(data.password)

    await db.collection("passwords").insertOne({
      userId: session.user.id,
      platform: data.platform,
      username: data.username,
      password: encryptedPassword,
      url: data.url || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Add password error:", error)
    return { success: false, error: "Failed to add password" }
  }
}

export async function updatePassword(
  id: string,
  data: {
    platform?: string
    username?: string
    password?: string
    url?: string
  },
) {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  try {
    const { db } = await connectToDatabase()

    const password = await db.collection("passwords").findOne({
      _id: new ObjectId(id),
      userId: session.user.id,
    })

    if (!password) {
      return { success: false, error: "Password not found" }
    }

    const updateData: any = {
      updatedAt: new Date(),
    }

    if (data.platform) updateData.platform = data.platform
    if (data.username) updateData.username = data.username
    if (data.url !== undefined) updateData.url = data.url

    if (data.password) {
      updateData.password = encrypt(data.password)
    }

    await db.collection("passwords").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Update password error:", error)
    return { success: false, error: "Failed to update password" }
  }
}

export async function deletePassword(id: string) {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  try {
    const { db } = await connectToDatabase()

    await db.collection("passwords").deleteOne({
      _id: new ObjectId(id),
      userId: session.user.id,
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Delete password error:", error)
    return { success: false, error: "Failed to delete password" }
  }
}




// In your passwords.js server action file
export async function changePassword(currentPassword: string, newPassword: string) {
  const session = await getServerSession();
  
  // console.log("Change password called with session:", session ? "Session exists" : "No session");

  if (!session) {
    redirect("/login");
  }

  try {
    const { db } = await connectToDatabase();
    // console.log("Database connected");

    // Get the current user
    const user = await db.collection("users").findOne({
      _id: new ObjectId(session.user.id),
    });

    // console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Import bcrypt at the top of your file instead of here
    const isValid = await bcrypt.compare(currentPassword, user.password);
    // console.log("Password validation:", isValid ? "Valid" : "Invalid");

    if (!isValid) {
      return { success: false, error: "Current password is incorrect" };
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // console.log("New password hashed");

    // Update the user's password
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      { 
        $set: { 
          password: hashedPassword,
          updatedAt: new Date()
        } 
      }
    );
    
    // console.log("Update result:", result.modifiedCount > 0 ? "Password updated" : "No update occurred");

    revalidatePath("/dashboard");
    return { success: result.modifiedCount > 0, error: result.modifiedCount === 0 ? "No changes made" : "" };
  } catch (error) {
    console.error("Change password error details:", error);
    return { success: false, error: "Failed to change password: " + (error instanceof Error ? error.message : "Unknown error") };
  }
}