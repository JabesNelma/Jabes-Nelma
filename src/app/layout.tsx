import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jabes Nelma Portfolio",
    template: "%s | Jabes Nelma Portfolio",
  },
  description: "A personal portfolio website showcasing projects, skills, and experience.",
  keywords: ["Portfolio", "Developer", "Projects", "Skills", "Experience"],
  authors: [{ name: "Jabes Nelma" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Jabes Nelma Portfolio",
    description: "A personal portfolio website showcasing projects, skills, and experience.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jabes Nelma Portfolio",
    description: "A personal portfolio website showcasing projects, skills, and experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
