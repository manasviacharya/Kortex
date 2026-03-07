import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const howItWorksRef = useRef<HTMLElement>(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const professions = [
    { name: 'Journalism', icon: '📰', color: 'bg-primary', preview: 'Editorial Pipeline' },
    { name: 'Legal', icon: '⚖️', color: 'bg-status-error', preview: 'Case Repository' },
    { name: 'Academic Research', icon: '🎓', color: 'bg-ai', preview: 'Citation Manager' },
    { name: 'Writer / Author', icon: '✍️', color: 'bg-secondary', preview: 'Story Timeline' },
    { name: 'Startup / Product', icon: '🚀', color: 'bg-primary', preview: 'Product Roadmap' },
    { name: 'Consulting', icon: '📊', color: 'bg-secondary', preview: 'Strategic Insights' },
    { name: 'Media Production', icon: '🎥', color: 'bg-ai', preview: 'Production Slate' },
    { name: 'Debate / MUN', icon: '🗣️', color: 'bg-status-warning', preview: 'Evidence Board' },
  ];

  return (
    <div className="bg-background-main min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto sticky top-0 z-50 bg-background-main/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-ai-gradient rounded-lg flex items-center justify-center text-white font-bold text-lg">K</div>
          <span className="text-2xl font-bold text-text-primary tracking-tight">Kortex</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToHowItWorks(); }} className="hover:text-primary transition-colors">How It Works</a>
          <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
          <a href="#enterprise" className="hover:text-primary transition-colors">Enterprise</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onStart} className="text-sm font-semibold text-text-primary hover:text-primary transition-colors">Log in</button>
          <button onClick={onStart} className="btn-primary py-2 px-5 text-sm">Start Your Workspace</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-ai/10 text-ai text-xs font-bold uppercase tracking-widest mb-6">
              The Cortex of Collaboration
            </span>
            <h1 className="text-6xl md:text-7xl font-bold text-text-primary mb-6 tracking-tight leading-[1.1]">
              The Intelligent Workspace for <br />
              <span className="text-transparent bg-clip-text bg-ai-gradient">Knowledge Teams</span>
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed">
              A profession-aware platform where journalists, researchers, legal teams, writers, and startups research, draft, collaborate, and validate knowledge in one system.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={onStart} className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">Start Your Workspace</button>
              <button onClick={scrollToHowItWorks} className="px-8 py-4 bg-white border border-border-main rounded-xl font-medium hover:bg-background-alt transition-all w-full sm:w-auto">See How It Works</button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="absolute -inset-4 bg-ai-gradient opacity-20 blur-3xl rounded-[3rem]"></div>
            <div className="relative bg-panel rounded-2xl border border-border-main shadow-2xl overflow-hidden aspect-[16/10] max-w-6xl mx-auto">
               <div className="h-full w-full bg-background-alt/50 flex items-center justify-center p-8">
                  <div className="w-full h-full grid grid-cols-12 gap-4">
                    <div className="col-span-3 space-y-4 text-left">
                      <div className="h-32 bg-white rounded-xl border border-border-main p-4 shadow-sm">
                        <p className="text-[10px] font-bold text-text-muted mb-2 uppercase">Team Activity</p>
                        <div className="space-y-2">
                           <div className="flex items-center gap-2">
                             <div className="w-4 h-4 bg-primary/20 rounded-full"></div>
                             <div className="w-3/4 h-1.5 bg-background-alt rounded"></div>
                           </div>
                           <div className="flex items-center gap-2">
                             <div className="w-4 h-4 bg-secondary/20 rounded-full"></div>
                             <div className="w-1/2 h-1.5 bg-background-alt rounded"></div>
                           </div>
                        </div>
                      </div>
                      <div className="h-48 bg-white rounded-xl border border-border-main p-4 shadow-sm">
                        <p className="text-[10px] font-bold text-text-muted mb-4 uppercase">Workflow Pipeline</p>
                        <div className="space-y-3">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-primary' : i === 2 ? 'bg-ai' : 'bg-secondary'}`}></div>
                              <div className="flex-1 h-1.5 bg-background-alt rounded"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 bg-white rounded-xl border border-border-main p-6 shadow-sm text-left">
                      <div className="flex items-center justify-between mb-8">
                        <div className="w-1/3 h-3 bg-border-main rounded"></div>
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 bg-background-alt rounded-full border border-white"></div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="w-full h-2 bg-background-alt rounded"></div>
                        <div className="w-full h-2 bg-background-alt rounded"></div>
                        <div className="w-5/6 h-2 bg-background-alt rounded"></div>
                        <div className="w-full h-2 bg-background-alt rounded"></div>
                        <div className="w-4/6 h-2 bg-background-alt rounded"></div>
                      </div>
                    </div>
                    <div className="col-span-3 space-y-4 text-left">
                       <div className="h-full bg-purple-50/50 rounded-xl border border-purple-100 p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-4 h-4 bg-ai rounded flex items-center justify-center text-[8px] text-white">✨</div>
                          <p className="text-[10px] font-bold text-ai uppercase">AI Insights</p>
                        </div>
                        <div className="space-y-4">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white p-2 rounded-lg border border-purple-100 shadow-sm">
                              <div className="w-3/4 h-1.5 bg-background-alt rounded mb-2"></div>
                              <div className="w-full h-1 bg-background-alt/50 rounded"></div>
                            </div>
                          ))}
                        </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white px-8" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Fragmented tools kill productivity</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Knowledge teams lose context, continuity, and validation by switching between half a dozen apps.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: 'Google Docs', icon: '📄' },
              { name: 'Slack', icon: '💬' },
              { name: 'Notion', icon: '📓' },
              { name: 'Email', icon: '✉️' },
              { name: 'Trello', icon: '📋' }
            ].map(tool => (
              <div key={tool.name} className="flex flex-col items-center justify-center p-6 grayscale hover:grayscale-0 transition-all cursor-pointer opacity-50 hover:opacity-100 bg-background-alt/30 rounded-2xl border border-transparent hover:border-border-main">
                <div className="text-3xl mb-4">{tool.icon}</div>
                <span className="text-sm font-medium text-text-secondary">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* See How It Works Section */}
      <section className="py-24 px-8 bg-background-main" id="how-it-works" ref={howItWorksRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-text-primary mb-4">See How It Works</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">From research to publication, Kortex automates the intelligence lifecycle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Research Stage', desc: 'AI extracts insights and links related knowledge as you upload sources.', icon: '🔍' },
              { step: '02', title: 'Drafting Stage', desc: 'Collaborative editor with real-time AI suggestions and validation.', icon: '📝' },
              { step: '03', title: 'Review Pipeline', desc: 'Customizable editorial and approval workflows built for your team.', icon: '✅' },
              { step: '04', title: 'Knowledge Graph', desc: 'All outputs feed the organization brain for future reuse and discovery.', icon: '🧠' }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="relative p-8 bg-panel rounded-2xl border border-border-main shadow-sm"
              >
                <div className="text-4xl font-black text-primary/10 absolute top-4 right-6">{step.step}</div>
                <div className="text-4xl mb-6">{step.icon}</div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Profession-Aware Workspaces */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">Profession-Aware Workspaces</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Tailored interfaces for knowledge-driven teams.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {professions.map((prof, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="card p-6 cursor-pointer group"
              >
                <div className={`w-12 h-12 ${prof.color} rounded-xl flex items-center justify-center text-white text-2xl mb-6 group-hover:rotate-12 transition-transform`}>
                  {prof.icon}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{prof.name}</h3>
                <p className="text-xs text-text-muted mb-4">Adapts to: {prof.preview}</p>
                <div className="w-full h-24 bg-background-alt rounded-lg flex items-center justify-center overflow-hidden border border-border-main">
                   <div className="w-3/4 space-y-2">
                      <div className="w-full h-1 bg-border-main/50 rounded"></div>
                      <div className="w-1/2 h-1 bg-border-main/50 rounded"></div>
                      <div className="w-full h-1 bg-border-main/50 rounded"></div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Intelligence & Collaboration */}
      <section className="py-24 px-8 bg-background-alt/50" id="solutions">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <span className="text-primary font-bold text-sm uppercase tracking-widest">AI Intelligence Layer</span>
               <h2 className="text-4xl font-bold text-text-primary leading-tight">AI appears contextually, <br />not as a simple chatbot.</h2>
               <div className="space-y-6">
                  {[
                    { title: 'Summarize research', desc: 'Extract key insights from hundreds of documents instantly.' },
                    { title: 'Link related knowledge', desc: 'Automatically connect dots across disparate projects.' },
                    { title: 'Detect inconsistencies', desc: 'Real-time validation for facts and narrative logic.' },
                    { title: 'Automate workflows', desc: 'Let AI handle the repetitive task of moving work forward.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="w-6 h-6 rounded-full bg-ai/10 flex items-center justify-center text-ai shrink-0">✨</div>
                       <div>
                          <h4 className="font-bold text-text-primary">{item.title}</h4>
                          <p className="text-sm text-text-secondary">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="relative">
               <div className="absolute -inset-4 bg-ai-gradient opacity-10 blur-2xl rounded-full"></div>
               <div className="relative glass p-8 rounded-3xl border border-ai/20">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-10 h-10 bg-ai rounded-xl flex items-center justify-center text-white">🧠</div>
                     <p className="font-bold text-text-primary uppercase tracking-widest text-sm">Neural Knowledge Graph</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                       <div className="flex-1 h-2 bg-primary/10 rounded"></div>
                       <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="h-24 bg-white/50 rounded-2xl border border-white/30 p-4">
                          <div className="w-1/2 h-1.5 bg-ai/20 rounded mb-2"></div>
                          <div className="w-full h-1 bg-ai/10 rounded"></div>
                       </div>
                       <div className="h-24 bg-white/50 rounded-2xl border border-white/30 p-4">
                          <div className="w-1/2 h-1.5 bg-primary/20 rounded mb-2"></div>
                          <div className="w-full h-1 bg-primary/10 rounded"></div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration System */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center direction-rtl">
            <div className="relative order-2 lg:order-1">
               <div className="card p-8 rounded-3xl border-border-main bg-background-alt/30">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white text-xl">💬</div>
                     <p className="font-bold text-text-primary uppercase tracking-widest text-sm">Unified Collaboration</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                       <div className="w-8 h-8 bg-primary/20 rounded-full shrink-0"></div>
                       <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-border-main text-xs shadow-sm">
                          Has everyone reviewed the new editorial pipeline?
                       </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                       <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none text-xs shadow-sm">
                          Yes, just finished the fact-check.
                       </div>
                       <div className="w-8 h-8 bg-secondary/20 rounded-full shrink-0"></div>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-border-main shadow-sm flex items-center gap-4">
                       <div className="w-8 h-8 bg-ai/10 rounded-lg flex items-center justify-center text-ai">📄</div>
                       <div className="flex-1">
                          <p className="text-[10px] font-bold text-text-primary">Draft: AI Ethics.docx</p>
                          <p className="text-[8px] text-text-muted">3 comments • Updated 5m ago</p>
                       </div>
                       <button className="text-[10px] font-bold text-primary uppercase">Open</button>
                    </div>
                  </div>
               </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
               <span className="text-secondary font-bold text-sm uppercase tracking-widest">Collaboration System</span>
               <h2 className="text-4xl font-bold text-text-primary leading-tight">Everything in one intelligent environment.</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: 'Team Chat', desc: 'Integrated real-time messaging.', icon: '💬' },
                    { title: 'Shared Editing', desc: 'Collaborative drafting with AI assistance.', icon: '📝' },
                    { title: 'Task Boards', desc: 'Manage workflows and approval cycles.', icon: '📋' },
                    { title: 'Review Systems', desc: 'Structured feedback and validation.', icon: '✅' }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                       <div className="text-2xl mb-2">{item.icon}</div>
                       <h4 className="font-bold text-text-primary">{item.title}</h4>
                       <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-background-main">
        <div className="max-w-5xl mx-auto bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-ai/20 blur-[100px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 blur-[100px] -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Build your organization’s knowledge brain</h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of researchers, journalists, and startups who are building the future with Kortex.
            </p>
            <button onClick={onStart} className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-background-main transition-all shadow-lg">
              Create Workspace
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border-main px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-ai-gradient rounded flex items-center justify-center text-white font-bold text-xs">K</div>
            <span className="text-lg font-bold text-text-primary tracking-tight">Kortex</span>
          </div>
          <div className="flex gap-8 text-sm text-text-muted">
            <a href="#" className="hover:text-text-primary">Privacy</a>
            <a href="#" className="hover:text-text-primary">Terms</a>
            <a href="#" className="hover:text-text-primary">Twitter</a>
            <a href="#" className="hover:text-text-primary">LinkedIn</a>
          </div>
          <p className="text-sm text-text-muted">© 2026 Kortex Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
