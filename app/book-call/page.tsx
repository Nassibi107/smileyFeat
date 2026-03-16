"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Footer from "@/components/Footer";

export default function BookCallPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

    const payload = {
      companyName: String(formData.get("companyName") ?? ""),
      website: String(formData.get("website") ?? ""),
      industry: String(formData.get("industry") ?? ""),
      companyStage: String(formData.get("companyStage") ?? ""),
      monthlyRevenue: String(formData.get("monthlyRevenue") ?? ""),
      bottleneck: String(formData.get("bottleneck") ?? ""),
      budgetRange: String(formData.get("budgetRange") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
    };

    try {
      const response = await fetch(`${apiBase}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to create booking.");
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitError("Submission failed. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#0B0B0F] min-h-screen">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              This Is Not a Discovery Call.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A5CFF] to-[#9C7CFF]">
                This Is a Strategic Diagnosis.
              </span>
            </h1>
            <p className="text-[#B5B5C3] text-lg">
              We diagnose your revenue gaps and show you exactly where to install infrastructure.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-[#7A5CFF]/40 rounded-2xl p-12 text-center"
            >
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-white font-extrabold text-2xl mb-3">Application Received</h2>
              <p className="text-[#B5B5C3]">We&apos;ll reach out within 24 hours to schedule your strategic diagnosis call.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6 border border-[#1F1F28] rounded-2xl p-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B5B5C3] text-sm font-semibold mb-2">Company Name</label>
                  <input
                    name="companyName"
                    type="text"
                    required
                    className="w-full bg-[#0E0E14] border border-[#1F1F28] focus:border-[#7A5CFF]/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                    placeholder="Acme Inc."
                  />
                </div>
                <div>
                  <label className="block text-[#B5B5C3] text-sm font-semibold mb-2">Website</label>
                  <input
                    name="website"
                    type="url"
                    className="w-full bg-[#0E0E14] border border-[#1F1F28] focus:border-[#7A5CFF]/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                    placeholder="https://acme.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#B5B5C3] text-sm font-semibold mb-2">Industry</label>
                <input
                  name="industry"
                  type="text"
                  required
                  className="w-full bg-[#0E0E14] border border-[#1F1F28] focus:border-[#7A5CFF]/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                  placeholder="e.g., SaaS, E-Commerce, Services"
                />
              </div>

              <div>
                <label className="block text-[#B5B5C3] text-sm font-semibold mb-2">Company Stage</label>
                <select
                  name="companyStage"
                  required
                  className="w-full bg-[#0E0E14] border border-[#1F1F28] focus:border-[#7A5CFF]/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                >
                  <option value="">Select stage</option>
                  <option value="0-12">0–12 months</option>
                  <option value="1-3">1–3 years</option>
                  <option value="3+">3+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-[#B5B5C3] text-sm font-semibold mb-2">Monthly Revenue</label>
                <select
                  name="monthlyRevenue"
                  required
                  className="w-full bg-[#0E0E14] border border-[#1F1F28] focus:border-[#7A5CFF]/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                >
                  <option value="">Select range</option>
                  <option value="0-10k">$0–$10k</option>
                  <option value="10-50k">$10k–$50k</option>
                  <option value="50-200k">$50k–$200k</option>
                  <option value="200k+">$200k+</option>
                </select>
              </div>

              <div>
                <label className="block text-[#B5B5C3] text-sm font-semibold mb-2">Current Bottleneck</label>
                <textarea
                  name="bottleneck"
                  rows={3}
                  className="w-full bg-[#0E0E14] border border-[#1F1F28] focus:border-[#7A5CFF]/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors resize-none"
                  placeholder="Describe your biggest challenge..."
                />
              </div>

              <div>
                <label className="block text-[#B5B5C3] text-sm font-semibold mb-2">Budget Range</label>
                <select
                  name="budgetRange"
                  className="w-full bg-[#0E0E14] border border-[#1F1F28] focus:border-[#7A5CFF]/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                >
                  <option value="">Select budget</option>
                  <option value="under-5k">Under $5k/mo</option>
                  <option value="5-15k">$5k–$15k/mo</option>
                  <option value="15-50k">$15k–$50k/mo</option>
                  <option value="50k+">$50k+/mo</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B5B5C3] text-sm font-semibold mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-[#0E0E14] border border-[#1F1F28] focus:border-[#7A5CFF]/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-[#B5B5C3] text-sm font-semibold mb-2">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full bg-[#0E0E14] border border-[#1F1F28] focus:border-[#7A5CFF]/50 rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {submitError ? <p className="text-[#FCA5A5] text-sm">{submitError}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7A5CFF] hover:bg-[#9C7CFF] text-white font-semibold py-4 rounded-lg transition-colors text-base"
              >
                {isSubmitting ? "Submitting..." : "Book Executive Strategy Call"}
              </button>
            </motion.form>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
