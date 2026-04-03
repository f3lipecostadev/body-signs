import { MainLayout } from "@/components/layout/MainLayout";
import { ContactHero } from "@/components/contact/ContactHero";
import { TeamSection } from "@/components/contact/TeamSection";

export function ContactPage() {
  return (
    <MainLayout showHeader={false}>
      <ContactHero />
      <TeamSection />
    </MainLayout>
  );
}