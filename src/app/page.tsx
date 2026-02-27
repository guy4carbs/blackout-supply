"use client";

import dynamic from "next/dynamic";

const HeroSection = dynamic(
  () => import("@/components/sections/HeroSection"),
  { ssr: false }
);
const ProblemSection = dynamic(
  () => import("@/components/sections/ProblemSection"),
  { ssr: false }
);
const SolutionSection = dynamic(
  () => import("@/components/sections/SolutionSection"),
  { ssr: false }
);
const SocialProofSection = dynamic(
  () => import("@/components/sections/SocialProofSection"),
  { ssr: false }
);
const ComingSoonSection = dynamic(
  () => import("@/components/sections/ComingSoonSection"),
  { ssr: false }
);
const FoundersSection = dynamic(
  () => import("@/components/sections/FoundersSection"),
  { ssr: false }
);
const ShopPreviewSection = dynamic(
  () => import("@/components/sections/ShopPreviewSection"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <SocialProofSection />
      <ComingSoonSection />
      <FoundersSection />
      <ShopPreviewSection />
    </main>
  );
}
