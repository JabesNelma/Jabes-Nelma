import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jabes Nelma | Senior Frontend Engineer",
  description: "Professional portfolio of a senior frontend engineer specializing in web3 and backend technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body 
        className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}