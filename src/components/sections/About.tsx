"use client";

/*
  File: src/components/sections/About.tsx
  - Scroll-triggered Framer Motion animations on each element.
*/

import dynamic from "next/dynamic";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";

const ProfileCard = dynamic(() => import("@/components/ui/ProfileCard"), { ssr: false });
const StatCard = dynamic(() => import("@/components/ui/StatCard"), { ssr: false });

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function About() {
  const totalProjects = projects.length;
  const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.technologies))).length;
  const yearsOfExperience = new Date().getFullYear() - 2024;

  return (
    <section id="about" className="section-padding bg-gray-900/50">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          custom={0}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Building secure, scalable solutions for emerging markets</p>
        </motion.div>

        {/* Main row: profile + content */}
        <div className="flex flex-col md:flex-row gap-12 mb-16 items-center md:items-start justify-center">
          {/* Profile card - slide in from left */}
          <motion.div
            className="w-full md:w-1/3 flex justify-center mb-8 md:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeLeft}
          >
            <div className="-mt-[12px] md:-mt-[28px] lg:-mt-[44px] transform-gpu hover:-translate-y-1 transition">
              <ProfileCard 
                avatarUrl="/1.jpg" 
                name="Jabes Nelma" 
                title="Junior Frontend Engineer & Backend Enthusiast"
                onContactClick={() => window.location.href = 'mailto:jabesnelma056@gmail.com'}
              />
            </div>
          </motion.div>

          {/* Content - slide in from right */}
          <motion.div
            className="w-full md:w-2/3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
          >
            {/* Stat cards with staggered scale-in */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                { value: totalProjects, label: "Projects Completed", color: "text-blue-400" },
                { value: allTechnologies, label: "Technologies Mastered", color: "text-purple-400" },
                { value: yearsOfExperience, label: "Years Experience", color: "text-indigo-400" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  custom={i}
                >
                  <StatCard value={stat.value} label={stat.label} colorClass={stat.color} />
                </motion.div>
              ))}
            </div>

            <div className="prose prose-invert max-w-none">
              {[
                "I'm Jabes Nelma, a junior frontend engineer and backend enthusiast who is actively learning and growing while building robust, secure solutions for emerging markets like Timor Leste. With early experience across full-stack development, fintech, healthcare digitization, and web3 technologies, I focus on developing my skills and contributing to products that make a meaningful impact.",
                "My expertise includes developing scalable backend systems using Django and PostgreSQL, creating responsive frontend experiences with React and Next.js, and implementing banking-level security standards for financial applications. I believe in writing clean, maintainable code and following best practices for long-term project success.",
                "Currently, I'm working on several innovative projects including OKLY (Timor Leste's first ojek online platform), OKLYP (cross-border remittance system), and medical records digitization initiatives. My goal is to leverage technology to solve real-world problems and contribute to the digital transformation of emerging economies.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  className="text-lg text-gray-300 mb-6 leading-relaxed"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  {text}
                </motion.p>
              ))}

              <motion.div
                className="mt-8 p-6 bg-gray-800/30 rounded-xl border border-gray-700"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={3}
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Core Principles</h3>
                <ul className="space-y-2 text-gray-300">
                  {[
                    "Prioritize security and privacy in every solution",
                    "Focus on accessibility and inclusive design",
                    "Build for scalability and maintainability",
                    "Contribute to open-source and community growth",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    >
                      <span className="text-green-400 mr-2">✓</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}