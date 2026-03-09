"use client";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const team = [
  {
    name: "Alex Rivera",
    role: "CEO / Founder",
    desc: "Strategic Architecture & Revenue Systems",
    initials: "AR",
  },
  {
    name: "Jordan Chen",
    role: "COO",
    desc: "Operations & Infrastructure Deployment",
    initials: "JC",
  },
  {
    name: "Marcus Webb",
    role: "Head of Growth",
    desc: "Acquisition Systems & Funnel Engineering",
    initials: "MW",
  },
  {
    name: "Sofia Laurent",
    role: "Head of Brand",
    desc: "Positioning & Communication Systems",
    initials: "SL",
  },
  {
    name: "Dev Patel",
    role: "Technical Director",
    desc: "Automation & CRM Architecture",
    initials: "DP",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#0B0B0F] min-h-screen">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-8"
          >
            Infrastructure Over{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
              Guesswork.
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 text-[#B5B5C3] text-lg"
          >
            <p>SMILEY was built to solve the biggest problem inside growing companies.</p>
            <div className="space-y-2 pl-4 border-l border-[#7A5CFF]/30">
              <p className="text-white font-semibold">Chaos.</p>
              <p className="text-white font-semibold">Disconnected systems.</p>
              <p className="text-white font-semibold">Unclear metrics.</p>
              <p className="text-white font-semibold">Manual operations.</p>
            </div>
            <p>We replace that with structured revenue architecture.</p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-extrabold text-white mb-12 text-center"
          >
            The Team
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-[#0E0E14] border border-[#1F1F28] hover:border-[#7A5CFF]/40 rounded-2xl p-8 text-center transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7A5CFF] to-[#9C7CFF] flex items-center justify-center text-white font-extrabold text-xl mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-[#7A5CFF] text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-[#B5B5C3] text-sm">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
