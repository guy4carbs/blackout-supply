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
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-neon-pink/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <h1
              className="text-xl md:text-2xl font-black tracking-[0.3em] uppercase"
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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-[0.2em] text-glow-white/70 hover:text-neon-cyan transition-colors duration-300 uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              className="relative p-2 text-glow-white/70 hover:text-neon-pink transition-colors duration-300"
            >
              <ShoppingBag size={20} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-glow-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0F]/98 backdrop-blur-xl pt-24"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl tracking-[0.3em] text-glow-white hover:text-neon-cyan transition-colors duration-300 uppercase"
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
