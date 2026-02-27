"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeEntry: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const founders = [
  { name: "Troy Kashul", title: "Co-Founder", glowColor: "#FF2E9F" },
  { name: "Gaetano Carbonara", title: "Co-Founder", glowColor: "#00F5FF" },
];

export default function FoundersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="founders"
      className="relative min-h-screen bg-[#050508] py-[5.25rem] overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(143,0,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-[52.36rem] mx-auto px-[1.25rem] w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeEntry }}
          className="text-center mb-[3.25rem]"
        >
          <p
            className="text-neon-purple text-[0.625rem] tracking-[0.262em] mb-[1.25rem] uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Founders
          </p>
          <h2
            className="text-[2.625rem] font-black text-glow-white/[0.8] leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WE BUILT WHAT THE NIGHT
            <br />
            <span className="gradient-text-cyan-purple">WAS MISSING.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3.25rem] max-w-[52.36rem] mx-auto">
          {founders.map((founder, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.3, ease: easeEntry }}
              className="group text-center"
            >
              <div className="relative w-[8.5rem] h-[8.5rem] mx-auto mb-[1.25rem]">
                <div className="absolute inset-0 rounded-full bg-surface border border-glow-white/[0.09] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-surface to-midnight flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-[5.25rem] h-[5.25rem] opacity-[0.236]" fill={founder.glowColor}>
                      <circle cx="50" cy="35" r="18" />
                      <ellipse cx="50" cy="85" rx="30" ry="25" />
                    </svg>
                  </div>
                </div>

                <div
                  className="absolute inset-0 rounded-full opacity-[0.382] group-hover:opacity-[0.618] transition-opacity duration-500"
                  style={{ boxShadow: `0 0 21px ${founder.glowColor}3D, inset 0 0 13px ${founder.glowColor}17` }}
                />
              </div>

              <h3
                className="text-[1.625rem] font-bold text-glow-white tracking-[0.162em] uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {founder.name}
              </h3>
              <p
                className="text-[0.625rem] tracking-[0.162em] mt-[0.5rem] uppercase"
                style={{ fontFamily: "var(--font-heading)", color: founder.glowColor }}
              >
                {founder.title}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.5, ease: easeEntry }}
          viewport={{ once: true }}
          className="text-center mt-[5.25rem]"
        >
          <blockquote className="text-glow-white/[0.382] text-[1rem] italic max-w-[32.36rem] mx-auto leading-relaxed">
            &ldquo;You don&apos;t throw plastic.
            <br />
            You throw presence.&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
