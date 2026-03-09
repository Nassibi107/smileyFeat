"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1F1F28] bg-[#0B0B0F] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white font-extrabold text-xl tracking-widest">SMILEY</div>
        
        <div className="flex items-center gap-8">
          <Link href="/" className="text-[#B5B5C3] hover:text-white text-sm transition-colors">Home</Link>
          <Link href="/infrastructure" className="text-[#B5B5C3] hover:text-white text-sm transition-colors">Infrastructure</Link>
          <Link href="/case-studies" className="text-[#B5B5C3] hover:text-white text-sm transition-colors">Case Studies</Link>
          <Link href="/about" className="text-[#B5B5C3] hover:text-white text-sm transition-colors">About</Link>
        </div>

        <div className="text-[#B5B5C3] text-sm">
          contact@smiley.com
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-[#1F1F28] text-center text-[#B5B5C3] text-sm">
        © 2024 SMILEY. All rights reserved.
      </div>
    </footer>
  );
}
