"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

const studies = [
  {
    industry: "E-Commerce",
    problem: "Inconsistent revenue with no clear acquisition strategy",
    infrastructure: "Full acquisition funnel + CRM automation + revenue dashboard",
    metric: "+240%",
    metricLabel: "Revenue Growth",
    metricNum: 240,
  },
  {
    industry: "B2B SaaS",
    problem: "Sales cycle too long, pipeline unpredictable",
    infrastructure: "Sales automation + pipeline restructuring + KPI system",
    metric: "4×",
    metricLabel: "Pipeline Growth",
    metricNum: 4,
  },
  {
    industry: "Professional Services",
    problem: "Manual operations consuming 80% of team capacity",
    infrastructure: "Process automation + SOP framework + operational dashboard",
    metric: "70%",
    metricLabel: "Manual Work Eliminated",
    metricNum: 70,
  },
];

export default function CaseStudies() {
  return (
    <section className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28] relative overflow-hidden">
      {/* Data visualization background */}
      <div className="absolute inset-0">
        {/* Hexagonal subtle pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(122,92,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(156,124,255,0.08)_0%,transparent_50%)]" />
        {/* Moving data streams */}
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-[15%] w-px h-[200%] bg-gradient-to-b from-transparent via-[#7A5CFF]/15 to-transparent"
        />
        <motion.div
          animate={{ y: ["100%", "-100%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute right-[20%] w-px h-[200%] bg-gradient-to-b from-transparent via-[#9C7CFF]/10 to-transparent"
        />
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute left-[60%] w-px h-[200%] bg-gradient-to-b from-transparent via-[#7A5CFF]/8 to-transparent"
        />
        {/* Floating metric dots */}
        {[20, 35, 50, 65, 80].map((left, i) => (
          <div key={i} className="absolute w-1 h-1" style={{ left: `${left}%`, top: `${30 + i * 12}%` }}>
            <motion.div
              animate={{ y: [0, -40, 0], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
              className="w-1 h-1 rounded-full bg-[#7A5CFF] blur-[3px]"
            />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Infrastructure in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
              Action.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studies.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-[#0E0E14] border border-[#1F1F28] hover:border-[#7A5CFF]/40 rounded-2xl p-8 transition-colors"
            >
              <div className="inline-block bg-[#7A5CFF]/10 border border-[#7A5CFF]/30 rounded-full px-3 py-1 text-[#9C7CFF] text-xs font-semibold mb-4">
                {study.industry}
              </div>
              <p className="text-[#B5B5C3] text-sm mb-4">{study.problem}</p>
              <p className="text-white text-sm mb-6 font-medium">{study.infrastructure}</p>
              
              <div className="border-t border-[#1F1F28] pt-4">
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
                  <Counter end={study.metricNum} />
                  {study.metric.replace(String(study.metricNum), "")}
                </div>
                <div className="text-[#B5B5C3] text-sm mt-1">{study.metricLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
