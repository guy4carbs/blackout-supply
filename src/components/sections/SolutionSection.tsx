"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import NeonButton from "@/components/ui/NeonButton";

const GlowDice = dynamic(() => import("@/components/3d/GlowDice"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-surface/50 animate-pulse" />,
});

const lightingModes = [
  { id: "uv", label: "UV LIGHT", color: "#8F00FF", intensity: 1.8 },
  { id: "dark", label: "TOTAL DARK", color: "#00F5FF", intensity: 1.2 },
  { id: "party", label: "PARTY MODE", color: "#FF2E9F", intensity: 2.0 },
];

const features = [
  "High-visibility glow resin",
  "Precision-balanced",
  "Long-lasting illumination",
  "Durable drop resistance",
];

export default function SolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeMode, setActiveMode] = useState(lightingModes[1]);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative min-h-screen bg-[#0A0A0F] py-24 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 60% 50%, ${activeMode.color}08 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="aspect-square max-w-lg mx-auto w-full"
          >
            <GlowDice
              interactive
              glowIntensity={activeMode.intensity}
              color={activeMode.color}
            />

            {/* Lighting mode toggles */}
            <div className="flex justify-center gap-3 mt-6">
              {lightingModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode)}
                  className={`px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-all duration-300 cursor-pointer ${
                    activeMode.id === mode.id
                      ? "border-current opacity-100"
                      : "border-glow-white/20 opacity-50 hover:opacity-75"
                  }`}
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: mode.color,
                    boxShadow:
                      activeMode.id === mode.id
                        ? `0 0 15px ${mode.color}40`
                        : "none",
                  }}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <p
                className="text-neon-pink text-sm tracking-[0.3em] mb-4 uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                The Solution
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-black text-glow-white leading-none"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ENGINEERED FOR
                <br />
                <span className="gradient-text-pink-cyan">THE AFTER HOURS.</span>
              </h2>
            </div>

            <p className="text-glow-white/60 text-lg leading-relaxed max-w-md">
              Charge under light. Dominate in the dark. Our premium glow dice are
              precision-engineered for the players who own the night.
            </p>

            {/* Features */}
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 text-glow-white/70"
                >
                  <span
                    className="w-2 h-2 rounded-full bg-neon-cyan"
                    style={{ boxShadow: "0 0 8px #00F5FF" }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>

            <NeonButton href="/shop/glow-dice-set" variant="pink" size="lg">
              Shop Glow Dice
            </NeonButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
