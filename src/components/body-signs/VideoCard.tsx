import { useRef, useState } from "react";
import { Play } from "lucide-react";
import type { VideoItem } from "@/types/video";

interface VideoCardProps {
  video: VideoItem;
  onOpen: (video: VideoItem) => void;
}

export function VideoCard({ video, onOpen }: VideoCardProps) {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsPlayingPreview(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsPlayingPreview(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <article
      className="w-full cursor-pointer rounded-[24px] bg-[#f6f6f6] p-5 transition duration-200 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)] lg:p-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(video)}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-[#dddddd] shadow-[0_6px_18px_rgba(0,0,0,0.10)]">
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`block h-full w-full object-cover transition duration-200 ${
            isPlayingPreview ? "opacity-0" : "opacity-100"
          }`}
        />

        <video
          ref={videoRef}
          src={video.video}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute left-0 top-0 h-full w-full object-cover transition duration-200 ${
            isPlayingPreview ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="inline-flex h-[68px] w-[68px] items-center justify-center rounded-full bg-black/45 text-white shadow-lg backdrop-blur-sm">
            <Play size={28} fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-[8px] flex items-start justify-between gap-4">
          <div>
            <h3 className="mb-[4px] text-[20px] leading-[1.35] font-bold text-[#333333]">
              {video.title}
            </h3>
          </div>

          {video.duration ? (
            <span className="whitespace-nowrap text-[16px] text-[#8a8a8a]">
              {video.duration}
            </span>
          ) : null}
        </div>

        <p className="line-clamp-2 text-[16px] leading-[1.5] text-[#8f8f8f]">
          {video.description}
        </p>
      </div>
    </article>
  );
}
