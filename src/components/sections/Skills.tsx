import { FaReact, FaServer, FaMobileAlt, FaLock } from "react-icons/fa";
import { SiBlockchaindotcom, SiEthereum } from "react-icons/si";
import content from "@/data/content";

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
      </div>
    </section>
  );
}