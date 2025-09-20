"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Music, Plus, FolderOpen, User, LogOut } from "lucide-react"
import { useSession, signOut } from "@/lib/auth/client"

export default function DashboardPage() {
  const { data: session, isPending } = useSession()
  const [projects] = useState([
    { id: "1", name: "My First Project", createdAt: "2024-01-15", updatedAt: "2024-01-20" },
    { id: "2", name: "Podcast Episode 1", createdAt: "2024-01-10", updatedAt: "2024-01-18" },
  ])

  const handleSignOut = async () => {
    await signOut()
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">You need to be signed in to access the dashboard.</p>
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Klipper Studio</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">{session.user.name || session.user.email}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Your Projects</h2>
            <p className="text-muted-foreground">
              Create and manage your audio editing projects
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/editor/${project.id}`}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <FolderOpen className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Last updated {new Date(project.updatedAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first project to start editing audio
            </p>
            <Button className="flex items-center space-x-2 mx-auto">
              <Plus className="h-4 w-4" />
              <span>Create Project</span>
            </Button>
          </div>
        )}

        {/* Subscription Status */}
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Subscription Status</h3>
              <p className="text-muted-foreground">
                Current plan: <span className="font-medium capitalize">{(session.user as any).subscription || 'free'}</span>
              </p>
            </div>
            {(session.user as any).subscription === 'free' && (
              <Link href="/pricing">
                <Button variant="outline">Upgrade to Pro</Button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}