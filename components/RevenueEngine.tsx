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
    <section className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28] relative overflow-hidden">
      {/* Circuit board / connection lines background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,92,255,0.06)_0%,transparent_70%)]" />
        {/* Animated connecting lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.line
            x1="10%" y1="20%" x2="90%" y2="20%"
            stroke="#7A5CFF" strokeWidth="0.5" strokeDasharray="8 8"
            animate={{ strokeDashoffset: [0, -16] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            opacity="0.1"
          />
          <motion.line
            x1="10%" y1="80%" x2="90%" y2="80%"
            stroke="#9C7CFF" strokeWidth="0.5" strokeDasharray="8 8"
            animate={{ strokeDashoffset: [0, 16] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            opacity="0.1"
          />
          <motion.line
            x1="50%" y1="0%" x2="50%" y2="100%"
            stroke="#7A5CFF" strokeWidth="0.5" strokeDasharray="6 12"
            animate={{ strokeDashoffset: [0, -18] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            opacity="0.06"
          />
        </svg>
        {/* Glow nodes at intersections */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[25%] w-3 h-3 rounded-full bg-[#7A5CFF] blur-[6px]"
        />
        <motion.div
          animate={{ scale: [1.5, 1, 1.5], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] right-[25%] w-3 h-3 rounded-full bg-[#9C7CFF] blur-[6px]"
        />
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] left-1/2 w-3 h-3 rounded-full bg-[#7A5CFF] blur-[6px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
