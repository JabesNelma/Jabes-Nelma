"use client";

import { FaEnvelope, FaGithub, FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { useState } from "react";

/*
  File: src/components/sections/Contact.tsx
  Deskripsi (ID):
  - Menyediakan cara menghubungi (link sosial) dan menampilkan fokus proyek saat ini.
  - Data diambil dari src/data/content.ts (contactLinks & currentFocus)
  - Setiap item sosial dan kartu fokus memiliki efek hover naik sedikit.
  - Fitur "View More Info" untuk menampilkan semua focus jika lebih dari 3.

  Titik edit:
  - Edit data di src/data/content.ts untuk menambah/mengubah tautan atau focus.
*/

import { contactLinks, currentFocus } from "@/data/contact";

export default function Contact() {
  const [showAllFocus, setShowAllFocus] = useState(false);
  const visibleFocus = showAllFocus ? currentFocus : currentFocus.slice(0, 3);

  // Helper function untuk mendapatkan icon berdasarkan type
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'email':
        return <FaEnvelope className="text-blue-400" />;
      case 'github':
        return <FaGithub className="text-gray-300" />;
      case 'x':
        return <BsTwitterX className="text-white" />;
      case 'whatsapp':
        return <FaWhatsapp className="text-green-400" />;
      default:
        return <FaEnvelope className="text-blue-400" />;
    }
  };

  // Helper function untuk mendapatkan warna berdasarkan color type
  const getColorClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-400';
      case 'purple':
        return 'text-purple-400';
      case 'green':
        return 'text-green-400';
      case 'orange':
        return 'text-orange-400';
      case 'pink':
        return 'text-pink-400';
      case 'red':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and build something amazing together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm always interested in discussing new opportunities, interesting projects, 
                or potential collaborations. Whether you're looking for a developer, 
                have a technical question, or just want to connect - feel free to reach out!
              </p>
              
              <div className="space-y-4">
                {contactLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition transform-gpu transition-transform duration-300 hover:-translate-y-1 group"
                  >
                    <div className="mr-4 text-xl">
                      {getIcon(social.iconType)}
                    </div>
                    <div>
                      <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                        {social.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {social.description}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Current Focus</h3>
              
              <div className="space-y-4">
                {visibleFocus.map((focus) => (
                  <div 
                    key={focus.id}
                    className="p-4 bg-gray-700/30 rounded-lg transform-gpu transition-transform duration-300 hover:-translate-y-1"
                  >
                    <h4 className={`font-semibold ${getColorClass(focus.color)} mb-2`}>
                      {focus.title}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {focus.description}
                    </p>
                  </div>
                ))}

                {!showAllFocus && currentFocus.length > 3 && (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setShowAllFocus(true)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowAllFocus(true); }}
                    className="p-4 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg border border-gray-600 cursor-pointer hover:border-blue-500 transition-all transform-gpu hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 group"
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                        View More Info
                      </div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        +{currentFocus.length - 3} more focus areas
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/20">
                <p className="text-sm text-gray-300 italic">
                  "Building solutions that matter for emerging markets and communities. 
                  Let's create technology that makes a difference."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}