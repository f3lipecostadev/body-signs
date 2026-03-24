import { MainLayout } from "@/components/layout/MainLayout";
import { GamesSection } from "@/components/games/GamesSection";

export function GamesPage() {
  return (
    <MainLayout>
      <section className="mx-auto my-[100px] max-w-[1700px] px-[60px]">
        <GamesSection />
      </section>
    </MainLayout>
  );
}