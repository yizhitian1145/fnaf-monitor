'use client'

import { useState } from 'react'
import { Settings } from 'lucide-react'
import TypewriterEffect from './TypewriterEffect'
import StaticNoiseEffect from './StaticNoiseEffect'

interface StartScreenProps {
  onStart: () => void
  onCustomImages: (images: string[]) => void
}

export default function StartScreen({ onStart, onCustomImages }: StartScreenProps) {
  const [showSettings, setShowSettings] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleCustomImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      if (files.length > 10) {
        setErrorMessage('最多只能上传10张图片')
        return
      }
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file))
      onCustomImages(imageUrls)
      setErrorMessage('')
    }
  }

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      <StaticNoiseEffect />
      <div className="relative z-20">
        <TypewriterEffect 
          text="Five Nights at Freddy's 模拟监控画面" 
          className="text-white text-3xl md:text-4xl mb-8 font-mono"
        />
        <button
          onClick={onStart}
          className="mx-auto block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg
                   transition-colors duration-200 font-mono text-lg"
        >
          开始查看监控
        </button>
      </div>
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="absolute top-4 right-4 text-white z-20 hover:text-gray-300 transition-colors duration-200"
      >
        <Settings size={24} />
      </button>
      {showSettings && (
        <div className="absolute top-16 right-4 bg-black/80 backdrop-blur p-4 rounded-lg shadow-lg z-20 border border-gray-800">
          <a
            href="https://github.com/yizhitian1145/fnaf-monitor"
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-4 text-white hover:text-gray-300 transition-colors duration-200 font-mono"
          >
            GitHub 项目地址
          </a>
          <label className="block text-white hover:text-gray-300 cursor-pointer transition-colors duration-200 font-mono">
            自定义监控画面图片 (最多10张)
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleCustomImages}
              className="hidden"
            />
          </label>
          {errorMessage && (
            <p className="text-red-500 mt-2 font-mono text-sm">{errorMessage}</p>
          )}
        </div>
      )}
    </div>
  )
}

