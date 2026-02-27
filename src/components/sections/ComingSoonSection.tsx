"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const easeEntry: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const upcomingProducts = [
  { name: "GLOW DICE", status: "AVAILABLE NOW", available: true, glowColor: "#00F5FF", icon: "🎲" },
  { name: "GLOW GOLF BALLS", status: "COMING SOON", available: false, glowColor: "#FF2E9F", icon: "⛳" },
  { name: "GLOW PONG BALLS", status: "COMING SOON", available: false, glowColor: "#8F00FF", icon: "🏓" },
];

export default function ComingSoonSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0A0A0F] py-[5.25rem] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,46,159,0.03)_0%,transparent_50%),radial-gradient(circle_at_70%_50%,rgba(143,0,255,0.03)_0%,transparent_50%)]" />

      <div className="relative z-10 max-w-[84.72rem] mx-auto px-[1.25rem]">
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
            Product Line
          </p>
          <h2
            className="text-[2.625rem] md:text-[4.25rem] font-black text-glow-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            THE GLOW
            <br />
            <span className="gradient-text-cyan-purple">COLLECTION.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2rem] max-w-[52.36rem] mx-auto mb-[3.25rem]">
          {upcomingProducts.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.185, ease: easeEntry }}
              whileHover={{ y: -8, rotateY: 5, rotateX: -5 }}
              className="group relative"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative bg-surface border border-glow-white/[0.09] p-[2rem] text-center transition-all duration-500"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 21px ${product.glowColor}0A, 0 0 21px ${product.glowColor}0A` }}
                />

                <div className="text-[4.25rem] mb-[1.25rem]">{product.icon}</div>

                <h3
                  className="text-[1.625rem] font-bold text-glow-white tracking-[0.162em] mb-[0.75rem]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {product.name}
                </h3>

                <span
                  className="inline-block text-[0.625rem] tracking-[0.162em] px-[1.25rem] py-[0.5rem] border"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: product.glowColor,
                    borderColor: `${product.glowColor}40`,
                    boxShadow: product.available ? `0 0 8px ${product.glowColor}20` : "none",
                  }}
                >
                  {product.status}
                </span>

                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: product.glowColor }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeEntry }}
          viewport={{ once: true }}
          className="max-w-[32.36rem] mx-auto text-center"
        >
          <h3
            className="text-[1.625rem] font-bold text-glow-white tracking-[0.162em] mb-[0.75rem]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            GET EARLY ACCESS
          </h3>
          <p className="text-glow-white/[0.382] text-[0.625rem] mb-[1.25rem]">
            Be the first to know when new products drop.
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.952 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-neon-cyan tracking-[0.1em]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              YOU&apos;RE ON THE LIST. ✓
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-surface border border-glow-white/[0.09] px-[1.25rem] py-[0.75rem] text-glow-white placeholder-glow-white/[0.236] text-[0.625rem] focus:outline-none focus:border-neon-cyan/[0.382] transition-colors"
              />
              <button
                type="submit"
                className="px-[2rem] py-[0.75rem] bg-neon-pink text-white text-[0.625rem] font-bold tracking-[0.162em] uppercase hover:bg-neon-pink/[0.9] transition-colors neon-pulse cursor-pointer"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                JOIN
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
