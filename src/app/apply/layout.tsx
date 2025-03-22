"use client";

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-specpurple`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
