import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/providers/tanstack-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ParentNestly",
  description: "Your modern parenting resource platform",
  keywords: ["Parenting", "Children", "Tips", "Family", "ParentNestly"],
  authors: [{ name: "ParentNestly Team", url: "https://parentnestly.com" }],
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Tanstack Query Provider */}
        <TanstackProvider>
          {/* Global Toaster for notifications */}
          <Toaster position="top-right" richColors />
          {/* Main children */}
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
