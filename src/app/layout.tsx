import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Banter - chatGPT vs chatGPT!",
  description:
    "Pit chatGPT against itself with custom personality profiles!",
  openGraph: {
    images: "/assets/og-image.png",
    title: "AI Banter - chatGPT vs chatGPT!",
    description:
      "Pit chatGPT against itself with custom personality profiles!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
