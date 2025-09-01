import type { Metadata } from "next";
import { Inter, Fredoka, Quicksand } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "NGO Connect - Connect, Help, Impact",
  description: "Connect with NGOs in your area and make a difference. Post requests for help and earn Impact XP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fredoka.variable} ${quicksand.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
