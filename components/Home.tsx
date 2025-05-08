import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Database, Eye, EyeOff, Github, Key, Linkedin, Lock, Shield, Twitter } from "lucide-react"

export default function Home() {
  return (
  <>
    <div className="flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-2 font-bold">
            <Shield className="h-5 w-5 text-primary" />
            <span>Passkar</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Secure Your Social Media Passwords
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Store all your social media passwords in one secure place. Access them anytime, anywhere, on any
                    device.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl" />
                  <div className="relative h-full w-full rounded-xl border bg-background p-4 shadow-xl">
                    <div className="space-y-4">
                      <div className="h-6 w-24 rounded-md bg-muted" />
                      <div className="space-y-2">
                        <div className="h-10 rounded-md bg-muted" />
                        <div className="h-10 rounded-md bg-muted" />
                        <div className="h-10 rounded-md bg-muted" />
                      </div>
                      <div className="flex justify-end">
                        <div className="h-8 w-20 rounded-md bg-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to keep your social media accounts secure
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">End-to-End Encryption</h3>
                <p className="text-center text-muted-foreground">
                  Your passwords are encrypted before they leave your device
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Cross-Platform Access</h3>
                <p className="text-center text-muted-foreground">Access your passwords from any device, anytime</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Easy Management</h3>
                <p className="text-center text-muted-foreground">
                  Add, edit, and delete your social media accounts with ease
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    
    </div>
    <div className="flex min-h-screen flex-col">

    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-2xl" />
                <div className="relative rounded-full bg-background p-4 border shadow-md">
                  <EyeOff className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Security at <span className="text-primary">Passkar</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your passwords are so secure, even we can't see them
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Hello, I'm Pankaj</h2>
              
              <p className="text-muted-foreground mb-6">
                As someone who constantly struggled with remembering my social media passwords, I created Passkar with one 
                fundamental principle in mind: <span className="italic">absolute security with absolute convenience</span>.
              </p>
              
              <div className="flex items-center justify-center my-12">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl" />
                  <div className="relative rounded-xl border bg-background p-6 shadow-lg">
                    <div className="mb-4 flex justify-center">
                      <Database className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium text-center mb-3">Bank-Level Encryption</h3>
                    <div className="bg-muted p-4 rounded-md font-mono text-sm mb-3 overflow-hidden">
                      <div className="whitespace-nowrap overflow-x-auto scrollbar-hide py-1">
                        Your Password: $%^&*(&^%$%#$$%^&*(
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      This is how your password appears in our database
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                What sets Passkar apart is our unwavering commitment to your privacy. When you store your passwords with us, 
                they're immediately encrypted using advanced algorithms before they even leave your device. This means that 
                <span className="font-semibold"> even we can't see your actual passwords</span>.
              </p>
              
              <p className="text-muted-foreground mb-12">
                In the unlikely event of a database breach, potential attackers would only find unintelligible strings like 
                "$%^&*(&^%$%#$$%^&*(" — completely useless without the unique decryption keys that only you possess.
              </p>
              
              <div className="flex items-center justify-center my-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl" />
                    <div className="relative flex flex-col items-center space-y-2 rounded-xl border bg-background p-6 shadow-lg h-full">
                      <Eye className="h-8 w-8 text-red-500" />
                      <h3 className="text-lg font-medium">What Others See</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Encrypted gibberish that's completely unusable
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl" />
                    <div className="relative flex flex-col items-center space-y-2 rounded-xl border bg-background p-6 shadow-lg h-full">
                      <Key className="h-8 w-8 text-green-500" />
                      <h3 className="text-lg font-medium">What You See</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Your actual passwords, seamlessly decrypted for you alone
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground">
                This approach was born from my personal frustration with forgetting passwords, but designed with the 
                understanding that convenience should never come at the cost of security. With Passkar, you'll never have 
                to choose between the two again.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Our Security Promise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Zero-Knowledge</h3>
                <p className="text-center text-muted-foreground">
                  We can never access your actual passwords
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">End-to-End</h3>
                <p className="text-center text-muted-foreground">
                  Encryption happens on your device, not our servers
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Fortified Storage</h3>
                <p className="text-center text-muted-foreground">
                  Multiple layers of protection for your data
                </p>
              </div>
            </div>
            <div className="mt-12">
              <Link href="/signup">
                <Button size="lg" className="mx-auto">
                  Secure Your Passwords
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Connect With Me</h2>
            <div className="flex justify-center space-x-6">
              <Link href="https://github.com/ivpankaj" className="rounded-full bg-muted p-3 hover:bg-muted/80 transition-colors">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://linkedin.com/in/ivpankaj15" className="rounded-full bg-muted p-3 hover:bg-muted/80 transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="https://x.com/ivpankaj" className="rounded-full bg-muted p-3 hover:bg-muted/80 transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2024 Passkar. All rights reserved. <span className="text-red-600">Design and Develop by <span className="text-purple-600">Pankaj</span></span>
        </p>
      </div>
    </footer>
  </div>
  </>
  )
}

