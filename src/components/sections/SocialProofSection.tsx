"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const scenes = [
  { title: "Rooftop Nights", description: "When the city skyline meets the glow." },
  { title: "Basement Legends", description: "Where champions are made after midnight." },
  { title: "Night Golf", description: "The fairway has never looked this good." },
  { title: "Tailgate Kings", description: "Stadium lights off. Our lights on." },
];

const colleges = [
  { name: "Miami", x: 72, y: 78 },
  { name: "Arizona State", x: 18, y: 55 },
  { name: "USC", x: 10, y: 48 },
  { name: "Texas", x: 40, y: 68 },
  { name: "Florida", x: 70, y: 75 },
  { name: "Michigan", x: 60, y: 28 },
  { name: "Penn State", x: 72, y: 32 },
  { name: "Alabama", x: 58, y: 62 },
];

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative min-h-screen bg-[#050508] py-24 overflow-hidden"
    >
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0F] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <p
            className="text-neon-cyan text-sm tracking-[0.3em] mb-4 uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Social Proof
          </p>
          <h2
            className="text-4xl md:text-6xl font-black text-glow-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            SEEN AT TOP HOUSES
            <br />
            <span className="gradient-text-pink-cyan">NATIONWIDE.</span>
          </h2>
        </motion.div>

        {/* Scene cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {scenes.map((scene, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group relative aspect-[4/5] bg-surface border border-glow-white/5 overflow-hidden cursor-pointer"
            >
              {/* Placeholder visual */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/5 to-neon-cyan/5 group-hover:from-neon-pink/10 group-hover:to-neon-cyan/10 transition-all duration-500" />

              {/* Neon accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-pink to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A0A0F] to-transparent">
                <h3
                  className="text-lg font-bold text-glow-white tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {scene.title}
                </h3>
                <p className="text-glow-white/50 text-sm mt-1">{scene.description}</p>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 border border-neon-cyan/20" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* College Map */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative aspect-[2/1] border border-glow-white/5 bg-surface/50 rounded-sm overflow-hidden">
            {/* Map outline (simplified US) */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 100 60" className="w-full h-full">
                <path
                  d="M10,15 L25,10 L40,12 L55,10 L70,12 L85,15 L90,20 L88,30 L90,40 L85,50 L75,55 L60,52 L50,55 L40,52 L30,55 L20,50 L12,40 L10,30 Z"
                  fill="none"
                  stroke="#00F5FF"
                  strokeWidth="0.3"
                />
              </svg>
            </div>

            {/* College dots */}
            {colleges.map((college, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                viewport={{ once: true }}
                className="absolute group/dot"
                style={{ left: `${college.x}%`, top: `${college.y}%` }}
              >
                <div className="relative">
                  <div className="w-3 h-3 bg-neon-pink rounded-full animate-pulse" style={{ boxShadow: "0 0 10px #FF2E9F" }} />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/dot:opacity-100 transition-opacity whitespace-nowrap">
                    <span className="text-xs text-neon-cyan bg-surface/90 px-2 py-1 border border-neon-cyan/20">
                      {college.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ambassador CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-glow-white/50 text-sm mb-4 tracking-wider uppercase">
            Want to rep your campus?
          </p>
          <a
            href="#ambassador"
            className="inline-block text-neon-cyan text-sm tracking-[0.2em] uppercase border-b border-neon-cyan/30 hover:border-neon-cyan pb-1 transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Apply For Campus Ambassador Program →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
