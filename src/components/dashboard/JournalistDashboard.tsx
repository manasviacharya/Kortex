import React, { useState } from 'react';
import { type Role, type WorkspaceType } from '../../types';
import { cn } from '../../utils/cn';
import { Star, Layout, List, CheckCircle2 } from 'lucide-react';
import { useAction } from '../../context/ActionContext';

interface JournalistDashboardProps {
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
  setWorkspaceType: (type: WorkspaceType) => void;
  onOpenProject: () => void;
}

export const JournalistDashboard: React.FC<JournalistDashboardProps> = ({
  role,
  orgName,
  workspaceType,
  setWorkspaceType,
  onOpenProject,
}) => {
  const { triggerAction } = useAction();
  const [pitches, setPitches] = useState([
    { idea: 'The Silent Tech Lobby in Europe', status: 'Approved', reporter: 'Sarah', time: '2h ago' },
    { idea: 'Cryptocurrency vs. Traditional Banking: A Decadal Review', status: 'Review', reporter: 'Mike', time: '5h ago' },
    { idea: 'Local Elections: The Impact of Social Media Campaigns', status: 'Pitched', reporter: 'Elena', time: '1d ago' }
  ]);
  const [taskViewMode, setTaskViewMode] = useState<'compact' | 'list'>('compact');
  const [isPitching, setIsPitching] = useState(false);
  const [newPitch, setNewPitch] = useState('');

  const editorialPipeline = ['Idea', 'Draft', 'Review', 'Edit', 'Publish'];

  const togglePitchStatus = (index: number) => {
    setPitches(prev => prev.map((p, i) => {
      if (i === index) {
        const nextStatus = p.status === 'Approved' ? 'Pitched' : 'Approved';
        triggerAction('Pitch Update', `"${p.idea}" status changed to ${nextStatus}.`, nextStatus === 'Approved' ? 'success' : 'info');
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const submitPitch = () => {
    if (!newPitch.trim()) return;
    const pitch = {
      idea: newPitch,
      status: 'Pitched',
      reporter: 'You',
      time: 'Just now'
    };
    setPitches(prev => [pitch, ...prev]);
    setNewPitch('');
    setIsPitching(false);
    triggerAction('Pitch Submitted', `"${newPitch}" has been added to the newsroom queue.`, 'success');
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Dashboard Header & Editorial Pipeline Hero */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">Journalism Workspace</span>
            <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest">{role} Access</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-secondary mb-2 tracking-tight">Editorial Hub</h1>
          <p className="text-text-secondary">Welcome back. The {workspaceType === 'individual' ? 'Personal' : orgName} newsroom is active.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-background-alt rounded-lg border border-border-main">
            <button 
              onClick={() => setWorkspaceType('individual')}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                workspaceType === 'individual' ? "bg-white text-secondary shadow-sm border border-border-main" : "text-text-muted hover:text-text-secondary border border-transparent"
              )}
            >
              Individual
            </button>
            <button 
              onClick={() => setWorkspaceType('team')}
              className={cn(
                "px-4 py-1.5 rounded-md text-xs font-bold transition-all",
                workspaceType === 'team' ? "bg-white text-secondary shadow-sm border border-border-main" : "text-text-muted hover:text-text-secondary border border-transparent"
              )}
            >
              Team
            </button>
          </div>
        </div>
      </header>

      {/* Hero Pipeline Widget */}
      <div className="py-6 border-y border-border-main flex items-center justify-between">
        <h2 className="text-xl font-serif text-secondary">Editorial Pipeline</h2>
        <div className="flex items-center gap-4 text-sm font-bold tracking-wide">
          {editorialPipeline.map((step, idx) => (
             <React.Fragment key={step}>
                <span className={cn(
                  "transition-colors",
                  idx === 1 ? "text-primary border-b-2 border-primary pb-1" : "text-text-secondary hover:text-secondary"
                )}>
                  {step}
                </span>
                {idx < editorialPipeline.length - 1 && <span className="text-text-muted font-normal text-xs">→</span>}
             </React.Fragment>
          ))}
        </div>
      </div>

      {/* Top Grid: Story Ideas & News Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* 2. Story Ideas Board with Dual View */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif text-secondary flex items-center gap-2">
              <Star size={20} className="text-primary" fill="currentColor" /> Story Ideas Board
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex p-1 bg-background-alt rounded-lg border border-border-main">
                <button 
                  onClick={() => setTaskViewMode('compact')}
                  className={cn(
                    "p-1.5 rounded transition-all",
                    taskViewMode === 'compact' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  <Layout size={14} />
                </button>
                <button 
                  onClick={() => setTaskViewMode('list')}
                  className={cn(
                    "p-1.5 rounded transition-all",
                    taskViewMode === 'list' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                  )}
                >
                  <List size={14} />
                </button>
              </div>
              <button 
                onClick={() => setIsPitching(!isPitching)}
                className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
              >
                {isPitching ? 'Cancel' : '+ Pitch'}
              </button>
            </div>
          </div>

          {isPitching && (
            <div className="mb-4 flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <input 
                autoFocus
                type="text" 
                value={newPitch}
                onChange={(e) => setNewPitch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitPitch()}
                placeholder="Story title or headline idea..." 
                className="flex-1 bg-white border border-border-main rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors font-medium shadow-inner"
              />
              <button 
                onClick={submitPitch}
                className="bg-primary text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-sm"
              >
                Pitch
              </button>
            </div>
          )}

          {taskViewMode === 'compact' ? (
            <div className="space-y-4">
              {pitches.map((pitch, i) => (
                <div 
                  key={i} 
                  onClick={() => togglePitchStatus(i)}
                  className={cn(
                    "group flex items-center justify-between p-4 border transition-all rounded-xl cursor-pointer",
                    pitch.status === 'Approved' ? "bg-background-alt/30 border-transparent opacity-80" : "bg-white border-border-main hover:border-primary/30"
                  )}
                >
                  <div>
                    <h4 className={cn(
                      "font-bold transition-colors",
                      pitch.status === 'Approved' ? "text-text-muted line-through" : "text-secondary group-hover:text-primary"
                    )}>{pitch.idea}</h4>
                    <p className="text-xs text-text-secondary mt-1">Pitched by {pitch.reporter} • {pitch.time}</p>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded transition-colors",
                    pitch.status === 'Approved' ? "text-status-success bg-status-success/10" :
                    pitch.status === 'Review' ? "text-status-warning bg-status-warning/10" : "text-text-muted bg-background-alt"
                  )}>
                    {pitch.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-background-alt/30 rounded-xl overflow-hidden border border-border-main divide-y divide-border-main">
              {pitches.map((pitch, i) => (
                <div 
                  key={i}
                  onClick={() => togglePitchStatus(i)}
                  className={cn(
                    "flex items-center justify-between p-3 bg-white hover:bg-background-alt/50 transition-colors cursor-pointer group",
                    pitch.status === 'Approved' && "opacity-60 grayscale-[0.5]"
                  )}
                >
                  <div className="flex items-center gap-3 overflow-hidden px-1">
                    <div className={cn(
                      "w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                      pitch.status === 'Approved' ? "bg-status-success border-status-success text-white" : "border-text-muted group-hover:border-primary"
                    )}>
                      {pitch.status === 'Approved' && <CheckCircle2 size={10} />}
                    </div>
                    <span className={cn(
                      "text-[11px] truncate", 
                      pitch.status === 'Approved' ? "text-text-muted line-through" : "text-secondary font-bold"
                    )}>
                      {pitch.idea}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 px-2">
                    <span className={cn(
                      "text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded",
                      pitch.status === 'Approved' ? "bg-status-success/10 text-status-success" : 
                      pitch.status === 'Review' ? "bg-status-warning/10 text-status-warning" : "bg-background-alt text-text-muted"
                    )}>
                      {pitch.status}
                    </span>
                    <span className="text-[9px] text-text-muted font-medium whitespace-nowrap w-20 text-right">{pitch.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 7. Real-time News Monitor */}
        <div>
           <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif text-secondary flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-status-error animate-pulse"></div>
              Live News Monitor
            </h3>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Global Feed</span>
          </div>
          <div className="p-5 border border-border-main rounded-xl bg-background-alt/50 h-[320px] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-background-alt/50 to-transparent pointer-events-none z-10"></div>
            <div className="space-y-5 animate-[scroll_20s_linear_infinite]">
              {[
                { time: '10:42 AM', source: 'Reuters', headline: 'Global markets stabilize after unprecedented tech rally.' },
                { time: '10:38 AM', source: 'AP', headline: 'New climate agreement drafted in Geneva, sparking industry concerns.' },
                { time: '10:15 AM', source: 'Bloomberg', headline: 'Central banks hint at potential rate cuts in the coming quarter.' },
                { time: '09:55 AM', source: 'AFP', headline: 'Major cyber-attack disrupts European transport logistics.' },
                { time: '09:30 AM', source: 'Reuters', headline: 'Tech CEO steps down amidst ongoing regulatory scrutiny.' },
              ].map((news, i) => (
                <div key={i} className="flex gap-4 border-l-2 border-border-main pl-4">
                  <div className="w-16 flex-shrink-0">
                    <p className="text-[10px] font-bold text-text-muted">{news.time}</p>
                    <p className="text-[10px] font-bold text-primary">{news.source}</p>
                  </div>
                  <p className="text-sm text-secondary font-medium leading-relaxed">{news.headline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Middle Grid: Drafting & Fact-Checking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-border-main pt-12">
         
         {/* 6. Article Drafting Editor Preview */}
        <div className="lg:col-span-2">
           <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif text-secondary">Active Draft</h3>
            <button onClick={onOpenProject} className="text-[10px] font-bold text-primary uppercase tracking-widest border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors">Open Full Editor</button>
          </div>
          <div className="border border-border-main rounded-xl overflow-hidden bg-white">
            <div className="bg-background-alt border-b border-border-main p-3 flex items-center gap-4 text-text-muted text-sm">
              <button onClick={() => triggerAction('Format: Bold', 'Text formatting applied to selection.', 'info')} className="hover:text-secondary font-bold">B</button>
              <button onClick={() => triggerAction('Format: Italic', 'Text formatting applied to selection.', 'info')} className="hover:text-secondary italic">I</button>
              <button onClick={() => triggerAction('Format: Underline', 'Text formatting applied to selection.', 'info')} className="hover:text-secondary underline">U</button>
              <span className="w-px h-4 bg-border-main"></span>
              <button onClick={() => triggerAction('Format: H1', 'Heading 1 style applied.', 'info')} className="hover:text-secondary text-xs font-bold transition-colors">H1</button>
              <button onClick={() => triggerAction('Format: H2', 'Heading 2 style applied.', 'info')} className="hover:text-secondary text-xs font-bold transition-colors">H2</button>
              <span className="w-px h-4 bg-border-main"></span>
              <button onClick={() => triggerAction('Word Count', 'Detailed analytics for this draft are being calculated.', 'ai')} className="text-xs text-primary font-bold ml-auto hover:underline">1,240 Words</button>
            </div>
            <div className="p-8 pb-16">
              <h1 className="text-3xl font-serif font-bold text-secondary mb-6">The Future of AI in Modern Newsrooms</h1>
              <p className="text-text-secondary leading-relaxed mb-4">
                As artificial intelligence continues its rapid evolution, news organizations globally are grappling with the implications of automated journalism. The technology promises unprecedented efficiency in aggregating data and drafting routine reports.
              </p>
              <p className="text-text-secondary leading-relaxed">
                However, critics argue that the nuances of investigative journalism and the ethical imperatives of human oversight cannot be easily replicated by silicon and algorithms. The balance between speed and factual integrity remains the central debate... <span className="animate-pulse text-primary font-bold">|</span>
              </p>
            </div>
          </div>
        </div>

        {/* Module 7: Fact Checker */}
        <div>
           <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif text-secondary">Fact Checker</h3>
            <span className="text-xs font-bold text-status-warning">3 Pending Verification</span>
          </div>
          <div className="space-y-4">
            {[
              { claim: 'AI adoption in newsrooms increased by 40% in 2023.', supportingSource: 'Pew Research Context', status: 'Verifying' },
              { claim: 'The cyber-attack affected 14 major logistics hubs.', supportingSource: 'AFP feed cross-ref', status: 'Verified' },
              { claim: 'Company X profit margins doubled.', supportingSource: 'Anonymous Tip', status: 'Disputed' }
            ].map((fact, i) => (
              <div key={i} className="p-4 border border-border-main hover:border-text-muted transition-colors rounded-xl bg-white">
                <p className="text-sm font-medium text-secondary mb-3">"{fact.claim}"</p>
                
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-[10px] font-bold text-text-muted">SOURCE:</span>
                   <span className="text-xs text-secondary">{fact.supportingSource}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border-main">
                   <div className="flex gap-2">
                      <button 
                        onClick={() => triggerAction('Citation Added', 'Verified source linked to this claim.', 'success')}
                        className="text-[10px] font-bold text-text-muted hover:text-primary uppercase tracking-widest transition-colors"
                      >
                        Add Citation
                      </button>
                      <button 
                         onClick={() => triggerAction('Claim Flagged', 'Our fact-checking team has been notified of this dispute.', 'warning')}
                        className="text-[10px] font-bold text-text-muted hover:text-status-error uppercase tracking-widest transition-colors"
                      >
                        Flag Claim
                      </button>
                   </div>
                   <span className={cn(
                     "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                     fact.status === 'Verified' ? "bg-status-success/10 text-status-success" : 
                     fact.status === 'Disputed' ? "bg-status-error/10 text-status-error" : "bg-status-warning/10 text-status-warning"
                   )}>
                     {fact.status}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Intelligence (Headline & Source Cred) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-border-main pt-12 pb-12">
        
        {/* 4. Headline Generator */}
        <div>
          <h3 className="text-xl font-serif text-secondary mb-2">Headline Generator</h3>
          <p className="text-sm text-text-secondary mb-6">Generate SEO-optimized headlines based on your current draft.</p>
          
          <div className="flex gap-2 mb-6">
            <input 
               type="text" 
               placeholder="Topic focus: AI in journalism ethics..." 
               className="flex-1 border border-border-main rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
               defaultValue="AI in journalism ethics"
            />
            <button 
              onClick={() => triggerAction('Generation Started', 'Kortex AI is analyzing your draft for optimal headlines...', 'ai')}
              className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
            >
              Generate
            </button>
          </div>
          
          <div className="space-y-3">
             {[
               { score: 92, text: 'Beyond the Algorithm: The Ethical Dilemma of AI in Modern Newsrooms' },
               { score: 88, text: 'Are Robots the New Reporters? How AI is Reshaping Journalism' },
               { score: 85, text: 'The Truth Machine: Balancing Speed and Accuracy with AI Journalism' },
             ].map((headline, i) => (
               <div key={i} className="flex items-center gap-4 p-3 border border-border-main rounded-xl hover:bg-background-alt transition-colors group cursor-pointer">
                 <div className="w-10 h-10 rounded-lg bg-ai/10 flex items-center justify-center flex-col shrink-0">
                    <span className="text-xs font-bold text-ai">{headline.score}</span>
                    <span className="text-[8px] font-bold text-ai uppercase">SEO</span>
                 </div>
                 <p className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">{headline.text}</p>
                 <button 
                   onClick={(e) => {
                     e.stopPropagation();
                     triggerAction('Headline Copied', 'Headline copied to clipboard.', 'success');
                   }}
                   className="ml-auto opacity-0 group-hover:opacity-100 text-[10px] font-bold text-text-muted hover:text-secondary uppercase tracking-widest transition-all"
                 >
                   Copy
                 </button>
               </div>
             ))}
          </div>
        </div>

        {/* Module 9: Source Credibility Tracker */}
        <div>
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-xl font-serif text-secondary">Source Credibility Tracker</h3>
             <button 
               onClick={() => triggerAction('New Source', 'Source added to tracker. AI will now verify credibility metrics.', 'ai')}
               className="text-[10px] font-bold text-primary uppercase tracking-widest hover:text-secondary transition-colors"
             >
               + Add Source
             </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               { name: 'Reuters', score: 98, type: 'Wire', bias: 'Center', citations: 142, bookmarked: true },
               { name: 'TechLeaks', score: 34, type: 'Blog', bias: 'Sensationalist', citations: 3, bookmarked: false },
               { name: 'Gov Data Portal', score: 99, type: 'Official', bias: 'Neutral', citations: 89, bookmarked: true },
               { name: 'Dr. Jane Smith', score: 85, type: 'Expert', bias: 'Center-Left', citations: 12, bookmarked: false },
             ].map((source, i) => (
               <div key={i} className="p-4 border border-border-main rounded-xl hover:shadow-sm transition-all bg-white relative group">
                 <button className="absolute top-4 right-4 text-text-muted hover:text-primary transition-colors">
                    {source.bookmarked ? <Star size={16} fill="currentColor" /> : <Star size={16} />}
                 </button>
                 <div className="mb-3">
                   <h4 className="font-bold text-secondary text-sm pr-6">{source.name}</h4>
                   <p className="text-[10px] text-text-muted mt-0.5">{source.citations} lifetime citations</p>
                 </div>
                 
                 <div className="space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-xs text-text-secondary">Trust Score</span>
                       <span className={cn(
                         "text-sm font-bold",
                         source.score > 90 ? "text-status-success" : 
                         source.score > 70 ? "text-primary" : "text-status-error"
                       )}>{source.score}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                       <span className="text-xs text-text-secondary">Bias Indicator</span>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-[#9AB8D4]">{source.bias}</span>
                    </div>
                 </div>
               </div>
             ))}
          </div>
        </div>

      </div>

    </div>
  );
};
