"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const statements = [
  "Parties Die When The Lights Go On.",
  "Normal Dice Don't Hit.",
  "Your Setup Isn't Memorable.",
];

function GlitchText({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      <h3
        className="text-3xl md:text-5xl lg:text-6xl font-black text-glow-white/90 leading-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {text}
      </h3>
    </motion.div>
  );
}

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const flickerOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.35, 0.36, 0.37, 0.5, 0.51, 0.52],
    [1, 0.2, 1, 0.3, 1, 0.1, 1]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0A0A0F] py-32 overflow-hidden"
    >
      {/* Flicker overlay */}
      <motion.div
        style={{ opacity: flickerOpacity }}
        className="absolute inset-0 bg-[#0A0A0F]"
      />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.1) 2px, rgba(0,245,255,0.1) 4px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="space-y-16 md:space-y-24">
          {statements.map((text, i) => (
            <GlitchText key={i} text={text} delay={i * 0.3} />
          ))}
        </div>

        {/* Transition to solution */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <p
            className="text-neon-pink text-lg md:text-xl tracking-[0.3em] uppercase flicker"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Until Now.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
