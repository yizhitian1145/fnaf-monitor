'use client'

import { useState, useEffect } from 'react'

interface TypewriterEffectProps {
  text: string
  className?: string
}

export default function TypewriterEffect({ text, className = '' }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, 100)

    return () => clearInterval(typingEffect)
  }, [text])

  return <div className={className}>{displayText}</div>
}

