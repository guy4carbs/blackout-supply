"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/products";
import NeonButton from "@/components/ui/NeonButton";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-neon-pink text-sm tracking-[0.3em] mb-4 uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Collection
          </p>
          <h1
            className="text-5xl md:text-7xl font-black text-glow-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            SHOP
          </h1>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link
                href={product.available ? `/shop/${product.slug}` : "#"}
                className={`group block ${!product.available ? "cursor-default" : ""}`}
              >
                <div className="relative bg-surface border border-glow-white/5 overflow-hidden transition-all duration-500 group-hover:border-glow-white/10">
                  {/* Product visual */}
                  <div className="aspect-square relative overflow-hidden">
                    <div
                      className="absolute inset-0 transition-all duration-700"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${product.glowColor}15 0%, transparent 60%)`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="text-8xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                        style={{
                          filter: `drop-shadow(0 0 20px ${product.glowColor})`,
                        }}
                      >
                        {product.category === "dice"
                          ? "🎲"
                          : product.category === "golf"
                          ? "⛳"
                          : "🏓"}
                      </motion.div>
                    </div>

                    {/* Coming soon overlay */}
                    {product.comingSoon && (
                      <div className="absolute inset-0 bg-[#0A0A0F]/60 flex items-center justify-center">
                        <span
                          className="text-sm tracking-[0.3em] uppercase border px-6 py-2"
                          style={{
                            fontFamily: "var(--font-heading)",
                            color: product.glowColor,
                            borderColor: `${product.glowColor}40`,
                          }}
                        >
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3
                      className="text-lg font-bold text-glow-white tracking-[0.15em]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-glow-white/50 text-sm mt-1">
                      {product.tagline}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xl font-bold"
                          style={{ color: product.glowColor }}
                        >
                          ${product.price}
                        </span>
                        {product.comparePrice && (
                          <span className="text-glow-white/30 line-through text-sm">
                            ${product.comparePrice}
                          </span>
                        )}
                      </div>
                      {product.available && (
                        <span className="text-neon-cyan text-xs tracking-wider uppercase">
                          In Stock
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div
                    className="h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ backgroundColor: product.glowColor }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
