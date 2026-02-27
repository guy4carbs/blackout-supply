"use client";

import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#050508] border-t border-neon-pink/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2
              className="text-2xl font-black tracking-[0.3em] mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-glow-white">BLACK OUT</span>{" "}
              <span className="text-neon-cyan">SUPPLY</span>
            </h2>
            <p className="text-glow-white/50 max-w-sm leading-relaxed">
              Premium glow-in-the-dark products engineered for the after hours.
              When the lights go out, we glow.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-glow-white/50 hover:text-neon-pink transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-glow-white/50 hover:text-neon-cyan transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3
              className="text-sm tracking-[0.2em] text-neon-pink mb-4 uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shop"
                  className="text-glow-white/50 hover:text-glow-white transition-colors text-sm"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/glow-dice-set"
                  className="text-glow-white/50 hover:text-glow-white transition-colors text-sm"
                >
                  Glow Dice
                </Link>
              </li>
              <li>
                <span className="text-glow-white/30 text-sm">
                  Golf Balls (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-glow-white/30 text-sm">
                  Pong Balls (Coming Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="text-sm tracking-[0.2em] text-neon-cyan mb-4 uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#founders"
                  className="text-glow-white/50 hover:text-glow-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-glow-white/50 hover:text-glow-white transition-colors text-sm"
                >
                  Campus Ambassadors
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-glow-white/50 hover:text-glow-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-glow-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-glow-white/30 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} BLACK OUT SUPPLY. ALL RIGHTS
            RESERVED.
          </p>
          <p className="text-glow-white/20 text-xs tracking-wider">
            FOUNDED BY TROY KASHUL & GAETANO CARBONARA
          </p>
        </div>
      </div>
    </footer>
  );
}
