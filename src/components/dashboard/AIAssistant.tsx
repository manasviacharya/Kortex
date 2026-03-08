import React from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAction } from '../../context/ActionContext';

interface WorkspaceViewProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
}

export const AIAssistant: React.FC<WorkspaceViewProps> = ({ profession, role, orgName, workspaceType }) => {
  const { triggerAction } = useAction();
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <header>
        <h1 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">Kortex AI</h1>
        <p className="text-text-secondary">Your intelligent companion for {profession} excellence at {workspaceType === 'individual' ? 'your personal workspace' : orgName}.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-1">
        <div className="md:col-span-8 flex flex-col gap-6">
           <div className="card p-6 flex-1 bg-ai-gradient/5 border-ai/10 overflow-y-auto max-h-[500px] space-y-6">
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-ai-gradient flex items-center justify-center shrink-0 shadow-lg"><Sparkles className="w-5 h-5 text-white" /></div>
                 <div className="bg-white p-5 rounded-3xl rounded-tl-none border border-ai/10 shadow-sm space-y-3">
                    <p className="text-sm font-bold text-ai uppercase tracking-widest">Kortex Intelligence</p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                       Hello John! I've been analyzing your team's activity in {orgName}. Based on your role as {role}, I've prepared a summary of the latest {profession} trends and identified 3 knowledge gaps in your current drafts.
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">How can I assist you today?</p>
                 </div>
              </div>
              <div className="flex gap-4 justify-end">
                 <div className="bg-primary text-white p-5 rounded-3xl rounded-tr-none shadow-lg max-w-md">
                    <p className="text-sm font-medium">Can you help me summarize the market entry strategy for project Alpha?</p>
                 </div>
                 <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">JD</div>
              </div>
           </div>

           <div className="relative">
              <input 
                type="text" 
                placeholder="Ask Kortex AI anything..." 
                className="w-full bg-white border-2 border-border-main rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-ai transition-all shadow-xl" 
                onKeyDown={(e) => e.key === 'Enter' && triggerAction('AI Query', 'Processing your request with Kortex Intelligence.', 'ai')}
              />
              <button 
                onClick={() => triggerAction('AI Query', 'Processing your request with Kortex Intelligence.', 'ai')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-ai-gradient rounded-xl flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
           </div>
        </div>

        <div className="md:col-span-4 space-y-6">
           <div className="card p-6">
              <h3 className="font-bold text-text-primary mb-6 text-sm uppercase tracking-widest">Suggested Queries</h3>
              <div className="space-y-3">
                 {[
                   'Summarize recent research',
                   'Check draft for contradictions',
                   'Link related projects',
                   'Generate Source Credits'
                 ].map(q => (
                   <button 
                    key={q} 
                    onClick={() => triggerAction('AI Query', `Generating response for: "${q}".`, 'ai')}
                    className="w-full text-left p-3 rounded-xl border border-border-main hover:border-ai/50 hover:bg-ai/5 transition-all text-xs font-medium text-text-secondary group flex items-center gap-2"
                  >
                      <Sparkles size={14} className="group-hover:text-ai transition-colors" />
                      <span className="group-hover:text-ai transition-colors">{q}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="card p-6 bg-background-alt/50 border-dashed border-border-main">
              <h3 className="font-bold text-text-primary mb-2 text-sm">Knowledge Recall</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                 Kortex AI is currently indexing 12.4k data points across your organization.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
