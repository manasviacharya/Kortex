import React, { useState } from 'react';
import { type Role, type WorkspaceType } from '../../types';
import { 
  Network, TrendingUp, Calendar, Zap, Maximize2, GitMerge, CheckCircle2,
  Presentation, Layout, List
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAction } from '../../context/ActionContext';

interface WorkspaceViewProps {
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
  setWorkspaceType: (type: WorkspaceType) => void;
  onOpenProject: () => void;
}

export const AcademicDashboard: React.FC<WorkspaceViewProps> = ({ 
  role, orgName, workspaceType, setWorkspaceType, onOpenProject 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { triggerAction } = useAction();
  const [milestones, setMilestones] = useState([
    { phase: 'Literature Review', date: 'Oct 15', status: 'completed', desc: 'Analyzed 42 peer-reviewed papers.' },
    { phase: 'Data Collection', date: 'Nov 01', status: 'active', desc: 'Conducting final survey batch.' },
    { phase: 'Draft Outline', date: 'Nov 20', status: 'pending', desc: 'Synthesize findings into draft.' },
    { phase: 'Peer Review', date: 'Dec 10', status: 'pending', desc: 'Internal lab review before sub.' }
  ]);
  const [taskViewMode, setTaskViewMode] = useState<'compact' | 'list'>('compact');

  const toggleMilestone = (idx: number) => {
    setMilestones(prev => prev.map((m, i) => {
      if (i === idx) {
        let newStatus = 'completed';
        if (m.status === 'completed') newStatus = 'active';
        else if (m.status === 'active') newStatus = 'pending';
        else newStatus = 'completed';
        
        triggerAction('Milestone Updated', `Phase "${m.phase}" is now ${newStatus}.`, 'success');
        return { ...m, status: newStatus };
      }
      return m;
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">Academic Research Hub</h1>
            <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase">Lab Alpha</span>
          </div>
          <p className="text-text-secondary">
            {workspaceType === 'individual' ? 'Personal' : orgName} research intelligence, collaboration, and timeline for {role}s.
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-background-alt p-1 rounded-xl border border-border-main">
          <button
            onClick={() => setWorkspaceType('individual')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              workspaceType === 'individual' ? "bg-white text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
            )}
          >
            My Research
          </button>
          <button
            onClick={() => setWorkspaceType('team')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              workspaceType === 'team' ? "bg-white text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
            )}
          >
            Lab Workspace
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border-main">
        {['overview', 'timeline', 'datasets', 'graph'].map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={cn(
               "pb-3 text-sm font-bold capitalize transition-colors border-b-2 relative top-[1px]",
               activeTab === tab ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text-secondary"
             )}
           >
             {tab}
           </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Top Metrics row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Module 5: Research Impact Predictor */}
            <div 
              onClick={() => triggerAction('Impact Analysis', 'Running predictive modeling for research impact and field relevance.', 'ai')}
              className="card p-6 border-l-4 border-l-primary flex flex-col justify-between hover:border-border-main hover:border-l-primary group cursor-pointer transition-all"
            >
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-bold text-secondary flex items-center gap-2">
                   <TrendingUp size={16} className="text-primary" /> Impact Predictor
                 </h3>
                 <span className="text-[10px] bg-status-success/10 text-status-success px-2 py-0.5 rounded uppercase tracking-widest font-bold">High Novelty</span>
               </div>
               <div>
                  <div className="flex items-baseline gap-2 mb-2">
                     <span className="text-3xl font-black text-text-primary tracking-tight">8.4</span>
                     <span className="text-xs text-text-secondary">Expected Impact Factor</span>
                  </div>
                  <div className="w-full bg-background-alt h-1.5 rounded-full overflow-hidden mb-3">
                     <div className="bg-primary h-full w-[84%] rounded-full"></div>
                  </div>
                  <p className="text-[10px] text-text-muted">Top 12% relevance within cognitive psychology field.</p>
               </div>
            </div>

            {/* Module 4: Methodology Advisor */}
            <div 
              onClick={() => triggerAction('Methodology Advice', 'Generating AI suggestions for study design and data collection methods.', 'ai')}
              className="card p-6 flex flex-col justify-between group cursor-pointer hover:border-primary/50 transition-colors"
            >
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-bold text-secondary flex items-center gap-2">
                   <Zap size={16} className="text-secondary" /> Methodology Advisor
                 </h3>
                 <span className="bg-background-alt p-1 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors"><Maximize2 size={12} /></span>
               </div>
               <div>
                  <p className="text-xs font-bold text-text-primary mb-2">Current Approach: <span className="text-secondary font-normal">Mixed-Methods Survey</span></p>
                  <div className="space-y-2 mb-3">
                     <div className="flex items-center gap-2 text-[10px] text-text-secondary bg-background-alt px-2 py-1.5 rounded line-through opacity-70">
                        <CheckCircle2 size={12} className="text-status-success" /> Standard Likert Scale
                     </div>
                     <div className="flex items-center gap-2 text-[10px] font-medium text-primary bg-primary/5 px-2 py-1.5 rounded border border-primary/20">
                        <Zap size={12} /> Consider Longitudinal Latent Growth Curves
                     </div>
                  </div>
                  <p className="text-[10px] text-text-muted italic">Recommendation improves citation potential by +1.2</p>
               </div>
            </div>

            <div 
              onClick={() => triggerAction('Study Metrics', 'Opening detailed data logs and subject recruitment analytics.', 'info')}
              className="card p-6 flex flex-col justify-between cursor-pointer group hover:border-primary/50 transition-colors bg-ai-gradient/5"
            >
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-bold text-secondary flex items-center gap-2">
                   <GitMerge size={16} className="text-secondary" /> Active Study Metrics
                 </h3>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Data Phase</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <p className="text-2xl font-black text-primary mb-1">142</p>
                     <p className="text-[10px] text-text-secondary">Subjects Recruited</p>
                  </div>
                  <div>
                     <p className="text-2xl font-black text-secondary mb-1">2.4<span className="text-sm font-medium">TB</span></p>
                     <p className="text-[10px] text-text-secondary">Raw Data Collected</p>
                  </div>
                  <div>
                     <p className="text-2xl font-black text-status-success mb-1">68</p>
                     <p className="text-[10px] text-text-secondary">Citations Mapped</p>
                  </div>
               </div>
            </div>
            
            {/* NEW MODULE: Upcoming Conferences */}
            <div 
              onClick={() => triggerAction('Conference Discovery', 'Analyzing call for papers and matching conferences for your current draft.', 'info')}
              className="md:col-span-3 card p-6 border-l-4 border-l-secondary flex flex-col hover:border-border-main hover:border-l-secondary group cursor-pointer transition-all bg-gradient-to-br from-white to-secondary/5"
            >
                <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                   <Presentation size={16} className="text-secondary" /> Upcoming Conferences
                 </h3>
                 <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded tracking-widest font-bold">Suggested</span>
               </div>
               <div className="space-y-4">
                  {[
                    { name: 'Cognitive Science Annual', date: 'Mar 15-18', loc: 'Boston, MA', match: '98%', highlight: true },
                    { name: 'Intl. Neuroplasticity Symposium', date: 'Apr 02-05', loc: 'London, UK', match: '85%' },
                    { name: 'Sleep Research Society (SRS)', date: 'May 10-14', loc: 'Virtual', match: '81%' }
                  ].map((conf, i) => (
                    <div key={i} className="flex justify-between items-center group/item hover:bg-white p-2 -mx-2 rounded transition-colors">
                       <div>
                          <p className={cn("text-xs font-bold leading-tight mb-0.5", conf.highlight ? "text-primary" : "text-text-primary group-hover/item:text-secondary")}>{conf.name}</p>
                          <div className="flex items-center gap-2 text-[9px] text-text-muted font-bold tracking-widest uppercase">
                             <span>{conf.date}</span> • <span>{conf.loc}</span>
                          </div>
                       </div>
                       <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", conf.highlight ? "bg-status-success/10 text-status-success" : "bg-background-alt text-text-secondary")}>
                          {conf.match}
                       </span>
                    </div>
                  ))}
               </div>
               <button 
                onClick={(e) => { e.stopPropagation(); triggerAction('Abstract Submission', 'Redirecting to central abstract portal for selected conferences.', 'info'); }}
                className="text-[10px] font-bold text-secondary uppercase tracking-widest mt-4 hover:underline self-start"
              >
                Submit Abstracts ➜
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
            {/* Module 3: Citation Network Explorer */}
            <div className="md:col-span-8 card p-0 overflow-hidden flex flex-col">
               <div className="p-5 border-b border-border-main flex items-center justify-between bg-background-alt/30">
                  <h3 className="text-sm font-bold text-secondary flex items-center gap-2">
                     <Network size={16} /> Citation Network Explorer
                  </h3>
                  <div className="flex gap-2">
                     <button 
                      onClick={() => triggerAction('Graph Filter', 'Filtering citation network nodes by significance and publication date.', 'info')}
                      className="text-[10px] font-bold px-3 py-1 bg-white border border-border-main rounded hover:bg-background-alt"
                    >
                      Filter Nodes
                    </button>
                     <button 
                      onClick={() => triggerAction('Expand Graph', 'Launching full-screen immersive citation netwok explorer.', 'info')}
                      className="text-[10px] font-bold px-3 py-1 bg-primary text-white rounded hover:opacity-90"
                    >
                      Expand Map
                    </button>
                  </div>
               </div>
               <div className="flex-1 bg-white p-6 relative min-h-[300px] flex items-center justify-center">
                  {/* Visual mockup of a node graph relying on pure CSS layout to match pastel aesthetics */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#fafafa_100%)]"></div>
                  
                  {/* Central Node */}
                  <div onClick={onOpenProject} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/10 border-4 border-white shadow-lg flex items-center justify-center flex-col z-10 hover:scale-105 transition-transform cursor-pointer">
                     <span className="text-xs font-bold text-primary text-center leading-tight">Current<br/>Draft</span>
                  </div>

                  {/* Connecting lines & Nodes */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-border-main opacity-50" style={{ strokeWidth: 2 }}>
                     <line x1="50%" y1="50%" x2="25%" y2="25%" />
                     <line x1="50%" y1="50%" x2="75%" y2="30%" />
                     <line x1="50%" y1="50%" x2="30%" y2="70%" />
                     <line x1="50%" y1="50%" x2="80%" y2="65%" />
                     <line x1="75%" y1="30%" x2="85%" y2="15%" />
                  </svg>

                  {/* Satellite Nodes */}
                  {[
                     { top: '25%', left: '25%', title: 'Smith et al.', year: '2021', type: 'Core' },
                     { top: '30%', left: '75%', title: 'Johnson Review', year: '2019', type: 'Method' },
                     { top: '70%', left: '30%', title: 'Wu Theory', year: '2023', type: 'Contrasting' },
                     { top: '65%', left: '80%', title: 'Davis Lab', year: '2020', type: 'Data' },
                     { top: '15%', left: '85%', title: 'Origin Paper', year: '1998', type: 'Root' },
                  ].map((node, i) => (
                     <div 
                      key={i} 
                      onClick={(e) => { e.stopPropagation(); triggerAction('Node Discovery', `Retrieving full-text and metadata for "${node.title}".`, 'info'); }}
                      className="absolute w-20 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer group" 
                      style={{ top: node.top, left: node.left }}
                    >
                        <div className={cn(
                           "w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-1 text-[9px] font-bold border-2 border-white shadow-sm",
                           node.type === 'Core' ? 'bg-status-success/20 text-status-success' :
                           node.type === 'Contrasting' ? 'bg-status-error/20 text-status-error' :
                           node.type === 'Method' ? 'bg-secondary/20 text-secondary' : 'bg-background-alt text-text-secondary'
                        )}>
                           {node.year}
                        </div>
                        <div className="bg-white px-2 py-1 rounded shadow-sm border border-border-main text-[9px] text-center font-bold text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity absolute top-full left-1/2 -translate-x-1/2 mt-1 z-20">
                           {node.title}<br/><span className="text-text-muted font-normal">{node.type}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Module 6: Research Timeline Builder / Milestones with Dual View */}
            <div className="md:col-span-4 card p-0 flex flex-col h-full overflow-hidden">
               <div className="p-5 border-b border-border-main flex items-center justify-between bg-background-alt/30">
                  <h3 className="text-sm font-bold text-secondary flex items-center gap-2">
                     <Calendar size={16} /> Milestones
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex p-1 bg-white rounded-lg border border-border-main">
                      <button 
                        onClick={() => setTaskViewMode('compact')}
                        className={cn(
                          "p-1 rounded transition-all",
                          taskViewMode === 'compact' ? "bg-primary/10 text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                        )}
                      >
                        <Layout size={12} />
                      </button>
                      <button 
                        onClick={() => setTaskViewMode('list')}
                        className={cn(
                          "p-1 rounded transition-all",
                          taskViewMode === 'list' ? "bg-primary/10 text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                        )}
                      >
                        <List size={12} />
                      </button>
                    </div>
                    <button 
                      onClick={() => triggerAction('Timeline Maximize', 'Entering focused research roadmap and grant timeline editor.', 'info')}
                      className="text-primary hover:text-primary/80"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>
               </div>
               
               <div className="p-6 flex-1 overflow-y-auto">
                {taskViewMode === 'compact' ? (
                  <div className="space-y-6">
                    {milestones.map((milestone, i) => (
                      <div 
                        key={i} 
                        onClick={() => toggleMilestone(i)}
                        className="flex gap-4 group cursor-pointer"
                      >
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 z-10 bg-white",
                            milestone.status === 'completed' ? "border-status-success bg-status-success text-white" : 
                            milestone.status === 'active' ? "border-primary bg-primary/10 text-primary" : "border-border-main text-text-muted"
                          )}>
                            {milestone.status === 'completed' ? <CheckCircle2 size={12} /> : <div className={cn("w-1.5 h-1.5 rounded-full", milestone.status === 'active' ? "bg-primary animate-pulse" : "bg-text-muted")} />}
                          </div>
                          {i < milestones.length - 1 && <div className="w-0.5 h-full bg-border-main group-hover:bg-primary/20 transition-colors my-1"></div>}
                        </div>
                        <div className="pb-4">
                           <div className="flex items-center gap-2 mb-1">
                              <h4 className={cn(
                                "text-sm font-bold transition-colors",
                                milestone.status === 'completed' ? "text-text-muted line-through" : "text-secondary group-hover:text-primary"
                              )}>{milestone.phase}</h4>
                              <span className="text-[10px] text-text-muted font-bold tracking-widest">{milestone.date}</span>
                           </div>
                           <p className="text-xs text-text-secondary leading-relaxed">{milestone.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-background-alt/30 rounded-xl overflow-hidden border border-border-main divide-y divide-border-main">
                    {milestones.map((milestone, i) => (
                      <div 
                        key={i}
                        onClick={() => toggleMilestone(i)}
                        className={cn(
                          "flex items-center justify-between p-2.5 bg-white hover:bg-background-alt/50 transition-colors cursor-pointer group",
                          milestone.status === 'completed' && "opacity-60 grayscale-[0.5]"
                        )}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden px-1">
                          <div className={cn(
                            "w-3.5 h-3.5 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                            milestone.status === 'completed' ? "bg-status-success border-status-success text-white" : "border-text-muted group-hover:border-primary"
                          )}>
                            {milestone.status === 'completed' && <CheckCircle2 size={10} />}
                          </div>
                          <span className={cn(
                            "text-[10px] truncate max-w-[140px]", 
                            milestone.status === 'completed' ? "text-text-muted line-through" : "text-secondary font-bold"
                          )}>
                            {milestone.phase}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 px-1 font-medium">
                          <span className={cn(
                            "text-[7px] font-bold uppercase tracking-widest px-1 py-0.5 rounded",
                            milestone.status === 'completed' ? "bg-status-success/10 text-status-success" : 
                            milestone.status === 'active' ? "bg-primary/10 text-primary" : "bg-background-alt text-text-muted"
                          )}>
                            {milestone.status}
                          </span>
                          <span className="text-[8px] text-text-muted font-bold w-8 text-right">{milestone.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
               </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
