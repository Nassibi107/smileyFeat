import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import RealityCheck from "@/components/RealityCheck";
import Positioning from "@/components/Positioning";
import ClientTypes from "@/components/ClientTypes";
import RevenueEngine from "@/components/RevenueEngine";
import OurTeam from "@/components/OurTeam";
import Partnerships from "@/components/Partnerships";
import WhySmiley from "@/components/WhySmiley";
import CaseStudies from "@/components/CaseStudies";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Dashboard />
      <RealityCheck />
      <Positioning />
      <ClientTypes />
      <RevenueEngine />
      <div id="team">
        <OurTeam />
      </div>
      <div id="partners">
        <Partnerships />
      </div>
      <WhySmiley />
      <CaseStudies />
      <FinalCTA />
      <Footer />
    </main>
  );
}
