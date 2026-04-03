import { videoCategories } from "@/data/videos";
import type { VideoItem } from "@/types/video";
import { VideoCard } from "@/components/body-signs/VideoCard";
import { Reveal } from "@/components/common/Reveal";

interface VideoGridProps {
  videos: VideoItem[];
  onOpenVideo: (video: VideoItem) => void;
}

export function VideoGrid({ videos, onOpenVideo }: VideoGridProps) {
  const groupedVideos = videoCategories
    .map((category) => ({
      category,
      videos: videos.filter((video) => video.category === category),
    }))
    .filter((group) => group.videos.length > 0);

  return (
    <div className="flex flex-col gap-[80px]">
      {groupedVideos.map((group, groupIndex) => (
        <section key={group.category} className="w-full">
          <Reveal delay={groupIndex * 0.04}>
            <div className="mb-[28px]">
              <h2 className="font-['Poppins'] text-[34px] font-bold text-[#222222] md:text-[40px]">
                {group.category}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-[42px] md:grid-cols-2 2xl:grid-cols-3">
            {group.videos.map((video, index) => (
              <Reveal key={video.id} delay={index * 0.05}>
                <VideoCard video={video} onOpen={onOpenVideo} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}