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
import content from "@/data/content";
import LogoLoop, { type LogoLoopProps } from "@/components/ui/LogoLoop";

type SkillCategory = {
  name: string;
  icon: JSX.Element;
  skills: string[];
};

// Build three categories (frontend, backend, web3) from content.skills
const CATEGORIES: { key: string; name: string; icon: JSX.Element }[] = [
  { key: "frontend", name: "Frontend", icon: <FaReact className="text-blue-400" /> },
  { key: "backend", name: "Backend", icon: <FaServer className="text-green-400" /> },
  { key: "web3", name: "Web3", icon: <SiBlockchaindotcom className="text-orange-400" /> },
];

const skillCategories: SkillCategory[] = CATEGORIES.map((c) => ({
  name: c.name,
  icon: c.icon,
  skills: content.skills
    .filter((s) => Array.isArray(s.category) && s.category.includes(c.key))
    .map((s) => s.name),
}));

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
  return (
    <section id="skills" className="section-padding bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and frameworks I specialize in
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Kartu kategori: ubah padding/warna dengan mengedit kelas di bawah */}
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transform-gpu transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="mr-3 text-2xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {category.name}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="text-sm bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-800/30 rounded-xl border border-gray-700 p-8">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            Specialized Domains
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 transform-gpu transition-transform duration-300 hover:-translate-y-1">
              <FaMobileAlt className="text-3xl text-blue-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Mobile Development</h4>
              <p className="text-gray-400 text-sm">
                Cross-platform mobile apps with React Native and Flutter
              </p>
            </div>
            <div className="text-center p-4 transform-gpu transition-transform duration-300 hover:-translate-y-1">
              <SiEthereum className="text-3xl text-purple-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Web3 Solutions</h4>
              <p className="text-gray-400 text-sm">
                Decentralized applications and blockchain integration
              </p>
            </div>
            <div className="text-center p-4 transform-gpu transition-transform duration-300 hover:-translate-y-1">
              <FaLock className="text-3xl text-green-400 mx-auto mb-3" />
              <h4 className="font-semibold text-white mb-2">Security First</h4>
              <p className="text-gray-400 text-sm">
                Banking-level security standards and compliance
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
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
        </div>
      </div>
    </section>
  );
}