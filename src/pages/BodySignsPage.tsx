import { MainLayout } from "@/components/layout/MainLayout";
import { VideoSearchSection } from "@/components/body-signs/VideoSearchSection";

export function BodySignsPage() {
  return (
    <MainLayout>
      <section className="mx-auto my-[100px] max-w-[1700px] px-[60px]">
        <VideoSearchSection />
      </section>
    </MainLayout>
  );
}