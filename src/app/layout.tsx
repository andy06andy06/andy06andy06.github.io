import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cheng-En Chiang | AI Research Engineer",
  description: "Portfolio of Cheng-En Chiang, an AI Research Engineer specializing in computer vision, deep learning, and ML infrastructure.",
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
