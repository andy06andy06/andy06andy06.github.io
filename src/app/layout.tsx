import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cheng-En Chiang | Machine Learning Engineer",
  description: "Portfolio of Cheng-En Chiang, a Machine Learning Engineer and Researcher specializing in computer vision, deep learning, and autonomous systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} antialiased overflow-hidden h-screen w-screen bg-transparent`}>
        {children}
      </body>
    </html>
  );
}
