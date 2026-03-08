import React from 'react';
import { motion } from 'framer-motion';
import testimonialsImage from '../../assets/testimonials-visual.png';
import { Quote } from 'lucide-react';

interface TestimonialsPageProps {
  onAction: () => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onAction }) => {
  const testimonials = [
    {
      role: "Journalist – Editorial Team",
      text: "Kortex has transformed the way we handle news research and article drafting. The integrated fact-checking tools and collaborative editor make our workflow much more efficient.",
      author: "Sarah J."
    },
    {
      role: "Legal Professional – Litigation Team",
      text: "Managing case documents, evidence, and research in one place has significantly improved our preparation process. Kortex keeps everything structured and accessible.",
      author: "Michael R."
    },
    {
      role: "Academic Researcher – University Lab",
      text: "The research assistant and collaboration features make literature reviews and paper writing much faster. It feels like a workspace built specifically for researchers.",
      author: "Dr. Elena K."
    },
    {
      role: "Startup Founder – Product Team",
      text: "Our entire product documentation, brainstorming sessions, and team discussions now happen in Kortex. It has become the central hub for our team's knowledge.",
      author: "David L."
    }
  ];

  return (
    <div className="bg-background-alt min-h-screen py-24 px-8" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-4 block">Success Stories</span>
          <h2 className="text-5xl md:text-6xl font-serif text-[#112A46] mb-8">
            Testimonials
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Leading professionals across industries trust Kortex to power their most important work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Photo Left with Offset Blocks */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[550px]"
          >
            {/* Background Decorations */}
            <div className="absolute top-[10%] right-0 w-[80%] h-[80%] bg-[#F48C71]/10 rounded-[40px] z-0"></div>
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[#112A46]/5 rounded-full blur-3xl z-0"></div>
            
            {/* Main Visual */}
            <div className="relative w-[90%] h-[90%] bg-white shadow-2xl overflow-hidden z-10 rounded-[40px] border-8 border-white p-10 flex items-center justify-center">
              <img src={testimonialsImage} alt="Happy Professionals" className="w-full h-auto object-contain" />
            </div>

            {/* Quote Icon */}
            <div className="absolute -top-5 -left-5 w-20 h-20 bg-[#F48C71] rounded-full flex items-center justify-center shadow-2xl z-20">
              <Quote className="text-white" size={32} fill="white" />
            </div>
          </motion.div>

          {/* Testimonials Grid Right */}
          <div className="grid grid-cols-1 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white border border-border-main rounded-3xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#F48C71]/20 rounded-full flex items-center justify-center text-[#F48C71] font-bold text-lg">
                    {t.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#112A46]">{t.author}</h4>
                    <p className="text-xs text-secondary font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
                <p className="font-serif italic text-[#112A46] leading-relaxed">
                  "{t.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#112A46] rounded-[40px] p-12 lg:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#F48C71]/20 blur-[100px] rounded-full" />
          <h3 className="text-4xl font-serif mb-6 relative z-10">Join Thousands of Knowledge Professionals</h3>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto relative z-10">
            Empower your team with a workspace that understands your profession. 
            Start building your shared intelligence today.
          </p>
          <button onClick={onAction} className="px-10 py-4 bg-[#F48C71] text-white font-bold rounded-full shadow-2xl hover:bg-opacity-90 transition-all relative z-10">
            Get Started for Free
          </button>
        </motion.div>
      </div>
    </div>
  );
};
