"use client";
import { motion } from "framer-motion";
import { Users, Globe, Layers, Target, FileText, Zap } from "lucide-react";

const reasons = [
  { icon: Users, title: "Hybrid team model", desc: "Senior strategists backed by specialized execution teams." },
  { icon: Globe, title: "National freelancer scalability", desc: "Scale resources instantly without overhead costs." },
  { icon: Layers, title: "Full-stack capability", desc: "From brand → acquisition → sales → operations in one system." },
  { icon: Target, title: "KPI-driven execution", desc: "Every action tied to measurable business outcomes." },
  { icon: FileText, title: "Documentation-first systems", desc: "Everything built to outlast any team member." },
  { icon: Zap, title: "Speed without chaos", desc: "Rapid deployment with structural discipline." },
];

export default function WhySmiley() {
  return (
    <section className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28] relative overflow-hidden">
      {/* Diamond pattern + dual glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(122,92,255,0.03)_25%,transparent_25%,transparent_75%,rgba(122,92,255,0.03)_75%),linear-gradient(45deg,rgba(122,92,255,0.03)_25%,transparent_25%,transparent_75%,rgba(122,92,255,0.03)_75%)] bg-[size:60px_60px] bg-[position:0_0,30px_30px]" />
        <motion.div
          animate={{ opacity: [0.06, 0.18, 0.06], x: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#7A5CFF]/12 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.08, 0.2, 0.08], x: [20, -20, 20] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-[#9C7CFF]/10 blur-[110px]"
        />
      </div>
      {/* Side accent lines */}
      <motion.div
        animate={{ height: ["0%", "60%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-transparent via-[#7A5CFF]/20 to-transparent"
      />
      <motion.div
        animate={{ height: ["0%", "60%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-transparent via-[#9C7CFF]/20 to-transparent"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Why We&apos;re Not{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
              Replaceable.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 border border-[#1F1F28] hover:border-[#7A5CFF]/30 rounded-xl transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#7A5CFF]/10 flex items-center justify-center">
                  <Icon size={20} className="text-[#7A5CFF]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{reason.title}</h3>
                  <p className="text-[#B5B5C3] text-sm">{reason.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
