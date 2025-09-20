import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Music, Check, Zap } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Klipper Studio</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
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

      {/* Pricing Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-xl text-muted-foreground">
            Start free and upgrade when you need more power
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-4xl font-bold mb-2">$0</p>
              <p className="text-muted-foreground">Perfect for getting started</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>1 Project</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Up to 5 audio file imports per project</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>10-minute max total audio length</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>MP3 export only</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Basic editing tools</span>
              </li>
            </ul>
            
            <Link href="/sign-up">
              <Button className="w-full" variant="outline">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border-2 border-primary relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>Most Popular</span>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-4xl font-bold mb-2">$10</p>
              <p className="text-muted-foreground">per month</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Unlimited Projects</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Unlimited audio file imports</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>90-minute max audio length</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>MP3, AAC, M4A & WAV export</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Advanced editing tools</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Priority support</span>
              </li>
            </ul>
            
            <Button className="w-full" onClick={() => {
              // This will be implemented with Stripe integration
              alert('Stripe checkout will be implemented here')
            }}>
              Upgrade to Pro
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Can I cancel my subscription anytime?</h4>
              <p className="text-muted-foreground">
                Yes, you can cancel your Pro subscription at any time. You'll continue to have access to Pro features until the end of your billing period.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">What audio formats are supported?</h4>
              <p className="text-muted-foreground">
                We support importing MP3, WAV, AAC, and M4A files. Export formats depend on your subscription plan.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-2">Is my data secure?</h4>
              <p className="text-muted-foreground">
                Absolutely. All your audio files and projects are encrypted and stored securely. We never share your data with third parties.
              </p>
            </div>
          </div>
        </div>
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