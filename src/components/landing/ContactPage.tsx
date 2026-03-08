import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Instagram, Linkedin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-background-alt py-24 px-8" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-serif text-[#112A46] mb-8 leading-tight">
              Get in touch with <br /> our team
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed max-w-lg mb-12">
              Have questions about how Kortex can transform your professional workspace?
              Reach out to us and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-border-main group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Email Us</p>
                  <a href="mailto:nm^2@gmail.com" className="text-lg font-bold text-text-primary hover:text-primary transition-colors">nm^2@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-border-main group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Visit Us</p>
                  <p className="text-lg font-bold text-text-primary">Mukesh Patel College of Engineering and Management, Mumbai</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-border-main group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-lg font-bold text-text-primary">+91 9876543210</p>
                </div>
              </div>
            </div>

            <div className="mt-16 flex gap-4">
              {[Github, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white border border-border-main flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card p-10 bg-white shadow-2xl border-border-main/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
            <h3 className="text-2xl font-bold text-text-primary mb-8">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">First Name</label>
                  <input type="text" className="w-full bg-background-alt border border-border-main rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Funk" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Last Name</label>
                  <input type="text" className="w-full bg-background-alt border border-border-main rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Patel" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Your Email</label>
                <input type="email" className="w-full bg-background-alt border border-border-main rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Message</label>
                <textarea rows={4} className="w-full bg-background-alt border border-border-main rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="Tell us about your project..."></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-4 text-sm font-bold shadow-lg">Send Message</button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
