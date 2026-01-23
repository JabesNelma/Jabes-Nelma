import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jabes Nelma | Junior Frontend Engineer",
  description: "Professional portfolio of a junior frontend engineer who is continuously learning and exploring web3 and backend technologies",
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