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
    <section className="py-32 px-6 bg-[#0B0B0F]">
      <div className="max-w-3xl mx-auto text-center">
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
