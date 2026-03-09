"use client";
import { motion } from "framer-motion";

const team = [
  {
    name: "Yassine Nassibi",
    role: "Founder & CEO",
    specialty: "Revenue Architecture & Business Strategy",
    bio: "Architect of the SMILEY operating system. Turns business chaos into structured growth machines.",
    color: "#7A5CFF",
  },
  {
    name: "Sarah Chen",
    role: "Head of Growth",
    specialty: "Acquisition Systems & Funnel Strategy",
    bio: "Built acquisition engines generating 8-figure pipelines across 50+ companies.",
    color: "#9C7CFF",
  },
  {
    name: "Marcus Williams",
    role: "Operations Architect",
    specialty: "Process Automation & SOP Design",
    bio: "Eliminates operational chaos by designing systems that scale without breaking.",
    color: "#7A5CFF",
  },
  {
    name: "Léa Moreau",
    role: "Creative Director",
    specialty: "Brand Systems & Visual Identity",
    bio: "Crafts brand identities that command premium positioning in any market.",
    color: "#9C7CFF",
  },
  {
    name: "David Park",
    role: "CTO",
    specialty: "Tech Infrastructure & Integration",
    bio: "Connects every tool and platform into one seamless revenue infrastructure.",
    color: "#7A5CFF",
  },
  {
    name: "Amira Hassan",
    role: "Head of Analytics",
    specialty: "Revenue Intelligence & KPI Systems",
    bio: "Turns raw data into actionable profit intelligence and executive dashboards.",
    color: "#9C7CFF",
  },
];

export default function OurTeam() {
  return (
    <section className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28] relative overflow-hidden">
      {/* Network constellation background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7A5CFF]/5 rounded-full blur-[150px]" />
        {/* Constellation dots and lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Connection lines */}
          <motion.line x1="20%" y1="25%" x2="45%" y2="35%" stroke="#7A5CFF" strokeWidth="0.5" opacity="0.08" animate={{ opacity: [0.04, 0.12, 0.04] }} transition={{ duration: 4, repeat: Infinity }} />
          <motion.line x1="45%" y1="35%" x2="70%" y2="20%" stroke="#9C7CFF" strokeWidth="0.5" opacity="0.08" animate={{ opacity: [0.06, 0.14, 0.06] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} />
          <motion.line x1="30%" y1="70%" x2="55%" y2="55%" stroke="#7A5CFF" strokeWidth="0.5" opacity="0.08" animate={{ opacity: [0.04, 0.1, 0.04] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} />
          <motion.line x1="55%" y1="55%" x2="80%" y2="65%" stroke="#9C7CFF" strokeWidth="0.5" opacity="0.08" animate={{ opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 5, repeat: Infinity, delay: 1.5 }} />
          <motion.line x1="45%" y1="35%" x2="55%" y2="55%" stroke="#7A5CFF" strokeWidth="0.5" opacity="0.06" animate={{ opacity: [0.03, 0.1, 0.03] }} transition={{ duration: 7, repeat: Infinity, delay: 0.5 }} />
        </svg>
        {/* Constellation nodes */}
        {[
          { x: 20, y: 25 }, { x: 45, y: 35 }, { x: 70, y: 20 },
          { x: 30, y: 70 }, { x: 55, y: 55 }, { x: 80, y: 65 },
        ].map((pos, i) => (
          <div key={i} className="absolute w-2 h-2" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              className="w-full h-full rounded-full bg-[#7A5CFF]"
            />
          </div>
        ))}
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[15%] w-[350px] h-[350px] rounded-full bg-[#7A5CFF]/8 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[10%] right-[15%] w-[300px] h-[300px] rounded-full bg-[#9C7CFF]/8 blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block border border-[#7A5CFF]/40 rounded-full px-4 py-1.5 text-[#9C7CFF] text-sm font-medium mb-6">
            The People Behind The Systems
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Meet The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
              Architects.
            </span>
          </h2>
          <p className="text-[#B5B5C3] text-lg max-w-2xl mx-auto">
            Not freelancers. Not agencies. A precision-engineered team built to install revenue infrastructure.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-[#0E0E14] border border-[#1F1F28] hover:border-[#7A5CFF]/50 rounded-2xl p-8 transition-colors cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#7A5CFF]/0 group-hover:bg-[#7A5CFF]/10 rounded-full blur-[60px] transition-all duration-500" />

              {/* Avatar */}
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative bg-gradient-to-br from-[#7A5CFF]/10 to-[#7A5CFF]/25 border border-[#7A5CFF]/30"
              >
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </span>
                {/* Online indicator */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0E0E14]"
                />
              </motion.div>

              {/* Info */}
              <h3 className="text-white font-bold text-xl mb-1 group-hover:text-[#9C7CFF] transition-colors">
                {member.name}
              </h3>
              <p className="text-[#7A5CFF] text-sm font-semibold mb-1">{member.role}</p>
              <p className="text-[#B5B5C3] text-xs mb-4">{member.specialty}</p>
              <p className="text-[#B5B5C3] text-sm leading-relaxed">{member.bio}</p>

              {/* Bottom accent line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#7A5CFF] to-transparent"
              />
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "50+", label: "Specialists in our network" },
            { number: "12+", label: "Countries represented" },
            { number: "200+", label: "Projects delivered" },
            { number: "98%", label: "Client satisfaction" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 border border-[#1F1F28] rounded-xl hover:border-[#7A5CFF]/30 transition-colors"
            >
              <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
                {stat.number}
              </div>
              <p className="text-[#B5B5C3] text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
