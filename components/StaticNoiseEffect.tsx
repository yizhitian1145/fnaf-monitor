'use client'

import { useEffect, useRef } from 'react'

interface StaticNoiseEffectProps {
  strong?: boolean
}

export default function StaticNoiseEffect({ strong = false }: StaticNoiseEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let frameCount = 0
    const scanLineHeight = 2
    const waveFrequency = 0.05
    const waveAmplitude = 5

    function drawGlitch() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = `rgba(0, 0, 0, ${strong ? 0.3 : 0.1})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw scan lines
      for (let y = 0; y < canvas.height; y += scanLineHeight * 2) {
        const offset = Math.sin(y * waveFrequency + frameCount * 0.1) * waveAmplitude
        ctx.fillStyle = `rgba(255, 255, 255, ${strong ? Math.random() * 0.5 : Math.random() * 0.2})`
        ctx.fillRect(offset, y, canvas.width, scanLineHeight)
      }

      // Draw vertical glitch bands
      if (Math.random() < (strong ? 0.2 : 0.05)) {
        const numBands = Math.floor(Math.random() * 3) + 1
        for (let i = 0; i < numBands; i++) {
          const x = Math.random() * canvas.width
          const width = Math.random() * 100 + 50
          ctx.fillStyle = `rgba(255, 255, 255, ${strong ? Math.random() * 0.7 : Math.random() * 0.3})`
          ctx.fillRect(x, 0, width, canvas.height)
        }
      }

      frameCount++
    }

    function animate() {
      drawGlitch()
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [strong])

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none mix-blend-screen" />
}

