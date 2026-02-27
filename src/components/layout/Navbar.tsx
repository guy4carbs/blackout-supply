"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#products", label: "PRODUCTS" },
    { href: "#story", label: "STORY" },
    { href: "#founders", label: "FOUNDERS" },
    { href: "/shop", label: "SHOP" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0A0A0F]/[0.9] backdrop-blur-xl border-b border-neon-pink/[0.09]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[84.72rem] mx-auto px-[1.25rem] py-[1.25rem] flex items-center justify-between">
          <Link href="/" className="group">
            <h1
              className="text-[1.625rem] font-black tracking-[0.262em] uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-glow-white group-hover:text-neon-pink transition-colors duration-300">
                BLACK OUT
              </span>{" "}
              <span className="text-neon-cyan group-hover:text-neon-purple transition-colors duration-300">
                SUPPLY
              </span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-[2rem]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.625rem] tracking-[0.162em] text-glow-white/[0.618] hover:text-neon-cyan transition-colors duration-300 uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              className="relative p-[0.5rem] text-glow-white/[0.618] hover:text-neon-pink transition-colors duration-300"
            >
              <ShoppingBag size={20} />
            </Link>
          </div>

          <button
            className="md:hidden text-glow-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="fixed inset-0 z-40 bg-[#0A0A0F]/[0.98] backdrop-blur-xl pt-[5.25rem]"
          >
            <div className="flex flex-col items-center gap-[2rem] p-[2rem]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[1.625rem] tracking-[0.262em] text-glow-white hover:text-neon-cyan transition-colors duration-300 uppercase"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
