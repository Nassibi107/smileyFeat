"use client";
import { motion } from "framer-motion";

const clients = [
  {
    type: "Newborn Companies",
    stage: "0–12 Months",
    need: "Need foundation, brand clarity, and first customers.",
    weBuilds: ["Identity", "Positioning", "Revenue roadmap", "First acquisition engine", "Core operational systems"],
    result: "Structured launch instead of random trial and error.",
  },
  {
    type: "Companies That Started But Need to Scale",
    stage: "1–3 Years",
    need: "They have traction. But results are inconsistent.",
    weBuilds: ["Automation systems", "Growth engines", "CRM infrastructure", "Clear positioning", "SOP frameworks"],
    result: "Predictable revenue and operational control.",
  },
  {
    type: "Scaling Companies That Want to Dominate",
    stage: "3+ Years",
    need: "Strong base. Ambitious goals.",
    weBuilds: ["Full company audits", "Revenue restructuring", "Department KPIs", "Expansion strategy", "Executive dashboards"],
    result: "Aggressive scale with discipline.",
  },
];

export default function ClientTypes() {
  return (
    <section className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28] relative overflow-hidden">
      {/* Radial spotlight background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(122,92,255,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(156,124,255,0.06)_0%,transparent_50%)]" />
        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%] w-[200px] h-[200px] rounded-full bg-[#7A5CFF]/10 blur-[80px]"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -15, 0], opacity: [0.06, 0.15, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-1/4 right-[10%] w-[250px] h-[250px] rounded-full bg-[#9C7CFF]/10 blur-[80px]"
        />
        <motion.div
          animate={{ y: [-20, 20, -20], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-[#5B3FD9]/8 blur-[100px]"
        />
      </div>
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#7A5CFF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Who We Work With
          </h2>
          <p className="text-[#B5B5C3] text-lg">Every stage. One system.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-[#0E0E14] border border-[#1F1F28] hover:border-[#7A5CFF]/50 rounded-2xl p-8 transition-colors cursor-default"
            >
              <div className="inline-block bg-[#7A5CFF]/10 border border-[#7A5CFF]/30 rounded-full px-3 py-1 text-[#9C7CFF] text-xs font-semibold mb-4">
                {client.stage}
              </div>
              <h3 className="text-white font-extrabold text-xl mb-3">{client.type}</h3>
              <p className="text-[#B5B5C3] text-sm mb-6">{client.need}</p>
              
              <div className="mb-6">
                <p className="text-[#B5B5C3] text-xs font-semibold uppercase tracking-wider mb-3">We Build</p>
                <ul className="space-y-2">
                  {client.weBuilds.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white">
                      <span className="w-1 h-1 rounded-full bg-[#7A5CFF]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#1F1F28] pt-4">
                <p className="text-xs text-[#B5B5C3] font-semibold uppercase tracking-wider mb-1">Result</p>
                <p className="text-[#9C7CFF] text-sm font-semibold">{client.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
