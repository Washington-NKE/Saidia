import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {Toaster} from '@/components/ui/sonner';
import Link from 'next/link';
import {Heart, Menu} from 'lucide-react';
import { Button } from '@/components/ui/button';
import "./globals.css";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";

const inter = Inter({ subsets: ['latin']})

export const metadata: Metadata = {
  title: "Saidia App",
  description: "Support meaningful campaigns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-slate-50">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
