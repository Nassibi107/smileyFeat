"use client";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const phases = [
  {
    number: "01",
    title: "Strategic Audit",
    timeline: "Week 1–2",
    deliverables: ["Revenue gap analysis", "Systems audit report", "Growth opportunity map", "Priority infrastructure plan"],
    transformation: "From guessing to data-driven clarity.",
  },
  {
    number: "02",
    title: "Infrastructure Build",
    timeline: "Week 3–6",
    deliverables: ["Acquisition system setup", "CRM infrastructure", "Conversion funnel design", "SOP documentation framework"],
    transformation: "From chaos to a structured operating system.",
  },
  {
    number: "03",
    title: "Revenue Expansion",
    timeline: "Week 7–10",
    deliverables: ["Growth engine activation", "Marketing automation", "Sales pipeline optimization", "Revenue forecasting model"],
    transformation: "From inconsistent revenue to predictable growth.",
  },
  {
    number: "04",
    title: "Optimization & Control",
    timeline: "Ongoing",
    deliverables: ["KPI dashboard deployment", "Weekly performance reviews", "System refinements", "Expansion strategy execution"],
    transformation: "From reactive to proactive revenue management.",
  },
];

export default function InfrastructurePage() {
  return (
    <main className="bg-[#0B0B0F] min-h-screen">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-6"
          >
            The Operating System Behind{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
              Scalable Companies.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#B5B5C3] text-lg"
          >
            The SMILEY Revenue Engine™ — Four phases. Total transformation.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border border-[#1F1F28] hover:border-[#7A5CFF]/40 rounded-2xl p-8 transition-colors"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="text-[#7A5CFF]/30 font-extrabold text-6xl leading-none">{phase.number}</div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h2 className="text-white font-extrabold text-2xl">Phase {phase.number} — {phase.title}</h2>
                    <span className="bg-[#7A5CFF]/10 border border-[#7A5CFF]/30 rounded-full px-3 py-1 text-[#9C7CFF] text-xs font-semibold">
                      {phase.timeline}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-[#B5B5C3] text-xs font-semibold uppercase tracking-wider mb-2">Deliverables</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phase.deliverables.map((d, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7A5CFF]" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-[#1F1F28] pt-4">
                    <p className="text-[#9C7CFF] font-semibold text-sm">{phase.transformation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
