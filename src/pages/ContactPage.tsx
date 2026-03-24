import { MainLayout } from "@/components/layout/MainLayout";
import { ContactForm } from "@/components/contact/ContactForm";

export function ContactPage() {
  return (
    <MainLayout>
      <section className="mx-auto mt-[90px] mb-[120px] max-w-[1700px] px-[60px]">
        <ContactForm />
      </section>
    </MainLayout>
  );
}