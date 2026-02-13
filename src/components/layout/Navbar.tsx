"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
/*
  File: src/components/layout/Navbar.tsx
  - Responsive navbar: GooeyNav on desktop, hamburger menu on mobile.
*/

const GooeyNav = dynamic(() => import("@/components/ui/GooeyNav"), { ssr: false });

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollToHash = (hash: string) => {
    try {
      const el = document.querySelector(hash);
      if (el) {
        (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch {}
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tight">
          <a href="#hero" className="inline-block px-2 py-1 rounded-md hover:bg-white/6 transition">JN</a>
        </div>

        {/* Desktop: GooeyNav */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="backdrop-blur-sm bg-white/2 rounded-full px-4 py-2">
            <GooeyNav items={navLinks} />
          </div>
        </div>

        {/* Mobile: Hamburger button */}
        <button
          type="button"
          className="md:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full origin-center"
            animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full"
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full origin-center"
            animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile: Full-screen overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-gray-950/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              className="relative flex flex-col items-center justify-center h-full gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-semibold text-gray-300 hover:text-white py-3 px-8 rounded-xl hover:bg-white/5 transition-all duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.05 * i + 0.15 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => scrollToHash(link.href), 300);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Decorative gradient line */}
              <motion.div
                className="mt-6 w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}