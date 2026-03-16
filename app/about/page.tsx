"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const fallbackTeam = [
  {
    name: "Yassine Nassibi",
    role: "Founder & CEO",
    desc: "Revenue Architecture & Business Strategy",
    initials: "AR",
    imageUrl: "",
  },
  {
    name: "Sarah Chen",
    role: "Head of Growth",
    desc: "Acquisition Systems & Funnel Strategy",
    initials: "JC",
    imageUrl: "",
  },
  {
    name: "Marcus Webb",
    role: "Operations Architect",
    desc: "Process Automation & SOP Design",
    initials: "MW",
    imageUrl: "",
  },
  {
    name: "Amira Hassan",
    role: "Head of Analytics",
    desc: "Revenue Intelligence & KPI Systems",
    initials: "SL",
    imageUrl: "",
  },
  {
    name: "David Park",
    role: "CTO",
    desc: "Automation & CRM Architecture",
    initials: "DP",
    imageUrl: "",
  },
];

const fallbackAbout = {
  title: "Infrastructure Over Guesswork.",
  paragraph:
    "SMILEY partners with founders who are done with unpredictable growth. We install operating systems for acquisition, client delivery, and financial visibility so every month is driven by decisions, not firefighting.",
  highlights: [
    "From disconnected tools to one operating rhythm across teams.",
    "From manual handoffs to documented workflows and clear ownership.",
    "From vanity metrics to decision-ready dashboards tied to revenue.",
  ],
};

export default function AboutPage() {
  const [about, setAbout] = useState(fallbackAbout);
  const [team, setTeam] = useState(fallbackTeam);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch(`${API_BASE}/content/public`, { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        if (!active) {
          return;
        }

        if (payload?.site) {
          setAbout({
            title: payload.site.aboutTitle || fallbackAbout.title,
            paragraph: payload.site.aboutParagraph || fallbackAbout.paragraph,
            highlights: Array.isArray(payload.site.aboutHighlights) && payload.site.aboutHighlights.length > 0
              ? payload.site.aboutHighlights
              : fallbackAbout.highlights,
          });
        }

        if (Array.isArray(payload?.team) && payload.team.length > 0) {
          const apiTeam = payload.team;
          setTeam(
            apiTeam.map((member: {
              name: string;
              role: string;
              specialty: string;
              imageUrl?: string | null;
            }) => ({
              name: member.name,
              role: member.role,
              desc: member.specialty,
              initials: member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase(),
              imageUrl: member.imageUrl || "",
            })),
          );
        }
      } catch {
        // Keep fallback content when API is unavailable.
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const highlightRows = useMemo(() => about.highlights.slice(0, 4), [about.highlights]);
  const titleParts = useMemo(() => {
    const words = about.title.trim().split(/\s+/).filter(Boolean);
    if (words.length <= 1) {
      return { head: about.title, tail: "" };
    }
    return {
      head: words.slice(0, -1).join(" "),
      tail: words[words.length - 1],
    };
  }, [about.title]);

  return (
    <main className="bg-[#0B0B0F] min-h-screen">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-8"
          >
            {titleParts.head}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
              {titleParts.tail}
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 text-[#B5B5C3] text-lg"
          >
            <p>{about.paragraph}</p>
            <div className="space-y-2 pl-4 border-l border-[#7A5CFF]/30">
              {highlightRows.map((highlight) => (
                <p key={highlight} className="text-white font-semibold">{highlight}</p>
              ))}
            </div>
            <p>We replace noise with a clear operating cadence that leadership can trust.</p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-extrabold text-white mb-12 text-center"
          >
            The Team
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-[#0E0E14] border border-[#1F1F28] hover:border-[#7A5CFF]/40 rounded-2xl p-8 text-center transition-colors"
              >
                {member.imageUrl ? (
                  <img src={member.imageUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border border-[#2A2A35]" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7A5CFF] to-[#9C7CFF] flex items-center justify-center text-white font-extrabold text-xl mx-auto mb-4">
                    {member.initials}
                  </div>
                )}
                <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-[#7A5CFF] text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-[#B5B5C3] text-sm">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
