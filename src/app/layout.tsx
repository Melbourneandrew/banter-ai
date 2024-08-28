import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Banter - ChatGPT vs ChatGPT!",
  description:
    "Pit ChatGPT against itself with custom personality profiles!",
  openGraph: {
    images: [
      {
        url: "https://banter.melbournedev.com/assets/banter-ai-logo.png",
      },
    ],
    title: "AI Banter - ChatGPT vs ChatGPT!",
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
      <head>
        <link rel="icon" href="/assets/banter-ai-logo.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
