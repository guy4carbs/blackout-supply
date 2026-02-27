"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const founders = [
  {
    name: "Troy Kashul",
    title: "Co-Founder",
    glowColor: "#FF2E9F",
  },
  {
    name: "Gaetano Carbonara",
    title: "Co-Founder",
    glowColor: "#00F5FF",
  },
];

export default function FoundersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="founders"
      className="relative min-h-screen bg-[#050508] py-24 overflow-hidden flex items-center"
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(143,0,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <p
            className="text-neon-purple text-sm tracking-[0.3em] mb-4 uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Founders
          </p>
          <h2
            className="text-3xl md:text-5xl font-black text-glow-white/90 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WE BUILT WHAT THE NIGHT
            <br />
            <span className="gradient-text-cyan-purple">WAS MISSING.</span>
          </h2>
        </motion.div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          {founders.map((founder, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.3 }}
              className="group text-center"
            >
              {/* Portrait placeholder */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div
                  className="absolute inset-0 rounded-full bg-surface border border-glow-white/5 overflow-hidden"
                >
                  {/* Silhouette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-surface to-midnight flex items-center justify-center">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-24 h-24 opacity-30"
                      fill={founder.glowColor}
                    >
                      <circle cx="50" cy="35" r="18" />
                      <ellipse cx="50" cy="85" rx="30" ry="25" />
                    </svg>
                  </div>
                </div>

                {/* Neon edge glow */}
                <div
                  className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                  style={{
                    boxShadow: `0 0 20px ${founder.glowColor}40, inset 0 0 20px ${founder.glowColor}10`,
                  }}
                />
              </div>

              {/* Info */}
              <h3
                className="text-xl font-bold text-glow-white tracking-[0.15em] uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {founder.name}
              </h3>
              <p
                className="text-sm tracking-[0.2em] mt-2 uppercase"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: founder.glowColor,
                }}
              >
                {founder.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <blockquote className="text-glow-white/40 text-lg italic max-w-md mx-auto leading-relaxed">
            &ldquo;You don&apos;t throw plastic.
            <br />
            You throw presence.&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
