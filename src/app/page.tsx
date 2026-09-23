import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { PromoBanner } from "@/components/PromoBanner";
import { Questionnaire } from "@/components/Questionnaire";
import { SourcesSection } from "@/components/SourcesSection";

export default function Home() {
  return (
    <main className="page-shell">
      <Hero />
      <Questionnaire />
      <PromoBanner />
      <HowItWorks />
      <SourcesSection />
      <Footer />
    </main>
  );
}
