import Hero from "@/components/Hero";
import RealityCheck from "@/components/RealityCheck";
import Positioning from "@/components/Positioning";
import ClientTypes from "@/components/ClientTypes";
import RevenueEngine from "@/components/RevenueEngine";
import WhySmiley from "@/components/WhySmiley";
import CaseStudies from "@/components/CaseStudies";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <RealityCheck />
      <Positioning />
      <ClientTypes />
      <RevenueEngine />
      <WhySmiley />
      <CaseStudies />
      <FinalCTA />
      <Footer />
    </main>
  );
}
