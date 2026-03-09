"use client";
import { motion } from "framer-motion";

const partners = [
  {
    name: "Salesforce",
    type: "CRM & Automation",
    desc: "Enterprise-grade CRM infrastructure for sales pipeline management.",
    logo: "SF",
  },
  {
    name: "HubSpot",
    type: "Marketing & Growth",
    desc: "Inbound marketing automation and lead generation systems.",
    logo: "HS",
  },
  {
    name: "Stripe",
    type: "Payments & Revenue",
    desc: "Revenue processing infrastructure and financial analytics.",
    logo: "ST",
  },
  {
    name: "Vercel",
    type: "Web Infrastructure",
    desc: "Enterprise-grade hosting and deployment for client platforms.",
    logo: "VL",
  },
  {
    name: "Notion",
    type: "Operations & Docs",
    desc: "Documentation and SOP management infrastructure.",
    logo: "NT",
  },
  {
    name: "Zapier",
    type: "Integration & Workflow",
    desc: "Cross-platform automation connecting 5,000+ tools.",
    logo: "ZP",
  },
];

const partnershipTiers = [
  {
    tier: "Strategic",
    desc: "Deep integration partners that form the backbone of our revenue infrastructure.",
    count: 8,
    color: "#7A5CFF",
  },
  {
    tier: "Technology",
    desc: "Platform partners providing specialized tools for client ecosystems.",
    count: 24,
    color: "#9C7CFF",
  },
  {
    tier: "Network",
    desc: "Vetted freelancers and agencies for scalable execution capacity.",
    count: 120,
    color: "#B5A3FF",
  },
];

export default function Partnerships() {
  return (
    <section className="py-32 px-6 bg-[#0B0B0F] border-t border-[#1F1F28] relative overflow-hidden">
      {/* Honeycomb/hexagonal network background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(122,92,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(122,92,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        {/* Orbiting rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#7A5CFF]/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-dashed border-[#9C7CFF]/5"
        />
        {/* Hub glow */}
        <motion.div
          animate={{ opacity: [0.08, 0.2, 0.08], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#7A5CFF]/15 blur-[80px]"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[15%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#9C7CFF]/8 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.06, 0.16, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[15%] left-[10%] w-[250px] h-[250px] rounded-full bg-[#7A5CFF]/8 blur-[90px]"
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
            Ecosystem & Partnerships
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Powered by the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
              Best Stack.
            </span>
          </h2>
          <p className="text-[#B5B5C3] text-lg max-w-2xl mx-auto">
            We partner with industry-leading platforms to build infrastructure that lasts. No patchwork. One integrated ecosystem.
          </p>
        </motion.div>

        {/* Partners Grid - Animated Infinite Scroll Effect */}
        <div className="relative mb-20">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0B0B0F] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0B0B0F] to-transparent z-10" />
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -5,
                  transition: { duration: 0.2 } 
                }}
                className="group bg-[#0E0E14] border border-[#1F1F28] hover:border-[#7A5CFF]/50 rounded-2xl p-6 text-center cursor-default transition-colors"
              >
                {/* Logo */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#7A5CFF]/20 to-[#9C7CFF]/10 border border-[#7A5CFF]/30 flex items-center justify-center"
                >
                  <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
                    {partner.logo}
                  </span>
                </motion.div>
                <h3 className="text-white font-bold text-sm mb-1 group-hover:text-[#9C7CFF] transition-colors">{partner.name}</h3>
                <p className="text-[#7A5CFF] text-xs font-medium mb-2">{partner.type}</p>
                <p className="text-[#B5B5C3] text-xs leading-relaxed">{partner.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Partnership Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-extrabold text-white text-center mb-10">
            Our Partnership Ecosystem
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnershipTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="relative bg-[#0E0E14] border border-[#1F1F28] hover:border-[#7A5CFF]/40 rounded-2xl p-8 overflow-hidden transition-colors"
              >
                {/* Accent top border */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  className={`absolute top-0 left-0 h-1 rounded-t-2xl ${i === 0 ? 'bg-gradient-to-r from-[#7A5CFF] to-transparent' : i === 1 ? 'bg-gradient-to-r from-[#9C7CFF] to-transparent' : 'bg-gradient-to-r from-[#B5A3FF] to-transparent'}`}
                />

                <div className={`text-5xl font-extrabold mb-3 ${i === 0 ? 'text-[#7A5CFF]' : i === 1 ? 'text-[#9C7CFF]' : 'text-[#B5A3FF]'}`}>
                  {tier.count}+
                </div>
                <h4 className="text-white font-bold text-xl mb-2">{tier.tier} Partners</h4>
                <p className="text-[#B5B5C3] text-sm leading-relaxed">{tier.desc}</p>

                {/* Decorative dots */}
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: Math.min(tier.count, 12) }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 0.6, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: j * 0.04 + i * 0.2 }}
                      className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#7A5CFF]' : i === 1 ? 'bg-[#9C7CFF]' : 'bg-[#B5A3FF]'}`}
                    />
                  ))}
                  {tier.count > 12 && (
                    <span className="text-[#B5B5C3] text-xs ml-1">+{tier.count - 12}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12 p-10 border border-[#1F1F28] rounded-2xl bg-gradient-to-br from-[#0E0E14] to-[#7A5CFF]/5"
        >
          <h3 className="text-2xl font-extrabold text-white mb-3">
            Want to join our ecosystem?
          </h3>
          <p className="text-[#B5B5C3] text-sm mb-6 max-w-lg mx-auto">
            We&apos;re always looking for best-in-class tools and talents to strengthen our infrastructure network.
          </p>
          <motion.a
            href="/book-call"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-[#7A5CFF] hover:bg-[#9C7CFF] text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
          >
            Become a Partner
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
