"use client";

import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#050508] border-t border-neon-pink/[0.09]">
      <div className="max-w-[84.72rem] mx-auto px-[1.25rem] py-[3.25rem]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[3.25rem]">
          <div className="md:col-span-2">
            <h2
              className="text-[1.625rem] font-black tracking-[0.262em] mb-[1.25rem]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-glow-white">BLACK OUT</span>{" "}
              <span className="text-neon-cyan">SUPPLY</span>
            </h2>
            <p className="text-glow-white/[0.382] max-w-[20rem] leading-relaxed">
              Premium glow-in-the-dark products engineered for the after hours.
              When the lights go out, we glow.
            </p>
            <div className="flex gap-[1.25rem] mt-[1.25rem]">
              <a
                href="#"
                className="text-glow-white/[0.382] hover:text-neon-pink transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-glow-white/[0.382] hover:text-neon-cyan transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3
              className="text-[0.625rem] tracking-[0.162em] text-neon-pink mb-[1.25rem] uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Shop
            </h3>
            <ul className="space-y-[0.75rem]">
              <li>
                <Link
                  href="/shop"
                  className="text-glow-white/[0.382] hover:text-glow-white transition-colors text-[0.625rem]"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/glow-dice-set"
                  className="text-glow-white/[0.382] hover:text-glow-white transition-colors text-[0.625rem]"
                >
                  Glow Dice
                </Link>
              </li>
              <li>
                <span className="text-glow-white/[0.236] text-[0.625rem]">
                  Golf Balls (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-glow-white/[0.236] text-[0.625rem]">
                  Pong Balls (Coming Soon)
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className="text-[0.625rem] tracking-[0.162em] text-neon-cyan mb-[1.25rem] uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Company
            </h3>
            <ul className="space-y-[0.75rem]">
              <li>
                <Link
                  href="#founders"
                  className="text-glow-white/[0.382] hover:text-glow-white transition-colors text-[0.625rem]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-glow-white/[0.382] hover:text-glow-white transition-colors text-[0.625rem]"
                >
                  Campus Ambassadors
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-glow-white/[0.382] hover:text-glow-white transition-colors text-[0.625rem]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[3.25rem] pt-[2rem] border-t border-glow-white/[0.09] flex flex-col md:flex-row justify-between items-center gap-[1.25rem]">
          <p className="text-glow-white/[0.236] text-[0.625rem] tracking-[0.1em]">
            &copy; {new Date().getFullYear()} BLACK OUT SUPPLY. ALL RIGHTS
            RESERVED.
          </p>
          <p className="text-glow-white/[0.146] text-[0.625rem] tracking-[0.1em]">
            FOUNDED BY TROY KASHUL & GAETANO CARBONARA
          </p>
        </div>
      </div>
    </footer>
  );
}
