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
    <section className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28]">
      <div className="max-w-5xl mx-auto">
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
