import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maitra Commodities – Trusted Online Stock Trading Broker in India",
  description:
    "Redefining wealth management in India. Access flat-rate stockbroking, sub-millisecond execution, robust developer REST/WebSocket APIs, mutual funds, and wealth protection.",
  keywords: [
    "Maitra Commodities",
    "Maitra Wealth",
    "Stock Trading Broker India",
    "Lowest Brokerage Stock Broker",
    "Algorithmic Trading API",
    "Demat Account",
    "Mutual Funds SIP",
    "Wealth Management Chennai",
  ],
  authors: [{ name: "Maitra Commodities" }],
  openGraph: {
    title: "Maitra Commodities – Redefined Wealth Management",
    description: "Experience ultra-premium dark luxury fintech trading with low fees and high-speed execution.",
    url: "https://maitrawealth.com",
    siteName: "Maitra Commodities",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${displayFont.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
