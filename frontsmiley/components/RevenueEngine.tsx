"use client";
import { motion } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Audit & Strategic Architecture",
    desc: "Deep-dive into your current systems, identifying revenue leaks, operational gaps, and growth opportunities.",
  },
  {
    number: "02",
    title: "Infrastructure Build",
    desc: "We design and install custom acquisition systems, conversion funnels, and operational workflows tailored to your business.",
  },
  {
    number: "03",
    title: "Revenue Expansion",
    desc: "Activate growth engines, optimize customer acquisition costs, and scale proven revenue channels.",
  },
  {
    number: "04",
    title: "Optimization & Control",
    desc: "Continuous monitoring, KPI tracking, and systematic improvements to maintain peak performance.",
  },
];

export default function RevenueEngine() {
  return (
    <section className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            The System Behind{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
              The Scale.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative bg-[#0E0E14] border border-[#1F1F28] hover:border-[#7A5CFF]/50 rounded-2xl p-8 transition-colors"
            >
              <div className="text-[#7A5CFF]/30 font-extrabold text-5xl mb-4">{phase.number}</div>
              <h3 className="text-white font-bold text-lg mb-3">{phase.title}</h3>
              <p className="text-[#B5B5C3] text-sm leading-relaxed">{phase.desc}</p>
              {i < phases.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-[#7A5CFF]/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
