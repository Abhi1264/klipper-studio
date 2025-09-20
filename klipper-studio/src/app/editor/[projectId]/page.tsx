"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Music, Play, Pause, Square, Upload, Download, ZoomIn, ZoomOut, Maximize, Save, Undo, Redo, Scissors, Copy, Trash2 } from "lucide-react"
import { useSession } from "@/lib/auth/client"
import { useAudioStore } from "@/lib/stores/audio-store"

export default function EditorPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const projectId = params.projectId as string
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodesRef = useRef<AudioBufferSourceNode[]>([])
  
  const [projectName, setProjectName] = useState("Untitled Project")
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState("mp3")
  
  const {
    clips,
    isPlaying,
    currentTime,
    duration,
    selection,
    zoomLevel,
    masterVolume,
    addClip,
    setPlaying,
    setCurrentTime,
    setDuration,
    setSelection,
    setZoomLevel,
    setMasterVolume,
    saveToHistory,
    clearAll
  } = useAudioStore()

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  // Handle file import
  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const audioContext = audioContextRef.current
    if (!audioContext) return

    for (const file of Array.from(files)) {
      try {
        const arrayBuffer = await file.arrayBuffer()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        
        const clip = {
          id: `${file.name}-${Date.now()}`,
          buffer: audioBuffer,
          startTime: clips.length > 0 ? clips[clips.length - 1].endTime : 0,
          endTime: clips.length > 0 ? clips[clips.length - 1].endTime + audioBuffer.duration : audioBuffer.duration,
          name: file.name
        }
        
        addClip(clip)
        saveToHistory()
      } catch (error) {
        console.error('Error loading audio file:', error)
        alert(`Error loading ${file.name}: ${error}`)
      }
    }
  }

  // Handle playback
  const handlePlayPause = () => {
    if (isPlaying) {
      // Stop playback
      sourceNodesRef.current.forEach(node => {
        try {
          node.stop()
        } catch (e) {
          // Node might already be stopped
        }
      })
      sourceNodesRef.current = []
      setPlaying(false)
    } else {
      // Start playback
      if (clips.length === 0) return
      
      const audioContext = audioContextRef.current
      if (!audioContext) return

      sourceNodesRef.current = []
      let startTime = audioContext.currentTime

      clips.forEach(clip => {
        const source = audioContext.createBufferSource()
        source.buffer = clip.buffer
        source.connect(audioContext.destination)
        source.start(startTime + clip.startTime)
        sourceNodesRef.current.push(source)
      })

      setPlaying(true)
      
      // Update current time
      const updateTime = () => {
        if (isPlaying) {
          const elapsed = audioContext.currentTime - startTime
          setCurrentTime(Math.min(elapsed, duration))
          requestAnimationFrame(updateTime)
        }
      }
      updateTime()
    }
  }

  // Handle stop
  const handleStop = () => {
    sourceNodesRef.current.forEach(node => {
      try {
        node.stop()
      } catch (e) {
        // Node might already be stopped
      }
    })
    sourceNodesRef.current = []
    setPlaying(false)
    setCurrentTime(0)
  }

  // Handle export
  const handleExport = async () => {
    if (clips.length === 0) {
      alert("No audio clips to export")
      return
    }

    // For now, we'll just show an alert
    // In a real implementation, this would combine all clips and export in the selected format
    alert(`Exporting as ${exportFormat.toUpperCase()}... (This would be implemented with actual audio processing)`)
    setIsExportDialogOpen(false)
  }

  // Handle canvas click for selection
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const time = (x / canvas.width) * duration

    setSelection({ startTime: time, endTime: time + 1 }) // 1 second selection
  }

  // Render waveform
  const renderWaveform = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    // Draw waveform
    ctx.fillStyle = '#3b82f6'
    clips.forEach(clip => {
      const startX = (clip.startTime / duration) * canvas.offsetWidth
      const width = ((clip.endTime - clip.startTime) / duration) * canvas.offsetWidth
      ctx.fillRect(startX, 0, width, canvas.offsetHeight)
    })

    // Draw playhead
    if (duration > 0) {
      const playheadX = (currentTime / duration) * canvas.offsetWidth
      ctx.strokeStyle = '#ef4444'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(playheadX, 0)
      ctx.lineTo(playheadX, canvas.offsetHeight)
      ctx.stroke()
    }

    // Draw selection
    if (selection) {
      const startX = (selection.startTime / duration) * canvas.offsetWidth
      const endX = (selection.endTime / duration) * canvas.offsetWidth
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.fillRect(startX, 0, endX - startX, canvas.offsetHeight)
    }
  }

  // Render waveform when clips or currentTime changes
  useEffect(() => {
    renderWaveform()
  }, [clips, currentTime, selection, duration])

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
    router.push('/sign-in')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>
              <Music className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Button>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="text-xl font-bold bg-transparent border-none outline-none"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-green-600">● Saved</span>
            <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Export Audio</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Export Format</label>
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      <option value="mp3">MP3</option>
                      {(session.user as any).subscription === 'pro' && (
                        <>
                          <option value="wav">WAV</option>
                          <option value="aac">AAC</option>
                          <option value="m4a">M4A</option>
                        </>
                      )}
                    </select>
                  </div>
                  <Button onClick={handleExport} className="w-full">
                    Export Audio
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Import Audio
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="audio/*"
              onChange={handleFileImport}
              className="hidden"
            />
            
            <div className="h-6 w-px bg-border" />
            
            <Button variant="outline" size="sm">
              <Undo className="h-4 w-4 mr-2" />
              Undo
            </Button>
            <Button variant="outline" size="sm">
              <Redo className="h-4 w-4 mr-2" />
              Redo
            </Button>
            
            <div className="h-6 w-px bg-border" />
            
            <Button variant="outline" size="sm">
              <Scissors className="h-4 w-4 mr-2" />
              Cut
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm">
              Paste
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <main className="flex-1 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border min-h-[400px]">
          {/* Waveform Canvas */}
          <div className="p-4">
            <canvas
              ref={canvasRef}
              className="w-full h-32 border border-border rounded cursor-pointer"
              onClick={handleCanvasClick}
            />
          </div>
          
          {/* Transport Controls */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button onClick={handlePlayPause} size="sm">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button onClick={handleStop} variant="outline" size="sm">
                  <Square className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Volume:</span>
                  <Slider
                    value={[masterVolume]}
                    onValueChange={(value) => setMasterVolume(value[0])}
                    max={1}
                    min={0}
                    step={0.01}
                    className="w-24"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => setZoomLevel(zoomLevel * 0.8)}>
                  <ZoomOut className="h-4 w-4 mr-2" />
                  Zoom Out
                </Button>
                <Button variant="outline" size="sm" onClick={() => setZoomLevel(zoomLevel * 1.2)}>
                  <ZoomIn className="h-4 w-4 mr-2" />
                  Zoom In
                </Button>
                <Button variant="outline" size="sm" onClick={() => setZoomLevel(1)}>
                  <Maximize className="h-4 w-4 mr-2" />
                  Fit
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project Info */}
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Clips: {clips.length} | Duration: {duration.toFixed(2)}s | Current Time: {currentTime.toFixed(2)}s</p>
        </div>
      </main>
    </div>
  )
}