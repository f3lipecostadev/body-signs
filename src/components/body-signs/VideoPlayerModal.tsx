import { X } from "lucide-react";
import type { VideoItem } from "@/types/video";

interface VideoPlayerModalProps {
  video: VideoItem | null;
  open: boolean;
  onClose: () => void;
}

export function VideoPlayerModal({
  video,
  open,
  onClose,
}: VideoPlayerModalProps) {
  if (!open || !video) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-[101] w-full max-w-[1350px] rounded-[34px] bg-gradient-to-b from-white to-[#f9f9ff] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-7">
        <div className="mb-5 flex items-start justify-between gap-5">
          <div className="min-w-0">
            <h2 className="truncate text-[24px] font-bold text-[#111111] md:text-[28px]">
              {video.title}
            </h2>

            <p className="mt-2 text-[16px] leading-[1.6] text-[#555555] md:text-[18px]">
              {video.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#f1f1f1] text-[#3C32AF] shadow-md transition duration-200 hover:bg-[#e7e7e7]"
            aria-label="Fechar vídeo"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-hidden rounded-[24px] bg-black shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
          <div className="aspect-video w-full">
            <video
              key={video.id}
              src={video.video}
              poster={video.thumbnail}
              controls
              autoPlay
              playsInline
              className="h-full w-full"
            >
              Não foi possível carregar este vídeo.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
