import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const heading = Orbitron({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BLACK OUT SUPPLY | Own The Night",
  description:
    "Premium glow-in-the-dark dice, golf balls, and ping pong balls. Engineered for the after hours. When the lights go out, we glow.",
  keywords: [
    "glow in the dark dice",
    "party dice",
    "frat party",
    "glow products",
    "night games",
    "Black Out Supply",
  ],
  openGraph: {
    title: "BLACK OUT SUPPLY | Own The Night",
    description: "Premium glow-in-the-dark products. When the lights go out, we glow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${heading.variable} ${body.variable} antialiased bg-background text-foreground`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
