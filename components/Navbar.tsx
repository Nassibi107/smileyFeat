"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/infrastructure", label: "Infrastructure" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/about", label: "About" },
    { href: "#team", label: "Team" },
    { href: "#partners", label: "Partners" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B0B0F]/90 backdrop-blur-md border-b border-[#1F1F28] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7A5CFF] to-[#9C7CFF] flex items-center justify-center"
            >
              <span className="text-white font-extrabold text-sm">S</span>
            </motion.div>
            <span className="text-white font-extrabold text-xl tracking-widest">SMILEY</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#B5B5C3] hover:text-white transition-colors text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7A5CFF] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/book-call"
                className="bg-[#7A5CFF] hover:bg-[#9C7CFF] text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors shadow-[0_0_20px_rgba(122,92,255,0.3)]"
              >
                Book Call
              </Link>
            </motion.div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <motion.div
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white"
                />
                <motion.div
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-white"
                />
                <motion.div
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0B0B0F]/98 backdrop-blur-lg pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white text-2xl font-bold hover:text-[#9C7CFF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
