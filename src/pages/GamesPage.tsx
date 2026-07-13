import { MainLayout } from "@/components/layout/MainLayout";
import { GamesSection } from "@/components/games/GamesSection";

export function GamesPage() {
  return (
    <MainLayout>
      <section className="mx-auto my-16 max-w-[1700px] px-5 sm:px-8 md:my-20 lg:my-[100px] lg:px-[60px]">
        <GamesSection />
      </section>
    </MainLayout>
  );
}