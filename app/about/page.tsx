import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, User, Lock, Key, Github, Linkedin, Twitter } from "lucide-react"

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-2 font-bold">
            <Shield className="h-5 w-5 text-primary" />
            <span>Passkar</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>
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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-2xl" />
                  <div className="relative rounded-full bg-background p-4 border shadow-md">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                The Story Behind <span className="text-primary">Passkar</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                A personal journey from password frustration to digital liberation
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
                  Like many of us navigating the digital landscape, I found myself in an all-too-familiar predicament — 
                  <span className="italic">constantly forgetting my social media passwords</span>. The frustration of 
                  reset emails, security questions, and that sinking feeling when locked out of an account became a regular part of my online life.
                </p>
                
                <div className="flex items-center justify-center my-12">
                  <div className="relative w-full max-w-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl" />
                    <div className="relative flex items-center space-x-4 rounded-xl border bg-background p-6 shadow-lg">
                      <Lock className="h-10 w-10 text-primary" />
                      <div>
                        <h3 className="text-xl font-medium">The Password Dilemma</h3>
                        <p className="text-sm text-muted-foreground">Too many accounts, too many passwords, not enough memory</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  That's when the idea struck — why not create an elegant solution that would not only solve my own problem 
                  but potentially help countless others facing the same digital dilemma? Thus, 
                  <span className="font-semibold text-primary"> Passkar </span> was born.
                </p>
                
                <p className="text-muted-foreground mb-12">
                  Designed with both simplicity and security at its core, Passkar is my contribution to a less frustrating 
                  digital experience. Every feature has been thoughtfully crafted to ensure your social media passwords 
                  are both completely secure and effortlessly accessible whenever you need them.
                </p>
                
                <div className="flex items-center justify-center my-12">
                  <div className="relative w-full max-w-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl" />
                    <div className="relative flex items-center space-x-4 rounded-xl border bg-background p-6 shadow-lg">
                      <Key className="h-10 w-10 text-primary" />
                      <div>
                        <h3 className="text-xl font-medium">The Passkar Promise</h3>
                        <p className="text-sm text-muted-foreground">Elegance, security, and peace of mind in one solution</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  More than just a password manager, Passkar represents my commitment to bringing a touch of tranquility 
                  to our increasingly complex digital lives. I hope it brings you as much relief and convenience as it has brought me.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter mb-8">Connect With Me</h2>
              <div className="flex justify-center space-x-6">
                <Link href="https://github.com" className="rounded-full bg-muted p-3 hover:bg-muted/80 transition-colors">
                  <Github className="h-6 w-6" />
                </Link>
                <Link href="https://linkedin.com" className="rounded-full bg-muted p-3 hover:bg-muted/80 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="https://twitter.com" className="rounded-full bg-muted p-3 hover:bg-muted/80 transition-colors">
                  <Twitter className="h-6 w-6" />
                </Link>
              </div>
              <div className="mt-12">
                <Link href="/">
                  <Button size="lg" className="mx-auto">
                    Back to Home
                  </Button>
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
  )
}