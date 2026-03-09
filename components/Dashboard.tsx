"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
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

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const clients = [
  { name: "TechVault", industry: "SaaS", revenue: "+320%", status: "Active", health: 96 },
  { name: "GreenScale", industry: "E-Commerce", revenue: "+185%", status: "Active", health: 91 },
  { name: "NovaPay", industry: "Fintech", revenue: "+240%", status: "Active", health: 88 },
  { name: "BlueShift", industry: "Services", revenue: "+410%", status: "Active", health: 94 },
  { name: "ApexLogic", industry: "B2B", revenue: "+175%", status: "Scaling", health: 85 },
];

const chartData = [35, 42, 38, 55, 48, 62, 58, 72, 68, 85, 78, 92];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Dashboard() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28] overflow-hidden relative">
      {/* Radar sweep + data grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(122,92,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(122,92,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <div className="absolute top-0 left-1/2 w-px h-1/2 bg-gradient-to-t from-[#7A5CFF]/15 to-transparent origin-bottom" />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#7A5CFF]/10"
        />
        <motion.div
          animate={{ opacity: [0.03, 0.1, 0.03], scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#9C7CFF]/8"
        />
        <motion.div
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#7A5CFF]/8 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[15%] left-[10%] w-[250px] h-[250px] rounded-full bg-[#9C7CFF]/8 blur-[80px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block border border-[#7A5CFF]/40 rounded-full px-4 py-1.5 text-[#9C7CFF] text-sm font-medium mb-6">
            Live Performance Dashboard
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Real Results.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
              Real Time.
            </span>
          </h2>
          <p className="text-[#B5B5C3] text-lg max-w-2xl mx-auto">
            Every client gets full visibility into their growth infrastructure with live dashboards and KPI tracking.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 bg-[#0E0E14] border border-[#1F1F28] rounded-2xl p-8 relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7A5CFF]/5 rounded-full blur-[80px]" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h3 className="text-white font-bold text-lg">Revenue Growth</h3>
                <p className="text-[#B5B5C3] text-sm">Across all client portfolios</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-[#7A5CFF]/10 border border-[#7A5CFF]/30 rounded-lg px-3 py-1 text-[#9C7CFF] text-xs font-medium">YTD</span>
                <span className="bg-[#1F1F28] rounded-lg px-3 py-1 text-[#B5B5C3] text-xs">Monthly</span>
              </div>
            </div>

            {/* Animated Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-48 relative z-10">
              {chartData.map((value, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${value * 1.8}px` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                    className={`w-full rounded-t-md relative group cursor-pointer ${value > 70 ? 'bg-gradient-to-t from-[#7A5CFF] to-[#9C7CFF]' : 'bg-[#7A5CFF]'}`}
                  >
                    {/* Hover tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-[#0B0B0F] text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {value}%
                    </div>
                    {/* Glow on top */}
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                      className="absolute top-0 left-0 right-0 h-1 bg-white/30 rounded-t-md"
                    />
                  </motion.div>
                  <span className="text-[#B5B5C3] text-[10px]">{months[i]}</span>
                </div>
              ))}
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#1F1F28] relative z-10">
              <div>
                <p className="text-[#B5B5C3] text-xs mb-1">Avg. Growth</p>
                <p className="text-white font-bold text-xl">
                  <AnimatedCounter end={247} suffix="%" prefix="+" />
                </p>
              </div>
              <div>
                <p className="text-[#B5B5C3] text-xs mb-1">Revenue Protected</p>
                <p className="text-white font-bold text-xl">
                  $<AnimatedCounter end={12} suffix="M+" />
                </p>
              </div>
              <div>
                <p className="text-[#B5B5C3] text-xs mb-1">Systems Built</p>
                <p className="text-white font-bold text-xl">
                  <AnimatedCounter end={156} suffix="+" />
                </p>
              </div>
            </div>
          </motion.div>

          {/* Side Panels */}
          <div className="flex flex-col gap-6">
            {/* Active Clients Counter */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#0E0E14] border border-[#1F1F28] rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#7A5CFF]/10 rounded-full blur-[40px]" />
              <p className="text-[#B5B5C3] text-sm mb-2 relative z-10">Active Clients</p>
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF] relative z-10">
                <AnimatedCounter end={48} suffix="+" />
              </div>
              <div className="flex items-center gap-2 mt-3 relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-400"
                />
                <span className="text-green-400 text-xs font-medium">All systems operational</span>
              </div>
            </motion.div>

            {/* Satisfaction Ring */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-[#0E0E14] border border-[#1F1F28] rounded-2xl p-6 flex flex-col items-center"
            >
              <p className="text-[#B5B5C3] text-sm mb-4">Client Satisfaction</p>
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#1F1F28" strokeWidth="8" />
                  <motion.circle
                    cx="60" cy="60" r="52"
                    fill="none" stroke="url(#gradient)" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="327"
                    initial={{ strokeDashoffset: 327 }}
                    whileInView={{ strokeDashoffset: 327 * 0.02 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7A5CFF" />
                      <stop offset="100%" stopColor="#9C7CFF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-extrabold text-2xl">
                    <AnimatedCounter end={98} suffix="%" />
                  </span>
                </div>
              </div>
              <p className="text-[#9C7CFF] text-xs mt-3 font-medium">Retention Rate</p>
            </motion.div>

            {/* Live Pulse */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-[#0E0E14] border border-[#1F1F28] rounded-2xl p-6"
            >
              <p className="text-[#B5B5C3] text-sm mb-3">Live System Pulse</p>
              <div className="flex items-center gap-1 h-12">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: ["8px", `${12 + Math.random() * 28}px`, "8px"],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.06,
                      ease: "easeInOut",
                    }}
                    className="w-1.5 bg-gradient-to-t from-[#7A5CFF] to-[#9C7CFF] rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Client Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 bg-[#0E0E14] border border-[#1F1F28] rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-[#1F1F28] flex items-center justify-between">
            <h3 className="text-white font-bold">Client Portfolio Overview</h3>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#7A5CFF]"
              />
              <span className="text-[#B5B5C3] text-xs">Updating live</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1F1F28]">
                  <th className="text-left text-[#B5B5C3] text-xs font-semibold uppercase tracking-wider px-6 py-4">Client</th>
                  <th className="text-left text-[#B5B5C3] text-xs font-semibold uppercase tracking-wider px-6 py-4">Industry</th>
                  <th className="text-left text-[#B5B5C3] text-xs font-semibold uppercase tracking-wider px-6 py-4">Revenue Impact</th>
                  <th className="text-left text-[#B5B5C3] text-xs font-semibold uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-[#B5B5C3] text-xs font-semibold uppercase tracking-wider px-6 py-4">System Health</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="border-b border-[#1F1F28]/50 hover:bg-[#7A5CFF]/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7A5CFF] to-[#9C7CFF] flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{client.name[0]}</span>
                        </div>
                        <span className="text-white font-medium text-sm">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#B5B5C3] text-sm">{client.industry}</td>
                    <td className="px-6 py-4">
                      <span className="text-[#7A5CFF] font-bold text-sm">{client.revenue}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        client.status === "Active"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-[#7A5CFF]/10 text-[#9C7CFF]"
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-[#1F1F28] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${client.health}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: i * 0.15 }}
                            className="h-full bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF] rounded-full"
                          />
                        </div>
                        <span className="text-[#B5B5C3] text-xs">{client.health}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
