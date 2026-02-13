"use client";
/*
  File: src/components/ui/StatCard.tsx
  - Komponen stat card dengan animasi counter dan hover tooltip modern.
*/

import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface StatCardProps {
  value: number;
  label: string;
  colorClass?: string;
  suffix?: string;
  duration?: number;
  /** Items to show in hover tooltip list */
  hoverItems?: string[];
}

export default function StatCard({
  value,
  label,
  colorClass = 'text-blue-400',
  suffix = '+',
  duration = 900,
  hoverItems,
}: StatCardProps) {
  const [num, setNum] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startTime = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const current = Math.round(eased * value);
      setNum(current);
      if (t < 1) raf = requestAnimationFrame(step);
      else setNum(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <div
      ref={cardRef}
      className="relative text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700 subtle-hover transform-gpu transition-transform cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Nilai animasi */}
      <div className={`text-3xl font-bold mb-2 ${colorClass}`}>
        {num}
        {suffix}
      </div>
      {/* Label */}
      <div className="text-gray-300">{label}</div>

      {/* Hover tooltip */}
      <AnimatePresence>
        {isHovered && hoverItems && hoverItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-3 w-72 max-h-72 overflow-y-auto rounded-xl border border-gray-700/80 bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/40"
          >
            {/* Arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-gray-900/95 border-l border-t border-gray-700/80" />

            <div className="relative p-4">
              <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${colorClass}`}>
                {label}
              </p>
              <ul className="space-y-1.5">
                {hoverItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-gray-300 py-1.5 px-2.5 rounded-lg hover:bg-gray-800/60 transition-colors"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        colorClass.replace('text-', 'bg-')
                      }`}
                    />
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
