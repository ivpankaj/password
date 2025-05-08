import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Passkar - Safe and Secure Password Manager",
  description: "Passkar is a free, secure password manager that helps you store and manage your passwords for social media, banking, and other online accounts. Protect your data with strong encryption and reliable access control.",
  generator: "Design and Developed by Pankaj",
  applicationName: "Passkar",
  keywords: [
    "Password Manager",
    "Secure Password Storage",
    "Online Security",
    "Social Media Passwords",
    "Free Password Manager",
    "Encrypted Password Vault",
    "Passkar",
    "Safe Passwords",
    "Password Organizer",
    "Secure Login",
  ],
  authors: [{ name: "Pankaj", url: "https://ivpankaj.web.app" }],
  creator: "Pankaj",
  publisher: "Passkar",
  robots: "index, follow",

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Passkar - Safe and Secure Password Manager",
    description: "Store and manage your passwords for social media, banking, and websites securely with Passkar.",
    url: "https://passkar.vercel.app",
    siteName: "Passkar",
    images: [
      {
        url: "https://passkar.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Passkar Password Manager",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Passkar - Safe and Secure Password Manager",
    description: "Manage your passwords securely and effortlessly with Passkar.",
    creator: "@ivpankaj",
    images: ["https://passkar.vercel.app/twitter-card.jpg"],
  },
  metadataBase: new URL("https://passkar.vercel.app"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VB6LCSEW5W"
          strategy="afterInteractive"
        />
 
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VB6LCSEW5W');
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}