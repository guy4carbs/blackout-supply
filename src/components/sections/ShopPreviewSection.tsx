"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import NeonButton from "@/components/ui/NeonButton";
import { products } from "@/lib/products";

export default function ShopPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const diceProduct = products[0];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] bg-[#0A0A0F] py-24 overflow-hidden flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,255,0.03)_0%,transparent_50%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p
            className="text-neon-pink text-sm tracking-[0.3em] mb-4 uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Limited Drop
          </p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-glow-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            OWN THE NIGHT.
          </h2>
          <p className="text-glow-white/50 text-lg mb-2">
            {diceProduct.name} — ${diceProduct.price}
          </p>
          <p className="text-neon-cyan/70 text-sm tracking-wider mb-10 uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Next Drop: 500 Units
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NeonButton href="/shop" variant="pink" size="lg">
              Shop Now
            </NeonButton>
            <NeonButton href="#early-access" variant="cyan" size="lg">
              Join Early Access
            </NeonButton>
          </div>
        </motion.div>

        {/* Scarcity bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 max-w-sm mx-auto"
        >
          <div className="flex justify-between text-xs text-glow-white/40 mb-2 tracking-wider uppercase">
            <span>Stock</span>
            <span>73% Claimed</span>
          </div>
          <div className="h-1 bg-surface rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "73%" } : {}}
              transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan"
              style={{ boxShadow: "0 0 10px rgba(255,46,159,0.5)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
