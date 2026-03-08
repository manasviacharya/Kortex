import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { AboutPage } from './AboutPage';
import { WhyUsPage } from './WhyUsPage';
import { FeaturesPage } from './FeaturesPage';
import { TestimonialsPage } from './TestimonialsPage';
import { ContactPage } from './ContactPage';
import { Logo } from '../common/Logo';
import { LegalModal, PrivacyContent, TermsContent } from '../common/LegalModal';

interface LandingPageProps {
  onStart: () => void;
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onGetStarted }) => {
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' }>({ isOpen: false, type: 'terms' });

  return (
    <div className="bg-background-main min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto sticky top-0 z-50 bg-background-main/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="text-2xl font-bold text-status-warning tracking-tight">Kortex</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="#home" className="text-[#F48C71] transition-colors font-bold">Home</a>
          <a href="#about" className="hover:text-[#F48C71] transition-colors font-bold">About Us</a>
          <a href="#features" className="hover:text-[#F48C71] transition-colors font-bold">Features</a>
          <a href="#why-us" className="hover:text-[#F48C71] transition-colors font-bold">Why Kortex</a>
          <a href="#testimonials" className="hover:text-[#F48C71] transition-colors font-bold">Testimonials</a>
          <a href="#contact" className="hover:text-[#F48C71] transition-colors font-bold">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onStart} className="text-sm font-semibold text-text-primary hover:text-primary transition-colors">Log in</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-12 pb-24 px-8 relative overflow-hidden" id="home">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-status-warning/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#9AB8D4]/10 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-[#112A46] mb-6 tracking-tight leading-[1.1]">
              The <br />
              Cortex <br />
              of <br />
              Collaboration
            </h1>
            <p className="text-lg text-text-secondary mb-10 max-w-md leading-relaxed">
              Kortex is an intelligent, profession-aware workspace that unifies research, writing, validation, and collaboration for modern knowledge teams.            </p>
            <button
              onClick={onGetStarted}
              className="px-8 py-3 bg-gradient-to-r from-[#F48C71] to-[#F48C71] text-white font-medium rounded-full shadow-[0_8px_16px_rgba(255,107,107,0.3)] hover:shadow-[0_12px_24px_rgba(255,107,107,0.4)] hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </button>
          </motion.div>

          {/* Hero Visual Container */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[600px] w-full flex items-center justify-center p-8 bg-white/40 backdrop-blur-sm rounded-[40px] border border-white/20 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F48C71]/10 to-[#9AB8D4]/10 rounded-[40px] z-0" />
            <img src="/src/assets/hero-team.png" alt="Kortex Platform Illustration" className="relative z-10 w-full h-auto object-contain drop-shadow-2xl" />
            
            {/* Floating Decorative Elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-[#F48C71]/20 blur-3xl rounded-full" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#9AB8D4]/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* New Pages */}
      <AboutPage onAction={onGetStarted} />
      <WhyUsPage onAction={onGetStarted} />
      <FeaturesPage onAction={onGetStarted} />
      <TestimonialsPage onAction={onGetStarted} />
      <ContactPage />

      {/* Footer */}
      <footer className="py-12 border-t border-border-main px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Logo size={24} />
            <span className="text-lg font-bold text-text-primary tracking-tight">Kortex</span>
          </div>
          <div className="flex gap-8 text-sm text-text-muted">
            <button onClick={() => setLegalModal({ isOpen: true, type: 'privacy' })} className="hover:text-text-primary transition-colors cursor-pointer">Privacy</button>
            <button onClick={() => setLegalModal({ isOpen: true, type: 'terms' })} className="hover:text-text-primary transition-colors cursor-pointer">Terms</button>
            <a href="#" className="hover:text-text-primary">Twitter</a>
            <a href="#" className="hover:text-text-primary">LinkedIn</a>
          </div>
          <p className="text-sm text-text-muted">© 2026 Kortex Inc. All rights reserved.</p>
        </div>
      </footer>
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        title={legalModal.type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
        content={legalModal.type === 'terms' ? <TermsContent /> : <PrivacyContent />}
      />
    </div>
  );
};
