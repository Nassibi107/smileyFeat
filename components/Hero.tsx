"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0F]">
      {/* Animated purple glow background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7A5CFF]/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#9C7CFF]/15 blur-[100px]"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Floating Dashboard Cards */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-16 hidden lg:block"
      >
        <div className="bg-[#1F1F28]/80 backdrop-blur-sm border border-[#7A5CFF]/30 rounded-xl p-4 w-48">
          <div className="text-[#B5B5C3] text-xs mb-1">Revenue Growth</div>
          <div className="text-[#7A5CFF] text-2xl font-extrabold">+240%</div>
          <div className="mt-2 h-1 bg-[#1F1F28] rounded-full overflow-hidden">
            <motion.div
              animate={{ width: ["0%", "75%"] }}
              transition={{ duration: 2, delay: 0.5 }}
              className="h-full bg-[#7A5CFF] rounded-full"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 left-16 hidden lg:block"
      >
        <div className="bg-[#1F1F28]/80 backdrop-blur-sm border border-[#7A5CFF]/30 rounded-xl p-4 w-52">
          <div className="text-[#B5B5C3] text-xs mb-1">Pipeline Growth</div>
          <div className="text-white text-2xl font-extrabold">4× <span className="text-[#9C7CFF]">Scale</span></div>
          <div className="flex gap-1 mt-2">
            {[40, 65, 50, 80, 70, 90].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: [`0px`, `${h * 0.4}px`] }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="w-2 bg-[#7A5CFF]/60 rounded-sm"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block border border-[#7A5CFF]/40 rounded-full px-4 py-1.5 text-[#9C7CFF] text-sm font-medium mb-8"
        >
          Revenue Operating System
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
        >
          WE BUILD{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
            REVENUE
          </span>
          <br />
          INFRASTRUCTURE.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#B5B5C3] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We help business owners scale revenue by systemizing acquisition, eliminating operational chaos, and building predictable profit systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/book-call"
            className="bg-[#7A5CFF] hover:bg-[#9C7CFF] text-white font-semibold px-8 py-4 rounded-lg transition-colors text-base"
          >
            Book Executive Strategy Call
          </Link>
          <Link
            href="/infrastructure"
            className="border border-[#1F1F28] hover:border-[#7A5CFF]/50 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-base"
          >
            Explore Our Infrastructure
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
