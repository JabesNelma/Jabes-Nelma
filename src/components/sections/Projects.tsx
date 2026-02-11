"use client";

import { projects } from "@/data/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
};

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [expandedTech, setExpandedTech] = useState<Record<string, boolean>>({});
  const visible = showAll ? projects : projects.slice(0, 5);

  const toggleTech = (projectId: string) => {
    setExpandedTech((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          custom={0}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of my recent work and ongoing projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.15 }}
                variants={cardVariant}
                custom={i % 6}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 hover:shadow-lg hover:shadow-blue-500/5 group"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-4">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <AnimatePresence mode="popLayout">
                      {(expandedTech[project.id]
                        ? project.technologies
                        : project.technologies.slice(0, 4)
                      ).map((tech, index) => (
                        <motion.span
                          key={tech}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2, delay: index > 3 ? (index - 4) * 0.03 : 0 }}
                          className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                    {project.technologies.length > 4 && (
                      <button
                        type="button"
                        onClick={() => toggleTech(project.id)}
                        className="text-xs bg-gray-700/50 text-blue-400 hover:text-blue-300 px-2 py-1 rounded cursor-pointer transition-colors"
                      >
                        {expandedTech[project.id]
                          ? "Show less"
                          : `+${project.technologies.length - 4} more`}
                      </button>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.category.map((cat, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{project.year}</span>
                    
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label={`GitHub repository for ${project.title}`}
                        >
                          <FaGithub size={16} />
                        </a>
                      )}
                      
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                          aria-label={`Live demo for ${project.title}`}
                        >
                          <FaExternalLinkAlt size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {!showAll && projects.length > 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
              role="button"
              tabIndex={0}
              onClick={() => setShowAll(true)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowAll(true); }}
              className="flex items-center justify-center bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl border border-gray-600 p-6 cursor-pointer hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20 group"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                  View More Projects
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  +{projects.length - 5} more projects to explore
                </div>
                <div className="mt-4">
                  <motion.svg
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-6 mx-auto text-blue-400"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}