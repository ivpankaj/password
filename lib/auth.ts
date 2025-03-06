import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function getServerSession() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")

  if (!token) {
    return null
  }

  try {
    const { payload } = await jwtVerify(token.value, new TextEncoder().encode(JWT_SECRET))

    return {
      user: {
        id: payload.sub as string,
        name: payload.name as string,
        email: payload.email as string,
      },
    }
  } catch (error) {
    return null
  }
}

