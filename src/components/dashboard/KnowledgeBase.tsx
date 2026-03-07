import React from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';

interface WorkspaceViewProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
}

const professionClusters = {
  Journalism: [
    { title: 'Source Network Alpha', count: '45 sources', color: 'bg-primary' },
    { title: 'Story Arc: Tech Shift', count: '12 drafts', color: 'bg-secondary' },
    { title: 'Fact-Check Archive', count: '82 verified', color: 'bg-ai' }
  ],
  Legal: [
    { title: 'Case Precedents', count: '124 files', color: 'bg-primary' },
    { title: 'Evidence Map: Case #342', count: '12 items', color: 'bg-secondary' },
    { title: 'Compliance Library', count: '8 modules', color: 'bg-ai' }
  ],
  'Academic Research': [
    { title: 'Paper Network', count: '240 citations', color: 'bg-primary' },
    { title: 'Dataset Clusters', count: '15 sets', color: 'bg-secondary' },
    { title: 'Peer Review Log', count: '4 cycles', color: 'bg-ai' }
  ],
  Writer: [
    { title: 'Character Relations', count: '28 profiles', color: 'bg-primary' },
    { title: 'World-Building Map', count: '14 regions', color: 'bg-secondary' },
    { title: 'Plot Thread Hub', count: '8 arcs', color: 'bg-ai' }
  ],
  Startup: [
    { title: 'Product Features', count: '32 docs', color: 'bg-primary' },
    { title: 'Decision Rationale', count: '56 logs', color: 'bg-secondary' },
    { title: 'Market Competitors', count: '12 profiles', color: 'bg-ai' }
  ],
  Consulting: [
    { title: 'Sector Insights', count: '124 findings', color: 'bg-primary' },
    { title: 'Client Knowledge', count: '6 projects', color: 'bg-secondary' },
    { title: 'Strategy Frameworks', count: '8 models', color: 'bg-ai' }
  ],
  'Media Production': [
    { title: 'Asset Library', count: '840 clips', color: 'bg-primary' },
    { title: 'Script Revisions', count: '14 drafts', color: 'bg-secondary' },
    { title: 'Crew Contacts', count: '42 profiles', color: 'bg-ai' }
  ]
};

export const KnowledgeBase: React.FC<WorkspaceViewProps> = ({ profession, role, orgName, workspaceType }) => {
  const clusters = professionClusters[profession as keyof typeof professionClusters] || professionClusters.Journalism;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">
            {workspaceType === 'individual' ? 'Personal' : 'Organization'} Brain
          </h1>
          <p className="text-text-secondary">Mapping {profession.toLowerCase()}-specific connections across {workspaceType === 'individual' ? 'your' : orgName + "'s"} knowledge base.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 bg-white border border-border-main rounded-xl text-sm font-medium hover:bg-background-alt transition-colors">Export Map</button>
           <button className="px-4 py-2 bg-ai text-white rounded-xl text-sm font-medium hover:bg-ai/90 transition-colors shadow-sm">Sync Brain</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-6">
          <div className="card p-8 h-[600px] flex flex-col items-center justify-center relative overflow-hidden group border-2 border-ai/10">
             <div className="absolute inset-0 bg-ai-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-1000"></div>
             <div className="relative z-10 text-center">
                <div className="w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center mb-8 border border-border-main">
                   <div className="w-12 h-12 bg-ai-gradient rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">{profession} Neural Network</h3>
                <p className="text-sm text-text-secondary max-w-sm mx-auto mb-10 leading-relaxed italic">
                   "Kortex AI has mapped your {profession.toLowerCase()} entities and identified 12.4k meaningful connections."
                </p>
                <div className="flex items-center justify-center gap-6">
                   <div className="text-center">
                      <p className="text-3xl font-bold text-primary mb-1 tracking-tight">2.4k</p>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Entities</p>
                   </div>
                   <div className="w-px h-10 bg-border-main"></div>
                   <div className="text-center">
                      <p className="text-3xl font-bold text-ai mb-1 tracking-tight">12.4k</p>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Links</p>
                   </div>
                   <div className="w-px h-10 bg-border-main"></div>
                   <div className="text-center">
                      <p className="text-3xl font-bold text-secondary mb-1 tracking-tight">{clusters.length}</p>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Clusters</p>
                   </div>
                </div>
             </div>
             {/* Mock nodes */}
             {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
               <div key={i} className="absolute w-2 h-2 bg-ai/20 rounded-full animate-ping" style={{
                 top: `${Math.random() * 80 + 10}%`,
                 left: `${Math.random() * 80 + 10}%`,
                 animationDelay: `${Math.random() * 2}s`
               }}></div>
             ))}
          </div>
        </div>

        <div className="md:col-span-4 space-y-6">
           <div className="card p-6">
              <h3 className="font-bold text-text-primary mb-6 text-sm uppercase tracking-widest">{profession} Clusters</h3>
              <div className="space-y-4">
                 {clusters.map(cluster => (
                   <button key={cluster.title} className="w-full text-left p-4 rounded-xl border border-border-main hover:bg-background-alt transition-all group">
                      <div className="flex items-center gap-3 mb-2">
                         <div className={`w-2 h-2 rounded-full ${cluster.color}`}></div>
                         <p className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">{cluster.title}</p>
                      </div>
                      <p className="text-[10px] text-text-muted">{cluster.count} connected across your projects</p>
                   </button>
                 ))}
              </div>
           </div>

           <div className="card p-6 bg-primary text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 <span>🧠</span> AI Knowledge Recall
              </h3>
              <p className="text-xs text-white/80 leading-relaxed mb-6">
                 "I've recalled a {profession.toLowerCase()} pattern from your previous work that has a 92% similarity to your current focus. Should I link it?"
              </p>
              <button className="w-full bg-white text-primary py-2 rounded-xl text-xs font-bold uppercase tracking-widest">Recall Memory</button>
           </div>
        </div>
      </div>
    </div>
  );
};
