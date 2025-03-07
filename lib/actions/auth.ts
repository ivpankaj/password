"use server"

import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"
import { z } from "zod"
import { connectToDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function signUp(data: { name: string; email: string; password: string }) {
  try {
    // Validate data
    const validatedData = signUpSchema.parse(data)

    // Connect to database
    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email: validatedData.email })

    if (existingUser) {
      return { success: false, error: "User with this email already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Create user
    const insertResult = await db.collection("users").insertOne({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Create session
    const token = await createToken({
      sub: insertResult.insertedId.toString(),
      name: validatedData.name,
      email: validatedData.email,
    })

    // Set cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return { success: true }
  } catch (error) {
    console.error("Sign up error:", error)
    return { success: false, error: "Failed to create account" }
  }
}

export async function signIn(data: { email: string; password: string }) {
  try {
    // Validate data
    const validatedData = signInSchema.parse(data)

    // Connect to database
    const { db } = await connectToDatabase()

    // Find user
    const user = await db.collection("users").findOne({ email: validatedData.email })

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password)

    if (!isPasswordValid) {
      return { success: false, error: "Invalid email or password" }
    }

    // Create session
    const token = await createToken({
      sub: user._id.toString(),
      name: user.name,
      email: user.email,
    })

    // Set cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return { success: true }
  } catch (error) {
    console.error("Sign in error:", error)
    return { success: false, error: "Failed to sign in" }
  }
}

export async function signOut() {
  cookies().set({
    name: "auth-token",
    value: "",
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  })
}

async function createToken(payload: { sub: string; name: string; email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(JWT_SECRET))
}



// Function to get the current user from the JWT token
export async function getCurrentUser() {
  try {
    // Get the auth token from cookies
    const token = cookies().get("auth-token")?.value

    // If no token exists, user is not authenticated
    if (!token) {
      return null
    }

    // Verify and decode the token
    const verified = await jwtVerify(
      token, 
      new TextEncoder().encode(JWT_SECRET)
    )

    // Extract user data from the payload
    const payload = verified.payload
    
    return {
      id: payload.sub as string,
      name: payload.name as string,
      email: payload.email as string,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Function to get full user data from the database
export async function getUserProfile() {
  try {
    // Get basic user info from the token
    const user = await getCurrentUser()
    
    // If no user is authenticated, return null
    if (!user) {
      return null
    }
    
    // Connect to the database
    const { db } = await connectToDatabase()
    
    // Find the user in the database using their ID
    const userData = await db.collection("users").findOne(
      { _id: new ObjectId(user.id) },
      { projection: { password: 0 } } // Exclude the password field
    )
    
    if (!userData) {
      return null
    }
    
    // Return the user data with properly formatted ID
    return {
      id: userData._id.toString(),
      name: userData.name,
      email: userData.email,
      // Include any other user fields you need here
    }
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}