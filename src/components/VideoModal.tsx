import { useEffect } from 'react'
import { Video } from '../types'

interface VideoModalProps {
  isOpen: boolean
  video: Video | null
  onClose: () => void
}

export default function VideoModal({
  isOpen,
  video,
  onClose
}: VideoModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !video) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[60%] max-w-[650px] flex-col items-center rounded-[14px] bg-white p-5
                   max-md:w-[90%]"
      >
        <button
          onClick={onClose}
          className="absolute top-[25px] right-[30px] flex h-9 w-9 items-center justify-center
                     rounded-full bg-white/85 text-[22px] font-bold text-gray-700
                     shadow-md transition-all duration-200
                     hover:scale-105 hover:bg-white
                     active:scale-95"
        >
          &times;
        </button>

        <video
          src={video.videoSrc}
          controls
          autoPlay
          className="h-[360px] w-full rounded-lg bg-black object-contain max-md:h-[250px]"
        />

        <h3 className="mt-3 text-xl font-bold text-gray-800">
          {video.title}
        </h3>

        <p className="mt-1 text-center text-sm text-gray-600">
          {video.description}
        </p>
      </div>
    </div>
  )
}
