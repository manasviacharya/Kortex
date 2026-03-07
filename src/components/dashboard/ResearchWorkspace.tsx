import React from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';

interface WorkspaceViewProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
}

const professionTools = {
  Journalism: [
    { name: 'Source Tracker', icon: '🔗', desc: 'Track and verify source credibility.' },
    { name: 'News Monitor', icon: '📡', desc: 'Real-time monitoring of news wires.' },
    { name: 'Fact-Check Engine', icon: '⚖️', desc: 'Validate claims against trusted databases.' }
  ],
  Legal: [
    { name: 'Precedent Search', icon: '📚', desc: 'Search through legal case history.' },
    { name: 'Evidence Extraction', icon: '📂', desc: 'AI-driven evidence classification.' },
    { name: 'Compliance Alerts', icon: '🔔', desc: 'Monitor regulatory changes.' }
  ],
  'Academic Research': [
    { name: 'Citation Manager', icon: '🔖', desc: 'Organize and format your references.' },
    { name: 'Paper Extraction', icon: '📄', desc: 'Extract key data from academic PDFs.' },
    { name: 'Literature Review', icon: '🧪', desc: 'Map relationships between studies.' }
  ],
  Writer: [
    { name: 'Story Timeline', icon: '⏳', desc: 'Visualize narrative structure.' },
    { name: 'Character DB', icon: '👤', desc: 'Manage character traits and arcs.' },
    { name: 'Idea Board', icon: '💡', desc: 'Organize world-building notes.' }
  ],
  Startup: [
    { name: 'Roadmap Builder', icon: '🗺️', desc: 'Plan and track product milestones.' },
    { name: 'Decision Log', icon: '📝', desc: 'Document key pivot points and rationale.' },
    { name: 'Feature Docs', icon: '🚀', desc: 'Centralized product documentation.' }
  ],
  Consulting: [
    { name: 'Market Analysis', icon: '📊', desc: 'Generate competitor and sector reports.' },
    { name: 'Strategic Insights', icon: '🎯', desc: 'Identify growth opportunities.' },
    { name: 'Discovery Tool', icon: '🕵️', desc: 'Client interview and data gathering.' }
  ],
  'Media Production': [
    { name: 'Production Slate', icon: '🎬', desc: 'Manage shoot schedules and assets.' },
    { name: 'Footage Library', icon: '🎥', desc: 'Index and tag raw media assets.' },
    { name: 'Script Assistant', icon: '📜', desc: 'AI-powered script analysis.' }
  ]
};

export const ResearchWorkspace: React.FC<WorkspaceViewProps> = ({ profession, role, orgName, workspaceType }) => {
  const tools = professionTools[profession as keyof typeof professionTools] || professionTools.Journalism;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">{profession} Research Hub</h1>
        <p className="text-text-secondary">
          {workspaceType === 'individual' ? 'Personal' : orgName} AI-powered knowledge extraction for your {profession} projects.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tools.map(tool => (
              <div key={tool.name} className="card p-5 hover:border-primary transition-all cursor-pointer group">
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{tool.icon}</div>
                <h4 className="text-sm font-bold text-text-primary mb-1">{tool.name}</h4>
                <p className="text-[10px] text-text-secondary leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>

          <div className="card p-8 border-2 border-dashed border-border-main bg-background-alt/30 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-3xl mb-4">📤</div>
            <h3 className="text-lg font-bold text-text-primary mb-2">Upload {profession} Material</h3>
            <p className="text-sm text-text-secondary max-w-sm mb-6">Drop PDF, Word, or Markdown files here. Kortex AI will automatically index and extract {profession.toLowerCase()}-specific insights.</p>
            <button className="btn-primary">Browse Files</button>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
               <span>🔍</span> Recent Extractions
            </h2>
            <div className="space-y-3">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border-main hover:bg-background-alt transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-ai/10 rounded-lg flex items-center justify-center text-ai">📄</div>
                       <div>
                          <p className="text-sm font-bold text-text-primary">{profession} Document {i}</p>
                          <p className="text-[10px] text-text-muted">Extracted 24 {profession.toLowerCase()} insights • {i}h ago</p>
                       </div>
                    </div>
                    <button className="text-[10px] font-bold text-primary uppercase opacity-0 group-hover:opacity-100 transition-opacity">View Insights</button>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-6">
           <div className="card p-6 bg-ai-gradient text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 <span>✨</span> AI {profession} Assistant
              </h3>
              <p className="text-xs text-white/80 leading-relaxed mb-6">
                 "I've analyzed your {profession.toLowerCase()} documents and found 3 recurring patterns. Would you like me to create a summary for your draft?"
              </p>
              <button className="w-full bg-white text-primary py-2 rounded-xl text-xs font-bold uppercase tracking-widest">Generate Summary</button>
           </div>
           
           <div className="card p-6">
              <h3 className="font-bold text-text-primary mb-4 text-sm uppercase tracking-widest">{profession} Knowledge Base</h3>
              <div className="relative mb-4">
                 <input type="text" placeholder={`Search ${profession.toLowerCase()} knowledge...`} className="w-full bg-background-alt border border-border-main rounded-xl px-4 py-2 text-xs focus:outline-none" />
                 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs">🔍</span>
              </div>
              <div className="space-y-2">
                 {tools.map(tool => (
                   <button key={tool.name} className="w-full text-left px-3 py-2 rounded-lg text-[10px] font-medium text-text-secondary hover:bg-background-alt transition-colors">#{tool.name.replace(' ', '')}</button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
