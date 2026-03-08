import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, content }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background-main/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl border border-border-main w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col relative z-10"
          >
            <div className="p-6 border-b border-border-main flex items-center justify-between bg-panel/50">
              <h2 className="text-xl font-serif font-bold text-text-primary">{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-background-alt rounded-full transition-colors text-text-muted hover:text-primary"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto text-sm leading-relaxed text-text-secondary custom-scrollbar">
              {content}
            </div>
            <div className="p-6 border-t border-border-main flex justify-end bg-panel/50">
              <button 
                onClick={onClose}
                className="btn-primary px-8"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const PrivacyContent = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-lg font-bold text-text-primary mb-3">1. Information We Collect</h3>
      <p>We collect information you provide directly to us when you create an account, update your profile, and use our workspace features. This includes your name, email address, profession, and any content you create or upload within the system.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold text-text-primary mb-3">2. How We Use Your Information</h3>
      <p>Your data is used to provide, maintain, and improve our services, including the AI-powered insights and collaboration tools. We use your profession and role information to calibrate the workspace experience for your specific needs.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold text-text-primary mb-3">3. Data Security</h3>
      <p>We implement industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, and destruction. Your workspace data is isolated and encrypted at rest.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold text-text-primary mb-3">4. AI and User Data</h3>
      <p>Our AI models analyze your workspace intent to provide contextual insights. We do not use your private workspace data to train shared models that could leak your proprietary information to other users.</p>
    </section>
  </div>
);

export const TermsContent = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-lg font-bold text-text-primary mb-3">1. Acceptance of Terms</h3>
      <p>By accessing or using Kortex, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold text-text-primary mb-3">2. User Accounts</h3>
      <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold text-text-primary mb-3">3. Intellectual Property</h3>
      <p>All content created by you within your workspace remains your property. Kortex owns the platform architecture, UI design, and underlying AI technology.</p>
    </section>
    <section>
      <h3 className="text-lg font-bold text-text-primary mb-3">4. Acceptable Use</h3>
      <p>You agree not to use Kortex for any unlawful activities, including but not limited to intellectual property infringement, harassment, or the storage of illegal content.</p>
    </section>
  </div>
);
