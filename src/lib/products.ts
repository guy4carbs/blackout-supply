export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  comparePrice?: number;
  description: string;
  features: string[];
  available: boolean;
  comingSoon: boolean;
  images: string[];
  category: string;
  glowColor: string;
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    id: "glow-dice-set",
    slug: "glow-dice-set",
    name: "GLOW DICE SET",
    tagline: "Engineered For The After Hours",
    price: 24.99,
    comparePrice: 34.99,
    description:
      "Premium glow-in-the-dark dice set. Precision-balanced, high-visibility glow resin that charges under any light source. Dominate every game when the lights go out.",
    features: [
      "High-visibility glow resin",
      "Precision-balanced for fair rolls",
      "Long-lasting illumination (8+ hours)",
      "Durable drop resistance",
      "Charges under any light source",
      "Set of 6 dice",
    ],
    available: true,
    comingSoon: false,
    images: ["/images/dice-glow-1.jpg"],
    category: "dice",
    glowColor: "#00F5FF",
    specs: [
      { label: "Material", value: "Premium Glow Resin" },
      { label: "Glow Duration", value: "8+ Hours" },
      { label: "Set Contents", value: "6 Dice" },
      { label: "Charge Time", value: "5-10 Minutes" },
      { label: "Size", value: "16mm Standard" },
      { label: "Weight", value: "Tournament Grade" },
    ],
  },
  {
    id: "glow-golf-balls",
    slug: "glow-golf-balls",
    name: "GLOW GOLF BALLS",
    tagline: "Night Golf. Reinvented.",
    price: 29.99,
    description:
      "Professional-grade glow-in-the-dark golf balls. Visible up to 100 yards in complete darkness. Perfect for night golf events and campus tournaments.",
    features: [
      "Visible up to 100 yards",
      "Tournament-grade construction",
      "Long-lasting glow technology",
      "All-weather durability",
    ],
    available: false,
    comingSoon: true,
    images: ["/images/golf-glow-1.jpg"],
    category: "golf",
    glowColor: "#FF2E9F",
    specs: [],
  },
  {
    id: "glow-pong-balls",
    slug: "glow-pong-balls",
    name: "GLOW PONG BALLS",
    tagline: "Pong. After Dark.",
    price: 19.99,
    description:
      "Glow-in-the-dark ping pong balls built for beer pong and party games. Regulation size, incredible glow, unforgettable games.",
    features: [
      "Regulation size and weight",
      "Ultra-bright glow formula",
      "Waterproof coating",
      "Party-proof durability",
    ],
    available: false,
    comingSoon: true,
    images: ["/images/pong-glow-1.jpg"],
    category: "pong",
    glowColor: "#8F00FF",
    specs: [],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAvailableProducts(): Product[] {
  return products.filter((p) => p.available);
}
