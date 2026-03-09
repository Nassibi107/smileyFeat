"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28]">
      <div className="max-w-3xl mx-auto text-center">
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
          <Link
            href="/book-call"
            className="inline-block bg-[#7A5CFF] hover:bg-[#9C7CFF] text-white font-semibold px-10 py-4 rounded-lg transition-colors text-lg"
          >
            Book Executive Strategy Call
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
