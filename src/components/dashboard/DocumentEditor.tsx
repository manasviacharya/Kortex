import React from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';

interface WorkspaceViewProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
}

const professionDraftingTools = {
  Journalism: [
    { title: 'Headline Generator', desc: 'Create 5 high-impact headlines for this piece.' },
    { title: 'Fact-Check Draft', desc: 'Validate all claims in this draft.' },
    { title: 'Style Guide Check', desc: 'Ensure adherence to AP/Reuters style.' }
  ],
  Legal: [
    { title: 'Clause Suggestion', desc: 'Suggest relevant legal clauses for this brief.' },
    { title: 'Citation Verifier', desc: 'Ensure all legal citations are valid.' },
    { title: 'Risk Analysis', desc: 'Identify potential compliance risks in language.' }
  ],
  'Academic Research': [
    { title: 'Abstract Generator', desc: 'Create a concise abstract for your paper.' },
    { title: 'Citation Formatter', desc: 'Format references to APA/MLA/Chicago.' },
    { title: 'Methodology Review', desc: 'Analyze the clarity of your experimental setup.' }
  ],
  Writer: [
    { title: 'Tone Tuner', desc: 'Adjust the narrative voice and pacing.' },
    { title: 'Character Consistency', desc: 'Check if character actions align with their DB.' },
    { title: 'Plot Hole Detector', desc: 'Identify logical inconsistencies in the story.' }
  ],
  Startup: [
    { title: 'Value Prop Refinement', desc: 'Sharpen your product value proposition.' },
    { title: 'Competitive Edge', desc: 'Highlight unique features vs competitors.' },
    { title: 'Investor Pitch Polish', desc: 'Optimize language for fundraising.' }
  ],
  Consulting: [
    { title: 'Insight Extraction', desc: 'Summarize key strategic findings.' },
    { title: 'Executive Summary', desc: 'Create a 1-page summary for leadership.' },
    { title: 'Data Visualization', desc: 'Suggest charts for your findings.' }
  ],
  'Media Production': [
    { title: 'Dialogue Polish', desc: 'Refine script dialogue for natural flow.' },
    { title: 'Beat Sheet Generator', desc: 'Convert draft into a production beat sheet.' },
    { title: 'Visual Description', desc: 'Enhance descriptive language for crew.' }
  ]
};

export const DocumentEditor: React.FC<WorkspaceViewProps> = ({ profession, role, orgName, workspaceType }) => {
  const draftingTools = professionDraftingTools[profession as keyof typeof professionDraftingTools] || professionDraftingTools.Journalism;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">{profession} Editor</h1>
          <p className="text-text-secondary">
            {workspaceType === 'individual' ? 'Personal' : orgName} collaborative {profession} drafting.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 bg-white border border-border-main rounded-xl text-sm font-medium hover:bg-background-alt transition-colors">Save Copy</button>
           <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">Publish {profession}</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-6">
          <div className="card p-10 min-h-[600px] shadow-sm relative group overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
             <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <div className="flex items-center gap-4 text-text-muted text-xs font-bold uppercase tracking-widest mb-10">
                   <span className="text-primary">Draft #241</span>
                   <span>•</span>
                   <span>Created by John Doe</span>
                   <span>•</span>
                   <span>3,240 words</span>
                </div>
                <h2 className="text-4xl font-black text-text-primary tracking-tight leading-tight mb-8">
                   Untitled {profession} Project
                </h2>
                <div className="space-y-6 text-text-secondary leading-relaxed text-lg font-medium">
                   <p>Start writing your {profession.toLowerCase()} masterpiece here. Kortex AI will provide real-time suggestions based on your role as {role} and your organization's memory.</p>
                   <div className="h-40 bg-background-alt/30 rounded-2xl border border-dashed border-border-main flex items-center justify-center text-text-muted italic">
                      Type '/' for {profession.toLowerCase()} commands or let AI help you draft...
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-6">
           <div className="card p-6 border-l-4 border-l-ai bg-ai/5">
              <h3 className="font-bold text-ai mb-4 flex items-center gap-2">
                 <span>✨</span> AI {profession} Assistant
              </h3>
              <div className="space-y-4">
                 {draftingTools.map(action => (
                   <button key={action.title} className="w-full text-left p-3 rounded-xl border border-ai/20 bg-white hover:bg-ai/5 transition-all group">
                      <p className="text-xs font-bold text-text-primary mb-1 group-hover:text-ai transition-colors">{action.title}</p>
                      <p className="text-[10px] text-text-muted">{action.desc}</p>
                   </button>
                 ))}
              </div>
           </div>

           <div className="card p-6">
              <h3 className="font-bold text-text-primary mb-6 text-sm uppercase tracking-widest">Team Comments</h3>
              <div className="space-y-6">
                 {[
                   { user: 'Sarah', msg: `The latest ${profession.toLowerCase()} data looks good.`, time: '2m ago' },
                   { user: 'Mike', msg: 'Should we include the case study from project Delta?', time: '1h ago' }
                 ].map((comment, i) => (
                   <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">S{i}</div>
                      <div>
                         <p className="text-xs font-bold text-text-primary mb-1">{comment.user} <span className="text-[10px] text-text-muted font-normal ml-1">{comment.time}</span></p>
                         <p className="text-xs text-text-secondary leading-normal">{comment.msg}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-8 flex items-center gap-2">
                 <input type="text" placeholder="Add a comment..." className="flex-1 bg-background-alt border border-border-main rounded-xl px-4 py-2 text-xs focus:outline-none" />
                 <button className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center">➜</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
