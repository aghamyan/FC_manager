import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "FC Manager",
  description: "Tournament management platform with secure authentication.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-slate-950">
      <body className="min-h-screen">
        <Providers>
          <Navbar />
          <main className="container py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
