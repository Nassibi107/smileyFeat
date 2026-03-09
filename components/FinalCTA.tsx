"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28] relative overflow-hidden">
      {/* Intense converging glow background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7A5CFF]/15 blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#9C7CFF]/20 blur-[100px]"
        />
        {/* Converging particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [Math.cos(i * 30 * Math.PI / 180) * 300, 0],
              y: [Math.sin(i * 30 * Math.PI / 180) * 300, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-[#7A5CFF]"
          />
        ))}
        {/* Radial ring */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#7A5CFF]/20"
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            If You&apos;re Serious About Scale,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
              Structure Comes First.
            </span>
          </h2>
          <p className="text-[#B5B5C3] text-lg mb-4">Book a strategy call.</p>
          <p className="text-[#B5B5C3] text-base mb-10">
            We&apos;ll diagnose the gaps and show you where revenue is leaking.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/book-call"
              className="inline-block bg-[#7A5CFF] hover:bg-[#9C7CFF] text-white font-semibold px-10 py-4 rounded-lg transition-colors text-lg shadow-[0_0_40px_rgba(122,92,255,0.4)] hover:shadow-[0_0_60px_rgba(122,92,255,0.6)]"
            >
              Book Executive Strategy Call
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
