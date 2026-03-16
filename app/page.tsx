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

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function getPublicContent() {
  try {
    const response = await fetch(`${API_BASE}/content/public`, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch {
    return null;
  }
}

export default async function Home() {
  const content = await getPublicContent();
  const site = content?.site;
  const team = Array.isArray(content?.team) ? content.team : undefined;

  return (
    <main>
      <Hero title={site?.heroTitle} subtitle={site?.heroSubtitle} />
      <Dashboard />
      <RealityCheck />
      <Positioning />
      <ClientTypes />
      <RevenueEngine />
      <div id="team">
        <OurTeam teamMembers={team} />
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
