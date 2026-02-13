"use client";

/*
  File: src/components/sections/About.tsx
  - Scroll-triggered Framer Motion animations on each element.
*/

import dynamic from "next/dynamic";
import { projects } from "@/data/projects";
import content from "@/data/content";
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
  const projectNames = content.projects.map((p) => p.title);
  const allTechList = Array.from(new Set(projects.flatMap((project) => project.technologies)));
  const allTechnologies = allTechList.length;

  // Auto-calculate years from the earliest project year in content.ts
  const projectYears = content.projects
    .map((p) => p.year)
    .filter((y): y is number => typeof y === 'number' && y > 0);
  const earliestYear = projectYears.length > 0 ? Math.min(...projectYears) : new Date().getFullYear();
  const yearsOfExperience = new Date().getFullYear() - earliestYear;

  return (
    <section id="about" className="section-padding bg-gray-900/50">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
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
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeLeft}
          >
            <div className="-mt-[12px] md:-mt-[28px] lg:-mt-[44px] transform-gpu hover:-translate-y-1 transition">
              <ProfileCard 
                avatarUrl="/1.jpg" 
                name="Jabes Nelma" 
                title="Junior Full Stack Developer"
                onContactClick={() => window.location.href = 'mailto:jabesnelma056@gmail.com'}
              />
            </div>
          </motion.div>

          {/* Content - slide in from right */}
          <motion.div
            className="w-full md:w-2/3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeRight}
          >
            {/* Stat cards with staggered scale-in */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                { value: totalProjects, label: "Projects Completed", color: "text-blue-400", items: projectNames },
                { value: allTechnologies, label: "Technologies Mastered", color: "text-purple-400", items: allTechList },
                { value: yearsOfExperience, label: "Years Experience", color: "text-indigo-400" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={scaleIn}
                  custom={i}
                >
                  <StatCard value={stat.value} label={stat.label} colorClass={stat.color} hoverItems={stat.items} />
                </motion.div>
              ))}
            </div>

            <div className="prose prose-invert max-w-none">
              {[
                "I am a Junior Full Stack Developer with strong programming fundamentals and an adaptive engineering mindset. My journey in technology began in high school at ETI (Eskola Teknika Informatica) – Baucau, where I was formally introduced to web development through subjects such as Web Design (Dezenhu Website), learning HTML, CSS, and PHP. From an early stage, I was exposed not only to building interfaces but also to understanding how systems are structured.",
                "My academic focus was on programming, where we studied fundamental concepts using Pascal — a strict and structured language that significantly strengthened my logical thinking and problem-solving abilities. Although Pascal is considered traditional, it gave me a deep understanding of core programming principles. This foundation made it easier for me to transition into modern languages, as I strongly believe that programming logic remains consistent — only syntax differs.",
                'Beyond formal education, I actively expanded my knowledge independently. I learned JavaScript and Python through self-study, particularly from resources like <a href="https://www.petanikode.com/tutorial/" target="_blank" class="text-blue-400 hover:text-blue-300 underline">Petani Kode</a>, which helped me strengthen my understanding of modern programming practices. This self-driven learning approach shaped my adaptability and ability to quickly migrate between technologies.',
                "My experience with Object-Oriented Programming (OOP) started in high school through the POO subject. For my final professional examination (Prova Aptidaun Profesional), I worked on an information system project using Visual Basic integrated with Microsoft Access, where I deepened my understanding of database systems and backend logic. This experience solidified my full stack perspective — from user interface to database design and system architecture.",
                "When I entered university, I realized that I was not starting from zero. Instead, I was transitioning. With strong fundamentals in logic, OOP, and databases, adapting to modern stacks became a matter of syntax adjustment and architectural refinement.",
                "Currently, I focus on continuously improving as a Junior Full Stack Developer while preparing myself to grow into a Senior Full Stack Developer. I am particularly interested in exploring emerging technologies such as Web3 and modern distributed systems, aiming to build scalable, efficient, and future-ready applications.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  className="text-lg text-gray-300 mb-6 leading-relaxed"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={fadeUp}
                  custom={i}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              ))}

              <motion.div
                className="mt-8 p-6 bg-gray-800/30 rounded-xl border border-gray-700"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
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
                      viewport={{ once: false }}
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