"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface NeonButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "pink" | "cyan" | "purple";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/* Fibonacci blur: 13px idle → 21px hover
   φ-inverse opacity: 0.382 idle → 0.618 hover */
const colorMap = {
  pink: {
    bg: "bg-neon-pink",
    hover: "hover:bg-neon-pink/[0.9]",
    shadow: "shadow-[0_0_13px_rgba(255,46,159,0.382)]",
    hoverShadow: "hover:shadow-[0_0_21px_rgba(255,46,159,0.618)]",
    text: "text-white",
    border: "border-neon-pink",
  },
  cyan: {
    bg: "bg-transparent",
    hover: "hover:bg-neon-cyan/[0.09]",
    shadow: "shadow-[0_0_13px_rgba(0,245,255,0.236)]",
    hoverShadow: "hover:shadow-[0_0_21px_rgba(0,245,255,0.382)]",
    text: "text-neon-cyan",
    border: "border-neon-cyan",
  },
  purple: {
    bg: "bg-transparent",
    hover: "hover:bg-neon-purple/[0.09]",
    shadow: "shadow-[0_0_13px_rgba(143,0,255,0.236)]",
    hoverShadow: "hover:shadow-[0_0_21px_rgba(143,0,255,0.382)]",
    text: "text-neon-purple",
    border: "border-neon-purple",
  },
};

/* Golden ratio padding x:y ≈ φ:1
   sm: 20:12 = 1.67  md: 32:20 = 1.6  lg: 52:32 = 1.625 */
const sizeMap = {
  sm: "px-[1.25rem] py-[0.75rem] text-[0.625rem]",
  md: "px-[2rem] py-[1.25rem] text-[0.625rem]",
  lg: "px-[3.25rem] py-[2rem] text-[1rem]",
};

export default function NeonButton({
  href,
  onClick,
  children,
  variant = "pink",
  size = "md",
  className = "",
}: NeonButtonProps) {
  const colors = colorMap[variant];
  const sizeClass = sizeMap[size];

  const buttonClasses = `
    inline-block ${colors.bg} ${colors.hover} ${colors.text}
    ${sizeClass} border ${colors.border}
    ${colors.shadow} ${colors.hoverShadow}
    tracking-[0.162em] uppercase font-bold
    transition-all duration-300 cursor-pointer
    ${className}
  `.trim();

  const MotionComponent = href ? motion.create(Link) : motion.button;

  return (
    <MotionComponent
      href={href || ""}
      onClick={onClick}
      className={buttonClasses}
      style={{ fontFamily: "var(--font-heading)" }}
      whileHover={{ scale: 1.047 }}
      whileTap={{ scale: 0.952 }}
    >
      {children}
    </MotionComponent>
  );
}
