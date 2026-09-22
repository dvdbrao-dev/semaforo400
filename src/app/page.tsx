import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Number400Notice } from "@/components/Number400Notice";
import { Questionnaire } from "@/components/Questionnaire";
import { SourcesSection } from "@/components/SourcesSection";

export default function Home() {
  return (
    <main className="page-shell">
      <Hero />
      <Questionnaire />
      <HowItWorks />
      <Number400Notice />
      <SourcesSection />
      <Footer />
    </main>
  );
}
