import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { videoCategories, videosData } from "@/data/videos";
import { normalizeText } from "@/lib/text";
import { VideoGrid } from "@/components/body-signs/VideoGrid";
import { VideoPlayerModal } from "@/components/body-signs/VideoPlayerModal";
import { Reveal } from "@/components/common/Reveal";
import type { VideoCategory, VideoItem } from "@/types/video";

const categories: Array<"Todos" | VideoCategory> = [
  "Todos",
  ...videoCategories,
];

function matchesProfessionalSearch(video: VideoItem, query: string) {
  const normalizedQuery = normalizeText(query).trim();

  if (!normalizedQuery) return true;

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  const searchableContent = normalizeText(
    [
      video.title,
      video.description,
      video.category,
      ...video.tags,
    ].join(" "),
  );

  return terms.every((term) => searchableContent.includes(term));
}

export function VideoSearchSection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<"Todos" | VideoCategory>("Todos");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredVideos = useMemo(() => {
    return videosData.filter((video) => {
      const matchesCategory =
        activeCategory === "Todos" || video.category === activeCategory;

      const matchesSearch = matchesProfessionalSearch(video, search);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <>
      <section className="flex flex-col items-center gap-[45px]">
        <Reveal className="w-full max-w-[800px]">
          <div className="flex h-[80px] w-full items-center gap-[15px] rounded-[30px] border border-[#d8d8d8] bg-[#f3f3f3] px-[25px]">
            <Search size={24} className="text-[#111111]" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar vídeos"
              className="w-full border-none bg-transparent text-[22px] outline-none placeholder:text-[#888888]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap justify-center gap-[22px]">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`cursor-pointer rounded-full border px-[24px] py-[12px] text-[18px] transition duration-200 hover:opacity-70 ${
                    isActive
                      ? "border-[#5142F7] text-[#5142F7]"
                      : "border-transparent text-[#333333]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="w-full">
          {filteredVideos.length > 0 ? (
            <VideoGrid
              videos={filteredVideos}
              onOpenVideo={(video) => setSelectedVideo(video)}
            />
          ) : (
            <Reveal delay={0.08}>
              <div className="rounded-[28px] bg-white px-8 py-16 text-center shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <h2 className="mb-3 font-['Poppins'] text-[30px] font-bold text-[#222222]">
                  Nenhum vídeo encontrado
                </h2>
                <p className="text-[18px] text-[#666666]">
                  Tente outro termo ou mude o tema selecionado.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <VideoPlayerModal
        video={selectedVideo}
        open={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
}