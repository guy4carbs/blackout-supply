"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import NeonButton from "@/components/ui/NeonButton";
import { products } from "@/lib/products";

const easeEntry: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export default function ShopPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const diceProduct = products[0];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] bg-[#0A0A0F] py-[5.25rem] overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,255,0.03)_0%,transparent_50%)]" />

      <div className="relative z-10 max-w-[52.36rem] mx-auto px-[1.25rem] w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeEntry }}
        >
          <p
            className="text-neon-pink text-[0.625rem] tracking-[0.262em] mb-[1.25rem] uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Limited Drop
          </p>
          <h2
            className="text-[2.625rem] md:text-[4.25rem] font-black text-glow-white mb-[1.25rem]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            OWN THE NIGHT.
          </h2>
          <p className="text-glow-white/[0.382] text-[1rem] mb-[0.5rem]">
            {diceProduct.name} — ${diceProduct.price}
          </p>
          <p
            className="text-neon-cyan/[0.618] text-[0.625rem] tracking-[0.1em] mb-[2rem] uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Next Drop: 500 Units
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-[1.25rem]">
            <NeonButton href="/shop" variant="pink" size="lg">
              Shop Now
            </NeonButton>
            <NeonButton href="#early-access" variant="cyan" size="lg">
              Join Early Access
            </NeonButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease: easeEntry }}
          className="mt-[3.25rem] max-w-[20rem] mx-auto"
        >
          <div className="flex justify-between text-[0.625rem] text-glow-white/[0.382] mb-[0.5rem] tracking-[0.1em] uppercase">
            <span>Stock</span>
            <span>73% Claimed</span>
          </div>
          <div className="h-[0.25rem] bg-surface rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "73%" } : {}}
              transition={{ delay: 0.8, duration: 1.3, ease: easeEntry }}
              className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan"
              style={{ boxShadow: "0 0 8px rgba(255,46,159,0.618)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
