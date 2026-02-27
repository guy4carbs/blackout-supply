"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const upcomingProducts = [
  {
    name: "GLOW DICE",
    status: "AVAILABLE NOW",
    available: true,
    glowColor: "#00F5FF",
    icon: "🎲",
  },
  {
    name: "GLOW GOLF BALLS",
    status: "COMING SOON",
    available: false,
    glowColor: "#FF2E9F",
    icon: "⛳",
  },
  {
    name: "GLOW PONG BALLS",
    status: "COMING SOON",
    available: false,
    glowColor: "#8F00FF",
    icon: "🏓",
  },
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
      className="relative min-h-screen bg-[#0A0A0F] py-24 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,46,159,0.03)_0%,transparent_50%),radial-gradient(circle_at_70%_50%,rgba(143,0,255,0.03)_0%,transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <p
            className="text-neon-purple text-sm tracking-[0.3em] mb-4 uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Product Line
          </p>
          <h2
            className="text-4xl md:text-6xl font-black text-glow-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            THE GLOW
            <br />
            <span className="gradient-text-cyan-purple">COLLECTION.</span>
          </h2>
        </motion.div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          {upcomingProducts.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              whileHover={{
                y: -10,
                rotateY: 5,
                rotateX: -5,
              }}
              className="group relative"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative bg-surface border border-glow-white/5 p-8 text-center transition-all duration-500 group-hover:border-current/30"
                style={{
                  ["--tw-border-opacity" as string]: 1,
                  borderColor: `${product.glowColor}10`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `inset 0 0 30px ${product.glowColor}10, 0 0 30px ${product.glowColor}10`,
                  }}
                />

                {/* Icon */}
                <div className="text-6xl mb-6">{product.icon}</div>

                {/* Name */}
                <h3
                  className="text-xl font-bold text-glow-white tracking-[0.2em] mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {product.name}
                </h3>

                {/* Status */}
                <span
                  className="inline-block text-xs tracking-[0.2em] px-4 py-1.5 border"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: product.glowColor,
                    borderColor: `${product.glowColor}40`,
                    boxShadow: product.available
                      ? `0 0 10px ${product.glowColor}20`
                      : "none",
                  }}
                >
                  {product.status}
                </span>

                {/* Neon line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: product.glowColor }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Email capture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto text-center"
        >
          <h3
            className="text-xl font-bold text-glow-white tracking-[0.15em] mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            GET EARLY ACCESS
          </h3>
          <p className="text-glow-white/50 text-sm mb-6">
            Be the first to know when new products drop.
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-neon-cyan tracking-wider"
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
                className="flex-1 bg-surface border border-glow-white/10 px-4 py-3 text-glow-white placeholder-glow-white/30 text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-neon-pink text-white text-sm font-bold tracking-[0.15em] uppercase hover:bg-neon-pink/90 transition-colors neon-pulse cursor-pointer"
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
