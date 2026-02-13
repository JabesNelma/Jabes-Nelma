"use client";


import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const TextType = dynamic(() => import("@/components/ui/TextType"), { ssr: false });

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block mb-2" style={{paddingBottom: '0.25em'}}>Hello, I'm</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent mt-2 mb-2" style={{paddingBottom: '0.18em'}}>
              Jabes Nelma
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <TextType
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              text="Junior Full Stack Developer focused on learning, growing, and building secure, scalable solutions for emerging markets like Timor Leste."
              typingSpeed={32}
              pauseDuration={2200}
              loop={true}
              showCursor={true}
              as="p"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              View My Work
            </Link>
            
            <Link 
              href="#contact"
              className="px-8 py-4 border border-gray-600 rounded-full font-semibold hover:border-gray-400 transition-colors duration-300"
            >
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}