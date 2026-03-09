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
    <section className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28]">
      <div className="max-w-5xl mx-auto">
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
