"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import NeonButton from "@/components/ui/NeonButton";

const GlowDice = dynamic(() => import("@/components/3d/GlowDice"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[5.25rem] h-[5.25rem] border border-neon-cyan/[0.236] animate-pulse" />
    </div>
  ),
});

/* Golden Ratio easing: [0.25, 0.1, 0.25, 1.0] */
const easeEntry: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

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
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0D0D1A] to-[#0A0A0F]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,255,0.05)_0%,transparent_60%)]" />

        <div className="absolute inset-0 w-full h-full">
          <motion.div className="w-full h-full" style={{ opacity: glowIntensity }}>
            <GlowDice glowIntensity={1.5} color="#00F5FF" />
          </motion.div>
        </div>

        <motion.div
          style={{ opacity, y }}
          className="relative z-10 text-center px-[1.25rem] max-w-[52.36rem] mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: easeEntry }}
            className="text-neon-pink text-[0.625rem] md:text-[1rem] tracking-[0.424em] mb-[1.25rem] uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            BLACK OUT SUPPLY PRESENTS
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.3, ease: easeEntry }}
            className="text-[2.625rem] md:text-[4.25rem] lg:text-[6.875rem] font-black leading-none mb-[1.25rem]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="block text-glow-white">WHEN THE LIGHTS</span>
            <span className="block gradient-text-pink-cyan mt-[0.5rem]">GO OUT.</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1.3, ease: easeEntry }}
            className="text-[2.625rem] md:text-[4.25rem] lg:text-[4.25rem] font-black mt-[1.25rem] glow-cyan"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WE GLOW.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: easeEntry }}
            className="mt-[3.25rem]"
          >
            <NeonButton href="#products" variant="pink" size="lg">
              Enter The Night
            </NeonButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
          className="absolute bottom-[2rem] left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: [0.4, 0.0, 0.2, 1.0] }}
            className="w-[1.25rem] h-[2rem] border-2 border-glow-white/[0.236] rounded-full flex justify-center"
          >
            <motion.div className="w-[0.375rem] h-[0.75rem] bg-neon-cyan rounded-full mt-[0.5rem]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
