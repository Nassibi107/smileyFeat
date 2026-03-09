"use client";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const cases = [
  {
    industry: "E-Commerce",
    situation: "No clear acquisition strategy. Revenue was inconsistent month-to-month with high customer acquisition costs.",
    infrastructure: "Full acquisition funnel redesign, CRM automation, and revenue intelligence dashboard.",
    outcome: "+240% revenue increase in 6 months",
    metrics: [{ value: "+240%", label: "Revenue" }, { value: "3×", label: "ROAS" }, { value: "-45%", label: "CAC" }],
  },
  {
    industry: "B2B SaaS",
    situation: "Long sales cycles with no pipeline visibility. Deals falling through cracks.",
    infrastructure: "Sales automation system, pipeline restructuring, and weekly KPI review framework.",
    outcome: "4× pipeline growth in 90 days",
    metrics: [{ value: "4×", label: "Pipeline" }, { value: "-60%", label: "Sales Cycle" }, { value: "89%", label: "Win Rate" }],
  },
  {
    industry: "Professional Services",
    situation: "80% of team capacity consumed by manual operations. No time for growth activities.",
    infrastructure: "Process automation framework, SOP documentation system, and operational dashboard.",
    outcome: "70% manual work eliminated",
    metrics: [{ value: "70%", label: "Automation" }, { value: "3×", label: "Capacity" }, { value: "+180%", label: "Revenue" }],
  },
  {
    industry: "Health & Wellness",
    situation: "Inconsistent patient acquisition and poor retention systems.",
    infrastructure: "Patient journey automation, referral system, and revenue forecasting model.",
    outcome: "+320% patient lifetime value",
    metrics: [{ value: "+320%", label: "LTV" }, { value: "5×", label: "Referrals" }, { value: "94%", label: "Retention" }],
  },
  {
    industry: "Real Estate",
    situation: "No systematic lead nurturing. High lead volume but low conversion.",
    infrastructure: "Lead scoring system, automated nurture sequences, and deal velocity tracker.",
    outcome: "4× conversion rate improvement",
    metrics: [{ value: "4×", label: "Conversion" }, { value: "+290%", label: "Revenue" }, { value: "-50%", label: "Time to Close" }],
  },
  {
    industry: "Agency",
    situation: "Scope creep, project delays, and client churn destroying margins.",
    infrastructure: "Project management system, client success framework, and profitability dashboard.",
    outcome: "+150% profit margin growth",
    metrics: [{ value: "+150%", label: "Margins" }, { value: "0%", label: "Churn" }, { value: "4.9", label: "NPS Score" }],
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="bg-[#0B0B0F] min-h-screen">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-6"
          >
            Company{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
              Transformations.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#B5B5C3] text-lg"
          >
            Real infrastructure. Real results.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="bg-[#0E0E14] border border-[#1F1F28] hover:border-[#7A5CFF]/40 rounded-2xl p-8 transition-colors"
            >
              <div className="inline-block bg-[#7A5CFF]/10 border border-[#7A5CFF]/30 rounded-full px-3 py-1 text-[#9C7CFF] text-xs font-semibold mb-4">
                {c.industry}
              </div>
              <p className="text-[#B5B5C3] text-sm mb-4">{c.situation}</p>
              <p className="text-white text-sm font-medium mb-6">{c.infrastructure}</p>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {c.metrics.map((m, j) => (
                  <div key={j} className="text-center">
                    <div className="text-xl font-extrabold text-[#7A5CFF]">{m.value}</div>
                    <div className="text-[#B5B5C3] text-xs">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#1F1F28] pt-4">
                <p className="text-[#9C7CFF] text-sm font-semibold">{c.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
