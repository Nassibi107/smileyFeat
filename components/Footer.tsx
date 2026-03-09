"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-[#1F1F28] bg-[#0B0B0F] py-16 px-6 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#7A5CFF]/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7A5CFF] to-[#9C7CFF] flex items-center justify-center">
                <span className="text-white font-extrabold text-sm">S</span>
              </div>
              <span className="text-white font-extrabold text-xl tracking-widest">SMILEY</span>
            </div>
            <p className="text-[#B5B5C3] text-sm leading-relaxed">
              Building revenue infrastructure for companies that want structure, control, and scalable growth.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigation</h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-[#B5B5C3] hover:text-[#9C7CFF] text-sm transition-colors">Home</Link>
              <Link href="/infrastructure" className="text-[#B5B5C3] hover:text-[#9C7CFF] text-sm transition-colors">Infrastructure</Link>
              <Link href="/case-studies" className="text-[#B5B5C3] hover:text-[#9C7CFF] text-sm transition-colors">Case Studies</Link>
              <Link href="/about" className="text-[#B5B5C3] hover:text-[#9C7CFF] text-sm transition-colors">About</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <div className="flex flex-col gap-3">
              <Link href="#team" className="text-[#B5B5C3] hover:text-[#9C7CFF] text-sm transition-colors">Our Team</Link>
              <Link href="#partners" className="text-[#B5B5C3] hover:text-[#9C7CFF] text-sm transition-colors">Partners</Link>
              <Link href="/book-call" className="text-[#B5B5C3] hover:text-[#9C7CFF] text-sm transition-colors">Book a Call</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <p className="text-[#B5B5C3] text-sm mb-2">contact@smiley.com</p>
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block mt-3">
              <Link
                href="/book-call"
                className="bg-[#7A5CFF] hover:bg-[#9C7CFF] text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors shadow-[0_0_20px_rgba(122,92,255,0.3)]"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1F1F28] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#B5B5C3] text-sm">
            &copy; {new Date().getFullYear()} SMILEY. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
            <span className="text-[#B5B5C3] text-xs">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
