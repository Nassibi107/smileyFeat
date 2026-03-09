"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0B0F]/90 backdrop-blur-md border-b border-[#1F1F28]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-white font-extrabold text-xl tracking-widest">
          SMILEY
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[#B5B5C3] hover:text-white transition-colors text-sm font-medium">
            Home
          </Link>
          <Link href="/infrastructure" className="text-[#B5B5C3] hover:text-white transition-colors text-sm font-medium">
            Infrastructure
          </Link>
          <Link href="/case-studies" className="text-[#B5B5C3] hover:text-white transition-colors text-sm font-medium">
            Case Studies
          </Link>
          <Link href="/about" className="text-[#B5B5C3] hover:text-white transition-colors text-sm font-medium">
            About
          </Link>
        </div>
        <Link
          href="/book-call"
          className="bg-[#7A5CFF] hover:bg-[#9C7CFF] text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          Book Call
        </Link>
      </div>
    </motion.nav>
  );
}
