"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import NeonButton from "@/components/ui/NeonButton";

const GlowDice = dynamic(() => import("@/components/3d/GlowDice"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 border border-neon-cyan/30 animate-pulse" />
    </div>
  ),
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const glowIntensity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1.5]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0D0D1A] to-[#0A0A0F]" />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,255,0.05)_0%,transparent_60%)]" />

        {/* 3D Dice */}
        <div className="absolute inset-0 w-full h-full">
          <motion.div className="w-full h-full" style={{ opacity: glowIntensity }}>
            <GlowDice glowIntensity={1.5} color="#00F5FF" />
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          style={{ opacity, y }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-neon-pink text-sm md:text-base tracking-[0.4em] mb-6 uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            BLACK OUT SUPPLY PRESENTS
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="block text-glow-white">WHEN THE LIGHTS</span>
            <span className="block gradient-text-pink-cyan mt-2">GO OUT.</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mt-4 glow-cyan"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WE GLOW.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="mt-12"
          >
            <NeonButton href="#products" variant="pink" size="lg">
              Enter The Night
            </NeonButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-glow-white/30 rounded-full flex justify-center"
          >
            <motion.div className="w-1.5 h-3 bg-neon-cyan rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
