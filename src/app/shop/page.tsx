"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/products";

const easeEntry: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] pt-[8.5rem] pb-[5.25rem]">
      <div className="max-w-[84.72rem] mx-auto px-[1.25rem]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeEntry }}
          className="text-center mb-[3.25rem]"
        >
          <p
            className="text-neon-pink text-[0.625rem] tracking-[0.262em] mb-[1.25rem] uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Collection
          </p>
          <h1
            className="text-[2.625rem] md:text-[4.25rem] font-black text-glow-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            SHOP
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.185, ease: easeEntry }}
            >
              <Link
                href={product.available ? `/shop/${product.slug}` : "#"}
                className={`group block ${!product.available ? "cursor-default" : ""}`}
              >
                <div className="relative bg-surface border border-glow-white/[0.09] overflow-hidden transition-all duration-500 group-hover:border-glow-white/[0.09]">
                  <div className="aspect-square relative overflow-hidden">
                    <div
                      className="absolute inset-0 transition-all duration-[800ms]"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${product.glowColor}15 0%, transparent 60%)`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 21, repeat: Infinity, ease: "linear" }}
                        className="text-[6.875rem] opacity-[0.236] group-hover:opacity-[0.618] transition-opacity duration-500"
                        style={{ filter: `drop-shadow(0 0 21px ${product.glowColor})` }}
                      >
                        {product.category === "dice" ? "🎲" : product.category === "golf" ? "⛳" : "🏓"}
                      </motion.div>
                    </div>

                    {product.comingSoon && (
                      <div className="absolute inset-0 bg-[#0A0A0F]/[0.618] flex items-center justify-center">
                        <span
                          className="text-[0.625rem] tracking-[0.262em] uppercase border px-[2rem] py-[0.5rem]"
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

                  <div className="p-[1.25rem]">
                    <h3
                      className="text-[1.625rem] font-bold text-glow-white tracking-[0.162em]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-glow-white/[0.382] text-[0.625rem] mt-[0.25rem]">
                      {product.tagline}
                    </p>
                    <div className="flex items-center justify-between mt-[1.25rem]">
                      <div className="flex items-center gap-3">
                        <span className="text-[1.625rem] font-bold" style={{ color: product.glowColor }}>
                          ${product.price}
                        </span>
                        {product.comparePrice && (
                          <span className="text-glow-white/[0.236] line-through text-[0.625rem]">
                            ${product.comparePrice}
                          </span>
                        )}
                      </div>
                      {product.available && (
                        <span className="text-neon-cyan text-[0.625rem] tracking-[0.1em] uppercase">
                          In Stock
                        </span>
                      )}
                    </div>
                  </div>

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
