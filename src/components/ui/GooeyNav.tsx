"use client";
/*
  File: src/components/ui/GooeyNav.tsx
  Deskripsi (ID):
  - Komponen navigasi "gooey" interaktif yang menampilkan efek partikel
    dan highlight saat item diklik.
  - Menggunakan `useState`, refs, dan efek DOM langsung sehingga harus
    dijalankan di client-side.

  Titik edit yang umum:
  - `items` prop: ubah label/href untuk menambahkan/ubah menu.
  - Parameter seperti `particleCount`, `animationTime` dapat diubah pada saat pemanggilan komponen.
  - Gaya efek terdapat pada tag <style> di dalam komponen — ubah bila perlu.
*/

import React, { useRef, useEffect, useState } from 'react';

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };
  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {}
        }, t);
      }, 30);
    }
  };
  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    } as Record<string, string>;
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const liEl = e.currentTarget;
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(liEl);
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current!.removeChild(p));
    }
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
  };

  // Smooth-scroll to target section when clicking nav
  const scrollToHash = (hash: string) => {
    try {
      const el = document.querySelector(hash);
      if (el && 'scrollIntoView' in el) {
        (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch {}
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick({ currentTarget: liEl } as unknown as React.MouseEvent<HTMLAnchorElement>, index);
      }
    }
  };
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  // Catatan: jika ingin menonaktifkan scroll-spy, hapus useEffect IntersectionObserver di atas.

  // Observe sections and update active nav item as user scrolls
  useEffect(() => {
    if (!items || items.length === 0) return;
    const observers: IntersectionObserver[] = [];
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      let bestIndex = -1;
      let bestRatio = 0;
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
          const id = entry.target.getAttribute('id');
          const idx = items.findIndex(it => it.href === `#${id}` || it.href === `#${entry.target.id}`);
          if (idx >= 0) {
            bestRatio = entry.intersectionRatio;
            bestIndex = idx;
          }
        }
      });
      if (bestIndex >= 0 && bestIndex !== activeIndex) {
        setActiveIndex(bestIndex);
      }
    };

    const io = new IntersectionObserver(handleIntersect, { threshold: [0.25, 0.5, 0.75] });
    items.forEach((it) => {
      try {
        const el = document.querySelector(it.href);
        if (el) {
          io.observe(el);
        }
      } catch {}
    });
    observers.push(io);
    return () => observers.forEach(o => o.disconnect());
  }, [items, activeIndex]);

  return (
    <>
      <style>{`/* GooeyNav styles */
          .effect { position: absolute; opacity: 1; pointer-events: none; display: grid; place-items: center; z-index: 1; }
          .effect.text { color: white; transition: color 0.3s ease; }
          .effect.text.active { color: white; }
          /* Ensure anchors remain visible when active/focused */
          ul[role="navigation"] a, ul a, li a { color: white !important; }
          a:focus, a:active, li:focus-within a, li.active a { color: white !important; }
          .effect.filter { filter: blur(6px) saturate(120%); mix-blend-mode: screen; }
          .effect.filter::before { content: ""; position: absolute; inset: -40px; z-index: -2; background: transparent; }
          .effect.filter::after { content: ""; position: absolute; inset: 0; background: rgba(255,255,255,0.06); transform: scale(0); opacity: 0; z-index: -1; border-radius: 9999px; }
          .effect.active::after { animation: pill 0.25s ease both; }
          @keyframes pill { to { transform: scale(1); opacity: 1; } }
          .particle, .point { display: block; opacity: 0; width: 18px; height: 18px; border-radius: 9999px; transform-origin: center; }
          .particle { --time: 5s; position: absolute; top: calc(50% - 8px); left: calc(50% - 8px); animation: particle calc(var(--time)) ease 1 -350ms; }
          .point { background: var(--color); opacity: 1; animation: point calc(var(--time)) ease 1 -350ms; }
          @keyframes particle { 0% { transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y))); opacity: 1; } 70% { transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2)); opacity: 1; } 85% { transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y))); opacity: 1; } 100% { transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5)); opacity: 1; } }
          @keyframes point { 0% { transform: scale(0); opacity: 0; } 25% { transform: scale(calc(var(--scale) * 0.25)); } 38% { opacity: 1; } 65% { transform: scale(var(--scale)); opacity: 1; } 85% { transform: scale(var(--scale)); opacity: 1; } 100% { transform: scale(0); opacity: 0; } }
          li.active { color: white; }
          li.active::after { opacity: 1; transform: scale(1); }
          li::after { content: ""; position: absolute; inset: 0; border-radius: 8px; background: rgba(255,255,255,0.04); opacity: 0; transform: scale(0); transition: all 0.25s ease; z-index: -1; }
        `}</style>
      <div className="relative" ref={containerRef}>
        <nav className="flex relative" style={{ transform: 'translate3d(0,0,0.01px)' }}>
          <ul ref={navRef} className="flex gap-8 list-none p-0 px-4 m-0 relative z-[3]" style={{ color: 'white', textShadow: '0 1px 1px hsl(205deg 30% 10% / 0.2)' }}>
            {items.map((item, index) => (
              <li key={index} className={`rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-white ${activeIndex === index ? 'active' : ''}`}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, index); }}
                  onClickCapture={(e) => { e.preventDefault(); scrollToHash(item.href); }}
                  onKeyDown={(e) => handleKeyDown(e as unknown as React.KeyboardEvent<HTMLAnchorElement>, index)}
                  className="outline-none py-[0.6em] px-[1em] inline-block"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

export default GooeyNav;
