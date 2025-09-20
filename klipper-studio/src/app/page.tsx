import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Music, Mic, Headphones, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Klipper Studio</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Professional Audio Editing
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create, edit, and export professional-quality audio tracks with our intuitive web-based editor. 
            No software installation required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Creating Now
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mt-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Powerful Features</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create professional audio content
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
              <Mic className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Multi-Track Editing</h4>
              <p className="text-muted-foreground">
                Import multiple audio files and arrange them on a visual timeline for precise editing.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
              <Headphones className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Real-time Playback</h4>
              <p className="text-muted-foreground">
                Listen to your edits in real-time with synchronized playback and visual feedback.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Professional Export</h4>
              <p className="text-muted-foreground">
                Export your finished tracks in multiple formats including MP3, WAV, AAC, and M4A.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24 text-center">
          <div className="bg-primary/10 rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Creating?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators who trust Klipper Studio for their audio editing needs.
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Music className="h-6 w-6 text-primary" />
              <span className="font-semibold">Klipper Studio</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Klipper Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
