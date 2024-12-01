'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import StaticNoiseEffect from './StaticNoiseEffect'

const DEFAULT_AREAS = Array(10).fill('/placeholder.svg?height=720&width=1280')

interface MonitorProps {
  customImages?: string[]
}

export default function Monitor({ customImages = [] }: MonitorProps) {
  const [areas, setAreas] = useState(customImages.length > 0 ? customImages : DEFAULT_AREAS)
  const [currentArea, setCurrentArea] = useState(0)
  const [showStrongNoise, setShowStrongNoise] = useState(false)

  useEffect(() => {
    if (showStrongNoise) {
      const timer = setTimeout(() => setShowStrongNoise(false), 500)
      return () => clearTimeout(timer)
    }
  }, [showStrongNoise])

  const handleAreaChange = (index: number) => {
    setShowStrongNoise(true)
    setCurrentArea(index)
  }

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={areas[currentArea]}
          alt={`Camera ${currentArea + 1}`}
          fill
          className="object-contain animate-pan-image"
          priority
        />
      </div>
      <StaticNoiseEffect strong={showStrongNoise} />
      <div className="absolute bottom-4 right-4 grid grid-cols-5 gap-2 z-20">
        {areas.map((_, index) => (
          <button
            key={index}
            onClick={() => handleAreaChange(index)}
            className="w-12 h-12 bg-gray-800/50 backdrop-blur border border-gray-600 hover:bg-gray-700/50 
                     focus:outline-none focus:ring-2 focus:ring-gray-500 text-white font-mono text-sm"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

