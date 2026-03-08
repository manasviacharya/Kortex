import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Search, FileText, CheckCircle2, 
  MessageSquare, Database, Layout, Activity,
  ChevronRight
} from 'lucide-react';

interface FeaturesPageProps {
  onAction: () => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onAction }) => {
  const features = [
    {
      title: "Profession-Aware Workspaces",
      description: "Kortex adapts its interface depending on the profession. Journalists, legal professionals, researchers, writers, and teams each receive tailored dashboards and tools designed for their workflows.",
      icon: <Users size={24} />
    },
    {
      title: "AI-Powered Research Assistant",
      description: "AI helps discover relevant sources, summarize documents, extract key insights, and assist users in making informed decisions faster.",
      icon: <Search size={24} />
    },
    {
      title: "Smart Drafting Environment",
      description: "A collaborative editor allows teams to draft articles, legal documents, research papers, or reports together with real-time editing, comments, and version tracking.",
      icon: <FileText size={24} />
    },
    {
      title: "Fact-Checking & Validation",
      description: "Integrated validation tools help detect inconsistencies, check sources, identify plagiarism, and ensure accuracy before publishing.",
      icon: <CheckCircle2 size={24} />
    },
    {
      title: "Team Collaboration",
      description: "Group chats, channels, document comments, and video meetings allow teams to communicate and collaborate seamlessly within the platform.",
      icon: <MessageSquare size={24} />
    },
    {
      title: "Knowledge Management",
      description: "Kortex builds a structured knowledge base where documents, research materials, and notes remain connected and easily searchable.",
      icon: <Database size={24} />
    },
    {
      title: "Workflow & Task Tracking",
      description: "Project dashboards, timelines, and Kanban boards help teams manage tasks, track progress, and streamline approvals.",
      icon: <Layout size={24} />
    },
    {
      title: "Real-Time Monitoring",
      description: "Monitor relevant information such as news updates, research publications, or project developments through dynamic dashboards.",
      icon: <Activity size={24} />
    }
  ];

  return (
    <div className="relative min-h-screen py-24" id="features">
      {/* Background Split */}
      <div className="absolute inset-0 z-0">
        <div className="h-1/2 bg-white" />
        <div className="h-1/2 bg-[#9AB8D4]/20" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-4 block">Platform Excellence</span>
          <h2 className="text-5xl md:text-6xl font-serif text-[#112A46] mb-6">
            Features
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Everything you need to power your high-stakes professional workflow.
          </p>
        </motion.div>

        {/* Features Rows */}
        <div className="space-y-12">
          {/* First row of 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.slice(0, 4).map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} delay={idx * 0.1} onAction={onAction} />
            ))}
          </div>
          {/* Second row of 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.slice(4, 8).map((feature, idx) => (
              <FeatureCard key={idx + 4} feature={feature} delay={idx * 0.1} onAction={onAction} />
            ))}
          </div>
        </div>

        {/* Global CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
           <button onClick={onAction} className="px-10 py-4 bg-[#112A46] text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            Get Started for Free
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ feature, delay, onAction }: { feature: any, delay: number, onAction: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-10 flex flex-col items-center text-center shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] rounded-sm border border-border-main hover:-translate-y-2 transition-transform duration-300"
  >
    <div className="w-16 h-16 bg-[#F48C71] rounded-full flex items-center justify-center text-white mb-8 shadow-inner">
      {feature.icon}
    </div>
    <h4 className="text-xl font-bold text-[#112A46] mb-6 uppercase tracking-wider">{feature.title}</h4>
    <p className="text-sm text-text-muted leading-relaxed mb-8 italic">
      {feature.description}
    </p>
    <button 
      onClick={onAction}
      className="mt-auto text-xs font-bold text-[#112A46] uppercase tracking-[0.2em] border-b-2 border-[#F48C71] pb-1 hover:text-[#F48C71] transition-colors flex items-center gap-1 group"
    >
      More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);
