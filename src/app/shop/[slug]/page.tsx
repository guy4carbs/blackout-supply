"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import { getProduct } from "@/lib/products";
import NeonButton from "@/components/ui/NeonButton";
import { ShoppingBag, Zap, Shield, Clock, Star } from "lucide-react";

const GlowDice = dynamic(() => import("@/components/3d/GlowDice"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-surface animate-pulse" />,
});

const easeEntry: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

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
      <main className="min-h-screen bg-[#0A0A0F] pt-[8.5rem] flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-[2.625rem] font-black text-glow-white mb-[1.25rem]"
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
        body: JSON.stringify({ productId: product.id, quantity }),
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
    <main className="min-h-screen bg-[#0A0A0F] pt-[8.5rem] pb-[5.25rem]">
      <div className="max-w-[84.72rem] mx-auto px-[1.25rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[3.25rem] items-start">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeEntry }}
          >
            <div className="aspect-square bg-surface border border-glow-white/[0.09] relative overflow-hidden">
              <GlowDice interactive glowIntensity={1.5} color={activeMode.color} />
            </div>

            <div className="flex gap-3 mt-[1.25rem]">
              {lightingModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode)}
                  className={`flex-1 px-[1.25rem] py-[0.5rem] text-[0.625rem] tracking-[0.162em] uppercase border transition-all duration-300 cursor-pointer ${
                    activeMode.id === mode.id ? "opacity-100" : "opacity-[0.382] hover:opacity-[0.618]"
                  }`}
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: mode.color,
                    borderColor: activeMode.id === mode.id ? mode.color : "#ffffff15",
                    boxShadow: activeMode.id === mode.id ? `0 0 13px ${mode.color}3D` : "none",
                  }}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.185, ease: easeEntry }}
            className="space-y-[2rem]"
          >
            <div>
              <p
                className="text-neon-pink text-[0.625rem] tracking-[0.262em] mb-[0.5rem] uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Black Out Supply
              </p>
              <h1
                className="text-[2.625rem] font-black text-glow-white tracking-[0.1em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {product.name}
              </h1>
              <p className="text-glow-white/[0.618] mt-[0.75rem]">{product.tagline}</p>
            </div>

            <div className="flex items-center gap-[1.25rem]">
              <span className="text-[2.625rem] font-bold text-neon-cyan">${product.price}</span>
              {product.comparePrice && (
                <span className="text-glow-white/[0.236] line-through text-[1rem]">${product.comparePrice}</span>
              )}
              {product.comparePrice && (
                <span className="text-neon-pink text-[0.625rem] tracking-[0.1em] uppercase bg-neon-pink/[0.09] px-[0.75rem] py-[0.25rem]">
                  SAVE ${(product.comparePrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-glow-white/[0.618] leading-relaxed">{product.description}</p>

            <ul className="space-y-[0.75rem]">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-glow-white/[0.618]">
                  <Zap size={13} className="text-neon-cyan flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div>
              <label className="text-[0.625rem] text-glow-white/[0.382] tracking-[0.1em] uppercase block mb-[0.5rem]">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-[2.5rem] h-[2.5rem] border border-glow-white/[0.09] text-glow-white/[0.618] hover:border-neon-cyan/[0.382] transition-colors flex items-center justify-center cursor-pointer"
                >
                  −
                </button>
                <span className="w-[3rem] text-center text-glow-white text-[1rem] font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-[2.5rem] h-[2.5rem] border border-glow-white/[0.09] text-glow-white/[0.618] hover:border-neon-cyan/[0.382] transition-colors flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-[0.75rem]">
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full py-[1.25rem] bg-neon-pink text-white text-[0.625rem] font-bold tracking-[0.162em] uppercase hover:bg-neon-pink/[0.9] transition-all neon-pulse flex items-center justify-center gap-3 cursor-pointer disabled:opacity-[0.382]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <ShoppingBag size={18} />
                {isLoading ? "PROCESSING..." : `BUY NOW — $${(product.price * quantity).toFixed(2)}`}
              </button>
              <p className="text-center text-glow-white/[0.236] text-[0.625rem] tracking-[0.1em]">
                SECURE CHECKOUT WITH STRIPE • APPLE PAY • GOOGLE PAY
              </p>
            </div>

            <div className="grid grid-cols-3 gap-[1.25rem] pt-[1.25rem] border-t border-glow-white/[0.09]">
              <div className="text-center">
                <Shield size={20} className="text-neon-cyan mx-auto mb-[0.25rem]" />
                <p className="text-[0.625rem] text-glow-white/[0.382]">Secure Checkout</p>
              </div>
              <div className="text-center">
                <Clock size={20} className="text-neon-cyan mx-auto mb-[0.25rem]" />
                <p className="text-[0.625rem] text-glow-white/[0.382]">Fast Shipping</p>
              </div>
              <div className="text-center">
                <Star size={20} className="text-neon-cyan mx-auto mb-[0.25rem]" />
                <p className="text-[0.625rem] text-glow-white/[0.382]">5-Star Rated</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specs */}
        {product.specs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeEntry }}
            viewport={{ once: true }}
            className="mt-[5.25rem]"
          >
            <h2
              className="text-[1.625rem] font-bold text-glow-white tracking-[0.162em] mb-[2rem] text-center"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              SPECIFICATIONS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[1.25rem] max-w-[52.36rem] mx-auto">
              {product.specs.map((spec, i) => (
                <div key={i} className="bg-surface border border-glow-white/[0.09] p-[1.25rem] text-center">
                  <p className="text-glow-white/[0.382] text-[0.625rem] tracking-[0.1em] uppercase mb-[0.25rem]">
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
          transition={{ duration: 0.8, ease: easeEntry }}
          viewport={{ once: true }}
          className="mt-[5.25rem]"
        >
          <h2
            className="text-[1.625rem] font-bold text-glow-white tracking-[0.162em] mb-[2rem] text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            REVIEWS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.25rem] max-w-[52.36rem] mx-auto">
            {reviews.map((review, i) => (
              <div key={i} className="bg-surface border border-glow-white/[0.09] p-[1.25rem]">
                <div className="flex gap-[0.25rem] mb-[0.75rem]">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={13} className="text-neon-pink fill-neon-pink" />
                  ))}
                </div>
                <p className="text-glow-white/[0.618] text-[0.625rem] leading-relaxed mb-[1.25rem]">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <p className="text-glow-white font-bold text-[0.625rem]">{review.name}</p>
                  <p className="text-glow-white/[0.236] text-[0.625rem]">{review.school}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
