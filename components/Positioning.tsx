"use client";
import { motion } from "framer-motion";

const systems = [
  { label: "Acquisition systems", desc: "Data-driven customer acquisition" },
  { label: "Conversion systems", desc: "Sales pipeline optimization" },
  { label: "Operational workflows", desc: "Systematic process automation" },
  { label: "Profit intelligence dashboards", desc: "Real-time revenue visibility" },
];

export default function Positioning() {
  return (
    <section className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28] relative overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(122,92,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(122,92,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(122,92,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(122,92,255,0.02)_1px,transparent_1px)] bg-[size:160px_160px]" />
        <motion.div
          animate={{ opacity: [0.05, 0.2, 0.05], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#7A5CFF]/8 blur-[130px]"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#9C7CFF]/8 blur-[100px]"
        />
      </div>
      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#7A5CFF]/10 rounded-tl-lg" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#7A5CFF]/10 rounded-br-lg" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            We Replace Chaos With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
              Infrastructure.
            </span>
          </h2>
          <p className="text-[#B5B5C3] text-lg max-w-2xl mx-auto">
            SMILEY designs and installs the operating systems behind scalable companies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systems.map((system, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="border border-[#1F1F28] hover:border-[#7A5CFF]/50 rounded-xl p-6 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#7A5CFF]" />
                <h3 className="text-white font-semibold text-lg group-hover:text-[#9C7CFF] transition-colors">
                  {system.label}
                </h3>
              </div>
              <p className="text-[#B5B5C3] text-sm pl-5">{system.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-white font-semibold text-xl">One structure.</p>
          <p className="text-[#9C7CFF] font-semibold text-xl">Total visibility.</p>
          <p className="text-white font-semibold text-xl">Controlled scale.</p>
        </motion.div>
      </div>
    </section>
  );
}
