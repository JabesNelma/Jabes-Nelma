"use client";
/*
  File: src/components/sections/Projects.tsx
  Deskripsi (ID):
  - Menampilkan daftar proyek unggulan (Featured Projects).
  - Default menampilkan 5 proyek pertama, lalu sebuah kartu "View More Projects" untuk menampilkan semua proyek saat diklik.
  - Setiap card proyek memiliki efek hover naik sedikit.

  Titik edit yang umum:
  - Ubah jumlah proyek yang ditampilkan dengan menyesuaikan slice() di variabel `visible`.
  - Untuk mengubah gaya kartu, edit class Tailwind di bagian JSX kartu proyek.
  - Untuk mengganti teks "View More Projects", ubah konten elemen button di bawah.
*/

import { projects } from "@/data/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import React, { useState } from "react";

export default function Projects() {
  // State untuk mengontrol tampilan semua proyek
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, 5);

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of my recent work and ongoing projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((project) => (
            <div 
              key={project.id}
              className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transform-gpu transition-transform duration-300 hover:-translate-y-1 group"
            >
              {/* KARTU PROYEK: ubah isi card di dalam <div className="p-6"> */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-4">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-xs bg-gray-700/50 text-gray-400 px-2 py-1 rounded">
                      +{project.technologies.length - 4} more
                    </span>
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
            </div>
          ))}

          {!showAll && projects.length > 5 && (
            <div
              role="button"
              tabIndex={0}
              onClick={() => setShowAll(true)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowAll(true); }}
              className="flex items-center justify-center bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl border border-gray-600 p-6 cursor-pointer hover:border-blue-500 transition-all transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 group"
            >
              {/* KARTU VIEW MORE PROJECTS: klik/enter akan memperlihatkan semua proyek */}
              <div className="text-center">
                <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                  View More Projects
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  +{projects.length - 5} more projects to explore
                </div>
                <div className="mt-4">
                  <svg 
                    className="w-6 h-6 mx-auto text-blue-400 group-hover:translate-y-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}