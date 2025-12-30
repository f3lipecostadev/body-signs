import React from "react"
import { Video } from "../types"

interface VideoCardProps {
  video: Video
  onWatchClick: () => void
}

export default function VideoCard({ video, onWatchClick }: VideoCardProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "iniciante": return "#4CAF50"
      case "intermediário": return "#FF9800"
      case "avançado": return "#F44336"
      default: return "#666"
    }
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
      
      <div className="relative overflow-hidden h-44 bg-gray-200">
        <img 
          src={video.thumbnail} 
          alt={`Vídeo demonstrando o sinal de ${video.title} em Libras`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        <div 
          onClick={onWatchClick}
          role="button"
          aria-label={`Assistir ${video.title}`}
          className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-2xl text-[var(--primary-color)] scale-90 transition-transform hover:scale-100 pointer-events-none">▶</div>
        </div>

        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs font-semibold rounded">
          {video.duration}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-lg font-bold flex-1">{video.title}</h3>
          <div className="px-2 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: getLevelColor(video.level) }}>
            {video.level}
          </div>
        </div>
        <p className="text-gray-600 text-sm flex-1">{video.description}</p>
        <div className="flex gap-4 mt-auto text-gray-500 text-xs">
          <div className="flex items-center gap-1"><span>⏱️</span>{video.duration}</div>
          <div className="flex items-center gap-1"><span>📊</span>{video.level}</div>
        </div>
      </div>
    </div>
  )
}
