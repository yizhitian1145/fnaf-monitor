'use client'

import { useState } from 'react'
import StartScreen from '@/components/StartScreen'
import Monitor from '@/components/Monitor'

export default function Home() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [customImages, setCustomImages] = useState<string[]>([])

  const handleStartMonitoring = () => {
    setIsMonitoring(true)
  }

  const handleCustomImages = (images: string[]) => {
    setCustomImages(images)
  }

  return (
    <main className="h-screen w-screen bg-black">
      {isMonitoring ? (
        <Monitor customImages={customImages} />
      ) : (
        <StartScreen onStart={handleStartMonitoring} onCustomImages={handleCustomImages} />
      )}
    </main>
  )
}

