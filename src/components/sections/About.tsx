"use client";

/*
  File: src/components/sections/About.tsx
  Deskripsi (ID):
  - Komponen bagian "About Me" yang menampilkan foto profil, statistik singkat
    dan teks deskripsi.
  - Responsif: di layar besar tata letak 2 kolom (foto kiri, teks/stat kanan),
    di mobile menjadi vertikal.

  Titik edit yang umum:
  - Ubah teks di bagian deskripsi (prose) untuk menyesuaikan bio.
  - Sesuaikan nilai statistik: komponen `StatCard` mengambil nilai dinamis dari `projects`.
  - Untuk mengubah jarak vertikal foto, ubah class pada elemen <a> yang membungkus `ProfileCard`.

  Catatan teknis:
  - Komponen ini diberi `"use client"` karena menggunakan dynamic client-only child components
    dan state/efek di dalamnya.
*/

import dynamic from "next/dynamic";
import { projects } from "@/data/projects";

const ProfileCard = dynamic(() => import("@/components/ui/ProfileCard"), { ssr: false });
const StatCard = dynamic(() => import("@/components/ui/StatCard"), { ssr: false });

export default function About() {
  // Hitung total proyek dan teknologi yang digunakan
  const totalProjects = projects.length;
  const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.technologies))).length;

  const yearsOfExperience = new Date().getFullYear() - 2024; // Mulai dari 2024

  return (
    <section id="about" className="section-padding bg-gray-900/50">
      {/*
        Struktur:
        - kontainer utama -> judul -> baris konten
        - baris konten (md+): foto kiri (1/3), konten kanan (2/3)
      */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Building secure, scalable solutions for emerging markets</p>
        </div>

        {/* Baris utama: foto profil + konten */}
        <div className="flex flex-col md:flex-row gap-12 mb-16 items-center md:items-start justify-center">
          <div className="w-full md:w-1/3 flex justify-center mb-8 md:mb-0">
            {/* Foto profil — tombol Contact akan langsung membuka Gmail */}
            <div className="-mt-[12px] md:-mt-[28px] lg:-mt-[44px] transform-gpu hover:-translate-y-1 transition">
              <ProfileCard 
                avatarUrl="/1.jpg" 
                name="Jabes Nelma" 
                title="Senior Frontend Engineer & Backend Specialist"
                onContactClick={() => window.location.href = 'mailto:jabesnelma056@gmail.com'}
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            {/* Statistik singkat: gunakan komponen `StatCard` untuk animasi counter */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <StatCard value={totalProjects} label="Projects Completed" colorClass="text-blue-400" />
              <StatCard value={allTechnologies} label="Technologies Mastered" colorClass="text-purple-400" />
              <StatCard value={yearsOfExperience} label="Years Experience" colorClass="text-indigo-400" />
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I'm Jabes Nelma, a senior frontend engineer and backend specialist with a passion for creating robust, secure solutions for emerging markets like Timor Leste. With experience spanning across full-stack development, fintech, healthcare digitization, and web3 technologies, I focus on building products that make a meaningful impact.
              </p>

              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                My expertise includes developing scalable backend systems using Django and PostgreSQL, creating responsive frontend experiences with React and Next.js, and implementing banking-level security standards for financial applications. I believe in writing clean, maintainable code and following best practices for long-term project success.
              </p>

              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Currently, I'm working on several innovative projects including OKLY (Timor Leste's first ojek online platform), OKLYP (cross-border remittance system), and medical records digitization initiatives. My goal is to leverage technology to solve real-world problems and contribute to the digital transformation of emerging economies.
              </p>

              <div className="mt-8 p-6 bg-gray-800/30 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Core Principles</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start"><span className="text-green-400 mr-2">✓</span><span>Prioritize security and privacy in every solution</span></li>
                  <li className="flex items-start"><span className="text-green-400 mr-2">✓</span><span>Focus on accessibility and inclusive design</span></li>
                  <li className="flex items-start"><span className="text-green-400 mr-2">✓</span><span>Build for scalability and maintainability</span></li>
                  <li className="flex items-start"><span className="text-green-400 mr-2">✓</span><span>Contribute to open-source and community growth</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}