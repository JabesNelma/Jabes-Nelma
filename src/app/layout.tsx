import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

// Use system fonts instead of Google Fonts (better with Turbopack)
const systemFontStack = 'system-ui, -apple-system, sans-serif';
const monoFontStack = '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace';

export const metadata: Metadata = {
  title: {
    default: "Jabes Nelma Portfolio",
    template: "%s | Jabes Nelma Portfolio",
  },
  description: "A personal portfolio website showcasing projects, skills, and experience.",
  keywords: ["Portfolio", "Developer", "Projects", "Skills", "Experience", "Blog"],
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
      <head>
        <style>{`
          :root {
            --font-geist-sans: ${systemFontStack};
            --font-geist-mono: ${monoFontStack};
          }
        `}</style>
      </head>
      <body
        className="antialiased bg-background text-foreground"
        style={{
          fontFamily: systemFontStack,
        } as React.CSSProperties}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
