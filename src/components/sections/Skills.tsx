"use client";

import { FaReact, FaServer, FaMobileAlt, FaLock, FaGithub } from "react-icons/fa";
import {
  SiBlockchaindotcom,
  SiEthereum,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNestjs,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPython,
  SiFlask,
  SiFlutter,
  SiUbuntu,
  SiSupabase,
  SiPostgresql,
  SiReact
} from "react-icons/si";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import content from "@/data/content";
import LogoLoop, { type LogoLoopProps } from "@/components/ui/LogoLoop";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SkillCategory = {
  name: string;
  icon: JSX.Element;
  skills: string[];
};

// Build categories from content.skills
const CATEGORIES: { key: string; name: string; icon: JSX.Element }[] = [
  { key: "frontend", name: "Frontend", icon: <FaReact className="text-blue-400" /> },
  { key: "backend", name: "Backend", icon: <FaServer className="text-green-400" /> },
  { key: "web3", name: "Web3", icon: <SiBlockchaindotcom className="text-orange-400" /> },
  { key: "api", name: "API Integration", icon: <HiOutlineGlobeAlt className="text-yellow-400" /> },
];

const skillCategories: SkillCategory[] = CATEGORIES.map((c) => ({
  name: c.name,
  icon: c.icon,
  skills: content.skills
    .filter((s) => Array.isArray(s.category) && s.category.includes(c.key))
    .map((s) => s.name),
}));

// Build a map: skill name → list of project titles that use it (or a similar tech)
function getProjectsForSkill(skillName: string): string[] {
  const lower = skillName.toLowerCase();
  return content.projects
    .filter((p) => {
      const techs = (p.tech || []).map((t) => t.toLowerCase());
      const cats = (p.category || []).map((c) => c.toLowerCase());
      // match by tech array or category array
      return (
        techs.some((t) => t.includes(lower) || lower.includes(t)) ||
        cats.some((c) => c.includes(lower) || lower.includes(c))
      );
    })
    .map((p) => p.title);
}

const marqueeLogos: LogoLoopProps["logos"] = [
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-slate-500/50 to-slate-900 text-slate-200 shadow-inner">
        <SiNextdotjs className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-200 text-lg font-black text-slate-900">
        <SiTypescript className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-2xl text-slate-900">
        <SiTailwindcss className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-200 text-3xl text-slate-900">
        <SiNestjs className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-2xl text-slate-900">
        <FaGithub className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-2xl text-slate-900">
        <SiReact className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-200 text-2xl text-slate-900">
        <SiHtml5 className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-200 text-2xl text-slate-900">
        <SiCss3 className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-200 text-2xl text-slate-900">
        <SiJavascript className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-200 text-2xl text-slate-900">
        <SiPython className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-200 text-2xl text-slate-900">
        <SiFlask className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-200 text-2xl text-slate-900">
        <SiFlutter className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-200 text-2xl text-slate-900">
        <SiUbuntu className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-200 text-2xl text-slate-900">
        <SiSupabase className="text-2xl" />
      </span>
    ),
  },
  {
    node: (
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-200 text-2xl text-slate-900">
        <SiPostgresql className="text-2xl" />
      </span>
    ),
  },
];

/*
  File: src/components/sections/Skills.tsx
  Deskripsi (ID):
  - Menampilkan kategori keterampilan teknis sebagai kartu.
  - Setiap kartu memiliki efek hover naik sedikit.

  Titik edit:
  - Tambah/hapus kategori dengan mengedit `skillCategories` di atas.
  - Ubah ikon/warna di masing-masing kategori pada objek `skillCategories`.
*/

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (skillName: string, e: React.MouseEvent<HTMLSpanElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      setTooltipPos({
        top: rect.top - containerRect.top - 8,
        left: rect.left - containerRect.left + rect.width / 2,
      });
    }
    setActiveSkill(skillName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSkill(null);
      setTooltipPos(null);
    }, 150);
  };

  const relatedProjects = activeSkill ? getProjectsForSkill(activeSkill) : [];

  return (
    <section id="skills" className="section-padding bg-gray-900/50">
      <div className="container mx-auto px-4" ref={containerRef}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and frameworks I specialize in — hover on any skill to see related projects
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Tooltip Popup */}
          <AnimatePresence>
            {activeSkill && tooltipPos && relatedProjects.length > 0 && (
              <motion.div
                className="absolute z-50 pointer-events-none"
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  top: tooltipPos.top,
                  left: tooltipPos.left,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <div className="bg-gray-900 border border-blue-500/40 rounded-xl px-4 py-3 shadow-2xl shadow-blue-500/10 min-w-[220px] max-w-[300px]">
                  <p className="text-blue-400 text-xs font-semibold mb-2 uppercase tracking-wider">
                    Projects using {activeSkill}
                  </p>
                  <ul className="space-y-1">
                    {relatedProjects.map((title, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">›</span>
                        <span>{title}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-blue-500/40" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-gray-600 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="flex items-center mb-4">
                <motion.div
                  className="mr-3 text-2xl"
                  initial={{ rotate: -180, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 + 0.2, type: "spring" }}
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white">
                  {category.name}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.12 + skillIndex * 0.06 + 0.3 }}
                    onMouseEnter={(e) => handleMouseEnter(skill, e)}
                    onMouseLeave={handleMouseLeave}
                    className={`text-sm px-3 py-1.5 rounded-full cursor-default transition-all duration-200 border ${
                      activeSkill === skill
                        ? "bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-md shadow-blue-500/10 scale-105"
                        : "bg-gray-700/50 text-gray-300 border-transparent hover:bg-gray-600/50 hover:text-white"
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 bg-gray-800/30 rounded-xl border border-gray-700 p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            Specialized Domains
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <FaMobileAlt className="text-3xl text-blue-400 mx-auto mb-3" />, title: "Mobile Development", desc: "Cross-platform mobile apps with React Native and Flutter" },
              { icon: <SiEthereum className="text-3xl text-purple-400 mx-auto mb-3" />, title: "Web3 Solutions", desc: "Decentralized applications and blockchain integration" },
              { icon: <FaLock className="text-3xl text-green-400 mx-auto mb-3" />, title: "Security First", desc: "Banking-level security standards and compliance" },
            ].map((domain, i) => (
              <motion.div
                key={domain.title}
                className="text-center p-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                {domain.icon}
                <h4 className="font-semibold text-white mb-2">{domain.title}</h4>
                <p className="text-gray-400 text-sm">{domain.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4">
            <LogoLoop
              logos={marqueeLogos}
              speed={140}
              gap={56}
              logoHeight={56}
              fadeOut
              pauseOnHover
              scaleOnHover
              ariaLabel="Logo loop marquee"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}