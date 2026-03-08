import React from 'react';
import { motion } from 'framer-motion';

interface AboutPageProps {
  onAction: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onAction }) => {
  return (
    <div className="bg-background-main min-h-screen py-24 px-8" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content Left */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-[#112A46] mb-8 leading-tight">
            About Us
          </h2>
          <div className="space-y-6 text-lg text-text-secondary leading-relaxed max-w-lg mb-10">
            <p className="font-bold text-[#112A46]">
              Kortex is an intelligent, AI-powered workspace designed for modern knowledge-driven teams.
            </p>
            <p>
              Professionals such as journalists, legal experts, researchers, writers, and startup teams often rely on multiple disconnected tools for research, drafting, collaboration, validation, and workflow management. This fragmentation slows down productivity and leads to inconsistent outputs.
            </p>
            <p>
              Kortex solves this problem by bringing everything together into one unified platform. It combines structured knowledge management, collaborative drafting environments, AI-powered validation systems, and team workflows into a single cohesive workspace.
            </p>
            <p>
              Our mission is to empower teams to think, research, write, and collaborate more effectively by creating a profession-aware system that adapts to the needs of different industries while maintaining a seamless user experience.
            </p>
          </div>
          <button onClick={onAction} className="px-10 py-4 bg-[#F48C71] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            Get Started with Kortex
          </button>
        </motion.div>

        {/* Image Right with Offset Block and Curvy Line */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative order-1 lg:order-2 h-[600px]"
        >
          {/* Offset Background Block */}
          <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[#F48C71]/20 rounded-3xl z-0"></div>
          
          {/* Image Container with the new illustration */}
          <div className="absolute bottom-10 left-10 w-[90%] h-[90%] bg-white shadow-2xl overflow-hidden z-10 rounded-3xl border-8 border-white p-4 flex items-center justify-center">
            <img src="/src/assets/about-us-new.png" alt="About Kortex" className="w-full h-auto object-contain" />
          </div>

          {/* Floating Badge */}
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute top-1/4 left-0 -translate-x-1/2 bg-white px-8 py-5 shadow-2xl rounded-2xl border border-border-main z-20"
          >
            <p className="text-sm font-bold text-[#112A46]">
              <span className="text-[#F48C71] mr-2">Smart!</span>
              Knowledge Portal
            </p>
          </motion.div>
          
          {/* SVG Curvy Line */}
          <svg className="absolute -left-20 -bottom-10 w-[300px] h-[300px] z-30 pointer-events-none stroke-[#F48C71]/40" fill="none" viewBox="0 0 200 200">
            <path strokeWidth="3" strokeLinecap="round" d="M10,190 C60,190 60,10 110,10 C160,10 160,190 210,190" />
            <circle cx="110" cy="10" r="6" fill="#F48C71" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};
