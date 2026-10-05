import { MainLayout } from "@/components/layout/MainLayout";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeTopics } from "@/components/home/HomeTopics";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeCTA } from "@/components/home/HomeCTA";

export function HomePage() {
  return (
    <MainLayout showHeader={false}>
      <HomeHero />
      <HomeTopics />
      <HomeAbout />
      <HomeCTA />
    </MainLayout>
  );
}