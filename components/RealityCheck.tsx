"use client";
import { motion } from "framer-motion";

const items = [
  "Revenue goes up. Stress goes up faster.",
  "Marketing disconnected from sales.",
  "Manual operations.",
  "No dashboards.",
  "No clarity on profit.",
  "No scalability.",
];

export default function RealityCheck() {
  return (
    <section className="py-32 px-6 bg-[#0B0B0F] relative overflow-hidden">
      {/* Cracked glass / shattered grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,50,50,0.03)_25%,transparent_25%,transparent_50%,rgba(255,50,50,0.03)_50%,rgba(255,50,50,0.03)_75%,transparent_75%)] bg-[size:40px_40px]" />
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-red-500/10 blur-[150px]"
        />
        <motion.div
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[#7A5CFF]/10 blur-[120px]"
        />
      </div>
      {/* Animated warning stripes */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7A5CFF]/30 to-transparent" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
        >
          Most Companies Don&apos;t Have a Growth Problem.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
            They Have a Structure Problem.
          </span>
        </motion.h2>

        <div className="mt-12 space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center justify-center gap-3 text-[#B5B5C3] text-lg"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A5CFF] flex-shrink-0" />
              {item}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 border-t border-[#1F1F28] pt-12"
        >
          <p className="text-2xl font-bold text-white">
            That&apos;s not growth.
          </p>
          <p className="text-[#7A5CFF] text-xl font-semibold mt-2">
            That&apos;s controlled chaos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
