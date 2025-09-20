import { create } from 'zustand'
// AudioBuffer is available globally in browsers

export interface AudioClip {
  id: string
  buffer: AudioBuffer
  startTime: number
  endTime: number
  name: string
}

export interface Selection {
  startTime: number
  endTime: number
}

export interface AudioState {
  // Audio clips on the timeline
  clips: AudioClip[]
  
  // Playback state
  isPlaying: boolean
  currentTime: number
  duration: number
  
  // Selection state
  selection: Selection | null
  
  // Clipboard for cut/copy operations
  clipboard: AudioClip[]
  
  // History for undo/redo
  history: AudioClip[][]
  historyIndex: number
  
  // Zoom and view state
  zoomLevel: number
  scrollPosition: number
  
  // Master volume
  masterVolume: number
  
  // Actions
  addClip: (clip: AudioClip) => void
  removeClip: (id: string) => void
  updateClip: (id: string, updates: Partial<AudioClip>) => void
  
  setPlaying: (playing: boolean) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  
  setSelection: (selection: Selection | null) => void
  
  cut: () => void
  copy: () => void
  paste: (time: number) => void
  delete: () => void
  
  undo: () => void
  redo: () => void
  
  setZoomLevel: (level: number) => void
  setScrollPosition: (position: number) => void
  setMasterVolume: (volume: number) => void
  
  // Save current state to history
  saveToHistory: () => void
  
  // Clear all clips
  clearAll: () => void
}

export const useAudioStore = create<AudioState>((set, get) => ({
  // Initial state
  clips: [],
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  selection: null,
  clipboard: [],
  history: [[]],
  historyIndex: 0,
  zoomLevel: 1,
  scrollPosition: 0,
  masterVolume: 1,

  // Clip management
  addClip: (clip) => {
    set((state) => {
      const newClips = [...state.clips, clip].sort((a, b) => a.startTime - b.startTime)
      return { clips: newClips }
    })
  },

  removeClip: (id) => {
    set((state) => ({
      clips: state.clips.filter(clip => clip.id !== id)
    }))
  },

  updateClip: (id, updates) => {
    set((state) => ({
      clips: state.clips.map(clip => 
        clip.id === id ? { ...clip, ...updates } : clip
      )
    }))
  },

  // Playback controls
  setPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),

  // Selection
  setSelection: (selection) => set({ selection }),

  // Edit operations
  cut: () => {
    const { clips, selection } = get()
    if (!selection) return

    const selectedClips = clips.filter(clip => 
      clip.startTime < selection.endTime && clip.endTime > selection.startTime
    )
    
    set({ clipboard: selectedClips })
    get().delete()
  },

  copy: () => {
    const { clips, selection } = get()
    if (!selection) return

    const selectedClips = clips.filter(clip => 
      clip.startTime < selection.endTime && clip.endTime > selection.startTime
    )
    
    set({ clipboard: selectedClips })
  },

  paste: (time) => {
    const { clipboard } = get()
    if (clipboard.length === 0) return

    const newClips = clipboard.map(clip => ({
      ...clip,
      id: `${clip.id}-${Date.now()}`,
      startTime: time + (clip.startTime - clipboard[0].startTime),
      endTime: time + (clip.endTime - clipboard[0].startTime)
    }))

    set((state) => ({
      clips: [...state.clips, ...newClips].sort((a, b) => a.startTime - b.startTime)
    }))
  },

  delete: () => {
    const { clips, selection } = get()
    if (!selection) return

    const remainingClips = clips.filter(clip => 
      !(clip.startTime < selection.endTime && clip.endTime > selection.startTime)
    )
    
    set({ clips: remainingClips })
  },

  // History management
  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      set({ 
        clips: history[newIndex],
        historyIndex: newIndex
      })
    }
  },

  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      set({ 
        clips: history[newIndex],
        historyIndex: newIndex
      })
    }
  },

  saveToHistory: () => {
    const { clips, history, historyIndex } = get()
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...clips])
    
    set({ 
      history: newHistory,
      historyIndex: newHistory.length - 1
    })
  },

  // View controls
  setZoomLevel: (level) => set({ zoomLevel: Math.max(0.1, Math.min(10, level)) }),
  setScrollPosition: (position) => set({ scrollPosition: position }),
  setMasterVolume: (volume) => set({ masterVolume: Math.max(0, Math.min(1, volume)) }),

  // Clear all
  clearAll: () => {
    set({ 
      clips: [],
      selection: null,
      currentTime: 0,
      duration: 0
    })
  }
}))