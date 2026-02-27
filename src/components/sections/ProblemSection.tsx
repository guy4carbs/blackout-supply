"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const statements = [
  "Parties Die When The Lights Go On.",
  "Normal Dice Don't Hit.",
  "Your Setup Isn't Memorable.",
];

const easeEntry: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

function GlitchText({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: easeEntry }}
    >
      <h3
        className="text-[2.625rem] md:text-[4.25rem] font-black text-glow-white/[0.8] leading-tight"
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
    [1, 0.236, 1, 0.382, 1, 0.146, 1]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0A0A0F] py-[8.5rem] overflow-hidden"
    >
      <motion.div
        style={{ opacity: flickerOpacity }}
        className="absolute inset-0 bg-[#0A0A0F]"
      />

      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.1) 2px, rgba(0,245,255,0.1) 4px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[52.36rem] mx-auto px-[1.25rem]">
        <div className="space-y-[3.25rem] md:space-y-[5.25rem]">
          {statements.map((text, i) => (
            <GlitchText key={i} text={text} delay={i * 0.3} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.5, ease: easeEntry }}
          viewport={{ once: true }}
          className="mt-[8.5rem] text-center"
        >
          <p
            className="text-neon-pink text-[1rem] md:text-[1.625rem] tracking-[0.262em] uppercase flicker"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Until Now.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
