import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, BarChart3, Globe } from 'lucide-react';

interface WhyUsPageProps {
  onAction: () => void;
}

export const WhyUsPage: React.FC<WhyUsPageProps> = ({ onAction }) => {
  const reasons = [
    {
      title: "All-in-One Workspace",
      description: "Kortex replaces multiple disconnected tools by combining research, drafting, collaboration, and validation into one platform.",
      icon: <Globe className="text-[#F48C71]" size={24} />
    },
    {
      title: "Built for Knowledge Professionals",
      description: "Unlike general productivity tools, Kortex is designed specifically for professionals who work with complex information and research.",
      icon: <Shield className="text-[#F48C71]" size={24} />
    },
    {
      title: "AI-Enhanced Productivity",
      description: "Advanced AI assistance helps teams analyze information faster, generate insights, and improve the quality of their work.",
      icon: <Zap className="text-[#F48C71]" size={24} />
    },
    {
      title: "Scalable for Organizations",
      description: "Kortex supports multi-organization and team-based structures with role-based access, making it suitable for small teams and large institutions.",
      icon: <TrendingUp className="text-[#F48C71]" size={24} />
    },
    {
      title: "Context-Aware Collaboration",
      description: "The system understands the context of documents and discussions, ensuring teams always have the information they need.",
      icon: <BarChart3 className="text-[#F48C71]" size={24} />
    }
  ];

  return (
    <div className="bg-white min-h-screen py-24 px-8" id="why-us">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Image Left with Offset Block */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-[650px]"
        >
          {/* Offset Background Block */}
          <div className="absolute top-10 left-0 w-[85%] h-[80%] bg-[#9AB8D4]/20 rounded-3xl z-0"></div>
          
          {/* Image Container */}
          <div className="absolute top-0 right-10 w-[85%] h-[85%] bg-white shadow-2xl overflow-hidden z-10 rounded-3xl border-8 border-white p-6 flex items-center justify-center">
            <img src="/src/assets/why-us-visual.png" alt="Unified Platform" className="w-full h-auto object-contain" />
          </div>

           {/* Floating Badge */}
           <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute bottom-10 -right-5 bg-white px-10 py-6 shadow-2xl rounded-3xl border border-border-main z-20"
          >
            <p className="text-sm font-bold text-[#112A46]">
              <span className="text-secondary mr-2">10x Faster!</span>
              Efficiency Boosted.
            </p>
          </motion.div>

          {/* SVG Curvy Line */}
          <svg className="absolute -right-10 top-20 w-[200px] h-[400px] z-30 pointer-events-none stroke-[#9AB8D4]" fill="none" viewBox="0 0 200 400">
            <path strokeWidth="3" strokeLinecap="round" d="M10,10 C100,20 150,150 100,200 C50,250 10,150 50,100 C100,50 190,150 190,390" />
            <circle cx="10" cy="10" r="6" fill="#9AB8D4" />
          </svg>
        </motion.div>

        {/* Text Content Right */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">The Kortex Advantage</span>
          <h2 className="text-5xl md:text-6xl font-serif text-[#112A46] mb-10 leading-tight">
            Why Choose Kortex
          </h2>
          
          <div className="space-y-8 mb-12">
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="shrink-0 w-12 h-12 bg-background-alt rounded-2xl flex items-center justify-center group-hover:bg-[#F48C71]/10 transition-colors">
                  {reason.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#112A46] mb-2">{reason.title}</h4>
                  <p className="text-text-secondary leading-relaxed max-w-md">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={onAction} className="px-10 py-4 bg-[#112A46] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            Experience the Difference
          </button>
        </motion.div>
      </div>
    </div>
  );
};
