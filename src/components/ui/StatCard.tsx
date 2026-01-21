"use client";
/*
  File: src/components/ui/StatCard.tsx
  Deskripsi (ID):
  - Komponen kecil yang menampilkan angka dengan animasi naik (counter) dan label.
  - Props: `value` (angka target), `label` (teks di bawah), `colorClass` untuk warna.

  Titik edit:
  - Untuk mengganti durasi animasi, ubah prop `duration` saat memanggil komponen.
  - Styling Tailwind di elemen root dapat diubah untuk menyesuaikan background/border.
*/

import React, { useEffect, useState } from 'react';

interface StatCardProps {
  value: number;
  label: string;
  colorClass?: string;
  suffix?: string;
  duration?: number;
}

export default function StatCard({ value, label, colorClass = 'text-blue-400', suffix = '+', duration = 900 }: StatCardProps) {
  const [num, setNum] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // simple ease
      const current = Math.round(eased * value);
      setNum(current);
      if (t < 1) raf = requestAnimationFrame(step);
      else setNum(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    // Root: ubah kelas Tailwind untuk menyesuaikan visual stat card
    <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700 subtle-hover transform-gpu transition-transform">
      {/* Nilai animasi */}
      <div className={`text-3xl font-bold mb-2 ${colorClass}`}>{num}{suffix}</div>
      {/* Label */}
      <div className="text-gray-300">{label}</div>
    </div>
  );
}
