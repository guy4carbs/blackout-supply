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

const colorMap = {
  pink: {
    bg: "bg-neon-pink",
    hover: "hover:bg-neon-pink/90",
    shadow: "shadow-[0_0_20px_rgba(255,46,159,0.4)]",
    hoverShadow: "hover:shadow-[0_0_30px_rgba(255,46,159,0.6)]",
    text: "text-white",
    border: "border-neon-pink",
  },
  cyan: {
    bg: "bg-transparent",
    hover: "hover:bg-neon-cyan/10",
    shadow: "shadow-[0_0_15px_rgba(0,245,255,0.2)]",
    hoverShadow: "hover:shadow-[0_0_25px_rgba(0,245,255,0.4)]",
    text: "text-neon-cyan",
    border: "border-neon-cyan",
  },
  purple: {
    bg: "bg-transparent",
    hover: "hover:bg-neon-purple/10",
    shadow: "shadow-[0_0_15px_rgba(143,0,255,0.2)]",
    hoverShadow: "hover:shadow-[0_0_25px_rgba(143,0,255,0.4)]",
    text: "text-neon-purple",
    border: "border-neon-purple",
  },
};

const sizeMap = {
  sm: "px-5 py-2 text-xs",
  md: "px-8 py-3 text-sm",
  lg: "px-10 py-4 text-base",
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
    tracking-[0.2em] uppercase font-bold
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </MotionComponent>
  );
}
