import Home from '@/components/Home'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Passkar - Your Trusted Password Manager",
  description:
    "Welcome to Passkar – the ultimate password manager designed for safety, simplicity, and security. Store, manage, and access your credentials easily and safely across all your devices.",
  keywords: [
    "Password Manager",
    "Secure Password Vault",
    "Password Organizer",
    "Encrypted Login Manager",
    "Free Password Manager",
    "Passkar",
    "Online Password Safety",
    "Social Media Passwords",
    "Multi-device Password Access",
    "Safe Credential Storage",
  ],
  robots: "index, follow",
  applicationName: "Passkar",
  generator: "Created and Developed by Pankaj",
  creator: "Pankaj",
  publisher: "Passkar",
  authors: [{ name: "Pankaj", url: "https://ivpankaj.web.app" }],
  openGraph: {
    title: "Passkar - Your Trusted Password Manager",
    description:
      "Manage and secure all your passwords in one place with Passkar. Encrypted, reliable, and free to use.",
    url: "https://passkar.vercel.app",
    siteName: "Passkar",
    images: [
      {
        url: "https://passkar.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Passkar Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Passkar - Secure Your Passwords Now",
    description:
      "Store your passwords securely and access them anytime, anywhere. Try Passkar – your reliable password manager.",
    creator: "@your_twitter_handle",
    images: ["https://passkar.vercel.app/twitter-image.jpg"],
  },
  metadataBase: new URL("https://passkar.vercel.app"),

}

const Page = () => {
  return <Home />
}

export default Page
