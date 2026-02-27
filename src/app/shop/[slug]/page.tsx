"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import { getProduct, products } from "@/lib/products";
import NeonButton from "@/components/ui/NeonButton";
import { ShoppingBag, Zap, Shield, Clock, Star } from "lucide-react";

const GlowDice = dynamic(() => import("@/components/3d/GlowDice"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-surface animate-pulse" />,
});

const lightingModes = [
  { id: "uv", label: "UV LIGHT", color: "#8F00FF" },
  { id: "dark", label: "DARKNESS", color: "#00F5FF" },
  { id: "party", label: "PARTY", color: "#FF2E9F" },
];

const reviews = [
  {
    name: "Jake M.",
    school: "University of Miami",
    rating: 5,
    text: "These dice literally changed our Thursday nights. The whole house goes dark and these things light up the room.",
  },
  {
    name: "Tyler R.",
    school: "Arizona State",
    rating: 5,
    text: "Bought these for our darty and people wouldn't stop asking where we got them. Premium quality.",
  },
  {
    name: "Marcus D.",
    school: "Penn State",
    rating: 5,
    text: "Best party purchase we've made all year. The glow lasts all night. Absolute game changer.",
  },
];

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = getProduct(slug);
  const [activeMode, setActiveMode] = useState(lightingModes[1]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#0A0A0F] pt-28 flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-4xl font-black text-glow-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            PRODUCT NOT FOUND
          </h1>
          <NeonButton href="/shop" variant="cyan">
            Back to Shop
          </NeonButton>
        </div>
      </main>
    );
  }

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Checkout is not configured yet. Add your Stripe keys to .env.local");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0F] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square bg-surface border border-glow-white/5 relative overflow-hidden">
              <GlowDice
                interactive
                glowIntensity={1.5}
                color={activeMode.color}
              />
            </div>

            {/* Lighting toggles */}
            <div className="flex gap-3 mt-4">
              {lightingModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode)}
                  className={`flex-1 px-4 py-2.5 text-xs tracking-[0.15em] uppercase border transition-all duration-300 cursor-pointer ${
                    activeMode.id === mode.id
                      ? "opacity-100"
                      : "opacity-40 hover:opacity-60"
                  }`}
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: mode.color,
                    borderColor: activeMode.id === mode.id ? mode.color : "#ffffff15",
                    boxShadow:
                      activeMode.id === mode.id
                        ? `0 0 15px ${mode.color}30`
                        : "none",
                  }}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p
                className="text-neon-pink text-sm tracking-[0.3em] mb-2 uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Black Out Supply
              </p>
              <h1
                className="text-4xl md:text-5xl font-black text-glow-white tracking-wider"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {product.name}
              </h1>
              <p className="text-glow-white/60 mt-3">{product.tagline}</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-neon-cyan">
                ${product.price}
              </span>
              {product.comparePrice && (
                <span className="text-glow-white/30 line-through text-lg">
                  ${product.comparePrice}
                </span>
              )}
              {product.comparePrice && (
                <span className="text-neon-pink text-sm tracking-wider uppercase bg-neon-pink/10 px-3 py-1">
                  SAVE ${(product.comparePrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-glow-white/60 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <ul className="space-y-3">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-glow-white/70">
                  <Zap size={14} className="text-neon-cyan flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Quantity */}
            <div>
              <label className="text-sm text-glow-white/50 tracking-wider uppercase block mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-glow-white/10 text-glow-white/70 hover:border-neon-cyan/50 transition-colors flex items-center justify-center cursor-pointer"
                >
                  −
                </button>
                <span className="w-12 text-center text-glow-white text-lg font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 border border-glow-white/10 text-glow-white/70 hover:border-neon-cyan/50 transition-colors flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Checkout buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full py-4 bg-neon-pink text-white text-sm font-bold tracking-[0.2em] uppercase hover:bg-neon-pink/90 transition-all neon-pulse flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <ShoppingBag size={18} />
                {isLoading ? "PROCESSING..." : `BUY NOW — $${(product.price * quantity).toFixed(2)}`}
              </button>
              <p className="text-center text-glow-white/30 text-xs tracking-wider">
                SECURE CHECKOUT WITH STRIPE • APPLE PAY • GOOGLE PAY
              </p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-glow-white/5">
              <div className="text-center">
                <Shield size={20} className="text-neon-cyan mx-auto mb-1" />
                <p className="text-xs text-glow-white/40">Secure Checkout</p>
              </div>
              <div className="text-center">
                <Clock size={20} className="text-neon-cyan mx-auto mb-1" />
                <p className="text-xs text-glow-white/40">Fast Shipping</p>
              </div>
              <div className="text-center">
                <Star size={20} className="text-neon-cyan mx-auto mb-1" />
                <p className="text-xs text-glow-white/40">5-Star Rated</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specs */}
        {product.specs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <h2
              className="text-2xl font-bold text-glow-white tracking-[0.2em] mb-8 text-center"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              SPECIFICATIONS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className="bg-surface border border-glow-white/5 p-4 text-center"
                >
                  <p className="text-glow-white/40 text-xs tracking-wider uppercase mb-1">
                    {spec.label}
                  </p>
                  <p className="text-glow-white font-bold">{spec.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2
            className="text-2xl font-bold text-glow-white tracking-[0.2em] mb-8 text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            REVIEWS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-surface border border-glow-white/5 p-6"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="text-neon-pink fill-neon-pink"
                    />
                  ))}
                </div>
                <p className="text-glow-white/60 text-sm leading-relaxed mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <p className="text-glow-white font-bold text-sm">
                    {review.name}
                  </p>
                  <p className="text-glow-white/30 text-xs">{review.school}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
