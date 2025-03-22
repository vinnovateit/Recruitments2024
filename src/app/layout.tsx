import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Join VinnovateIT 2025",
  description: "Join VinnovateIT 2025",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body className={`font-sans ${inter.variable} bg-specpurple pointer`}>{children}</body>
    </html>
  );
}