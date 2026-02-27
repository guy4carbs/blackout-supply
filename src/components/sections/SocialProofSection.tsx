"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeEntry: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];
const easeEmphasis: [number, number, number, number] = [0.175, 0.885, 0.32, 1.275];

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
      className="relative min-h-screen bg-[#050508] py-[5.25rem] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2rem] bg-gradient-to-b from-[#0A0A0F] to-transparent" />

      <div className="relative z-10 max-w-[84.72rem] mx-auto px-[1.25rem]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeEntry }}
          className="text-center mb-[3.25rem]"
        >
          <p
            className="text-neon-cyan text-[0.625rem] tracking-[0.262em] mb-[1.25rem] uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Social Proof
          </p>
          <h2
            className="text-[2.625rem] md:text-[4.25rem] font-black text-glow-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            SEEN AT TOP HOUSES
            <br />
            <span className="gradient-text-pink-cyan">NATIONWIDE.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.25rem] mb-[5.25rem]">
          {scenes.map((scene, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.185, ease: easeEntry }}
              className="group relative aspect-[5/8] bg-surface border border-glow-white/[0.09] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/[0.05] to-neon-cyan/[0.05] group-hover:from-neon-pink/[0.09] group-hover:to-neon-cyan/[0.09] transition-all duration-500" />

              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-pink to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-[1.25rem] bg-gradient-to-t from-[#0A0A0F] to-transparent">
                <h3
                  className="text-[1.625rem] font-bold text-glow-white tracking-[0.1em] uppercase"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {scene.title}
                </h3>
                <p className="text-glow-white/[0.382] text-[0.625rem] mt-[0.25rem]">{scene.description}</p>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 border border-neon-cyan/[0.146]" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.3, ease: easeEntry }}
          viewport={{ once: true }}
          className="relative max-w-[52.36rem] mx-auto"
        >
          <div className="relative aspect-[1.618/1] border border-glow-white/[0.09] bg-surface/[0.382] rounded-sm overflow-hidden">
            <div className="absolute inset-0 opacity-[0.09]">
              <svg viewBox="0 0 100 60" className="w-full h-full">
                <path
                  d="M10,15 L25,10 L40,12 L55,10 L70,12 L85,15 L90,20 L88,30 L90,40 L85,50 L75,55 L60,52 L50,55 L40,52 L30,55 L20,50 L12,40 L10,30 Z"
                  fill="none"
                  stroke="#00F5FF"
                  strokeWidth="0.3"
                />
              </svg>
            </div>

            {colleges.map((college, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.185, ease: easeEmphasis }}
                viewport={{ once: true }}
                className="absolute group/dot"
                style={{ left: `${college.x}%`, top: `${college.y}%` }}
              >
                <div className="relative">
                  <div className="w-3 h-3 bg-neon-pink rounded-full animate-pulse" style={{ boxShadow: "0 0 8px rgba(255,46,159,0.618)" }} />
                  <div className="absolute -top-[2rem] left-1/2 -translate-x-1/2 opacity-0 group-hover/dot:opacity-100 transition-opacity whitespace-nowrap">
                    <span className="text-[0.625rem] text-neon-cyan bg-surface/[0.9] px-[0.5rem] py-[0.25rem] border border-neon-cyan/[0.146]">
                      {college.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeEntry }}
          viewport={{ once: true }}
          className="text-center mt-[3.25rem]"
        >
          <p className="text-glow-white/[0.382] text-[0.625rem] mb-[1.25rem] tracking-[0.1em] uppercase">
            Want to rep your campus?
          </p>
          <a
            href="#ambassador"
            className="inline-block text-neon-cyan text-[0.625rem] tracking-[0.162em] uppercase border-b border-neon-cyan/[0.236] hover:border-neon-cyan pb-[0.25rem] transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Apply For Campus Ambassador Program →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
