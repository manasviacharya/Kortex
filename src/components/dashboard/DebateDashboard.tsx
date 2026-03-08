import React, { useState } from 'react';
import { type Role, type WorkspaceType } from '../../types';
import { 
  Globe, Map as MapIcon, Shield, 
  ChevronRight, AlertTriangle, Play, CheckCircle2, GitBranch, Mic, Clock,
  Layout, List
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

export const DebateDashboard: React.FC<WorkspaceViewProps> = ({ orgName, workspaceType, setWorkspaceType, onOpenProject }) => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'map' | 'speech' | 'toolkit'>('monitor');
  const [taskViewMode, setTaskViewMode] = useState<'compact' | 'list'>('compact');
  const [sessionSteps, setSessionSteps] = useState([
    { name: 'Position Paper Due', time: 'In 4 hours', status: 'active' },
    { name: 'Opening Statement Draft', time: 'Completed', status: 'completed' },
    { name: 'Committee Strategy', time: 'Pending', status: 'pending' },
    { name: 'Resolution Drafting', time: 'Day 2 of Conf', status: 'pending' }
  ]);
  const { triggerAction } = useAction();

  const toggleStepStatus = (idx: number) => {
    setSessionSteps(prev => prev.map((step, i) => {
      if (i === idx) {
        let newStatus = 'completed';
        if (step.status === 'completed') newStatus = 'active';
        else if (step.status === 'active') newStatus = 'pending';
        else newStatus = 'completed';
        
        triggerAction('Step Updated', `Session milestone "${step.name}" is now ${newStatus}.`, 'success');
        return { ...step, status: newStatus };
      }
      return step;
    }));
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'monitor':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                 <Globe size={16} className="text-secondary" /> Global Issue Monitor
               </h3>
               <div className="flex gap-2">
                 <select className="bg-white border border-border-main text-xs px-2 py-1 rounded focus:outline-none"><option>Topic: All</option><option>Security</option><option>Climate</option></select>
                 <select className="bg-white border border-border-main text-xs px-2 py-1 rounded focus:outline-none"><option>Region: All</option><option>Middle East</option><option>Europe</option></select>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { title: 'Cybersecurity Treaties Drafted', region: 'Global', type: 'Policy', level: 'High' },
                 { title: 'Climate Emission Caps Dispute', region: 'Europe', type: 'Conflict', level: 'Critical' },
                 { title: 'Trade Tariff Escalation', region: 'APAC', type: 'Economy', level: 'Medium' },
                 { title: 'Refugee Relocation Funding', region: 'Middle East', type: 'Human Rights', level: 'High' }
               ].map((issue, i) => (
                 <div
                    key={i}
                    onClick={() => triggerAction('View Issue Details', `Opening details for "${issue.title}".`, 'info')}
                    className="flex flex-col p-3 border border-border-main rounded-lg hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                       <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                          issue.level === 'Critical' ? 'bg-status-error/10 text-status-error' :
                          issue.level === 'High' ? 'bg-status-warning/10 text-status-warning' :
                          'bg-background-alt text-text-secondary'
                       )}>
                          {issue.level} Priority
                       </span>
                       <span className="text-[10px] text-text-muted">{issue.region}</span>
                    </div>
                    <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{issue.title}</h4>
                    <p className="text-[10px] text-text-secondary mt-1">Classification: {issue.type}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); triggerAction('Monitor Settings', 'Configuring real-time news filters and geopolitical alert thresholds.', 'info'); }}
                      className="text-xs font-bold text-primary hover:text-primary/80 transition-colors mt-2 self-start"
                    >
                      Custom Alerts
                    </button>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'map':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                 <MapIcon size={16} className="text-secondary" /> Argument Map
               </h3>
               <button
                 onClick={() => triggerAction('Export Argument Map', 'Exporting current argument visualization as PDF.', 'info')}
                 className="text-[10px] bg-primary text-white px-3 py-1.5 rounded uppercase tracking-widest font-bold">Export Vis</button>
            </div>

            <div className="p-6 bg-white border border-border-main rounded-xl min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
               {/* Pure CSS Node Visualization for Argument Mapping */}
               <div className="w-64 p-4 bg-primary/10 border border-primary/30 rounded-lg text-center z-10 relative">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Core Stance</p>
                  <p className="text-xs font-bold text-secondary">Abolish Veto Power in Security Council</p>
                  <button
                    onClick={() => triggerAction('Configure Argument', 'Launching full-screen interactive argument map builder.', 'info')}
                    className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest mt-2"
                  >
                    Configure
                  </button>
               </div>

               <div className="h-12 w-px bg-border-main my-2 z-0"></div>

               <div className="flex gap-16 relative z-10 w-full justify-center">
                  <div className="absolute top-6 left-1/2 w-80 h-px bg-border-main -translate-x-1/2 -z-10"></div>

                  <div
                    onClick={() => triggerAction('Expand Argument', 'Launching full-screen interactive argument map builder.', 'info')}
                    className="w-56 p-4 bg-status-success/10 border border-status-success/30 rounded-lg relative group cursor-pointer"
                  >
                     <p className="text-[10px] text-status-success font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><Shield size={10}/> Pro Argument</p>
                     <p className="text-xs font-bold text-text-primary mb-2">Promotes Democratic Equality</p>
                     <div className="bg-white p-2 rounded text-[10px] text-text-secondary border border-border-main">
                       <span className="font-bold">Evidence:</span> Assembly Resolution 76/262 (Veto Initiative).
                     </div>
                     <button
                        onClick={(e) => { e.stopPropagation(); triggerAction('Analyze Logic', 'AI Scan: Checking for logical fallacies and evidentiary gaps.', 'ai'); }}
                        className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 text-primary"
                      >
                        <GitBranch size={12}/>
                      </button>
                  </div>

                  <div
                    onClick={() => triggerAction('Expand Argument', 'Launching full-screen interactive argument map builder.', 'info')}
                    className="w-56 p-4 bg-status-error/10 border border-status-error/30 rounded-lg relative group cursor-pointer"
                  >
                     <p className="text-[10px] text-status-error font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><AlertTriangle size={10}/> Counterargument</p>
                     <p className="text-xs font-bold text-text-primary mb-2">Risks Major Power Walkouts</p>
                     <div className="bg-white p-2 rounded text-[10px] text-text-secondary border border-border-main">
                       <span className="font-bold">Rebuttal:</span> Institutional lock-in prevents actual walkouts; historic precedent shows compliance.
                     </div>
                     <button
                        onClick={(e) => { e.stopPropagation(); triggerAction('Analyze Logic', 'AI Scan: Checking for logical fallacies and evidentiary gaps.', 'ai'); }}
                        className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 text-primary"
                      >
                        <GitBranch size={12}/>
                      </button>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'speech':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                 <Mic size={16} className="text-secondary" /> Speech Builder
               </h3>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-text-secondary bg-background-alt px-3 py-1.5 rounded">
                    <Clock size={14} className="text-primary"/> <span className="text-primary">02:30</span> / 03:00 Target
                  </div>
                  <button
                    onClick={() => triggerAction('New Speech', 'Initializing speech draft with AI-assisted structure and rhetoric.', 'success')}
                    className="text-[10px] bg-secondary text-white px-3 py-1 rounded font-bold uppercase tracking-widest"
                  >
                    + Draft New
                  </button>
                  <button
                    onClick={() => triggerAction('Launch Teleprompter', 'Activating teleprompter for current speech draft.', 'info')}
                    className="text-[10px] bg-secondary text-white px-3 py-1.5 rounded uppercase tracking-widest font-bold flex items-center gap-1"><Play size={10}/> Teleprompter</button>
               </div>
            </div>

            <div className="flex gap-6 h-[400px]">
               <div className="w-1/3 space-y-3 overflow-y-auto pr-2">
                  {['Intro & Hook', 'Core Stance', 'Supporting Evidence 1', 'Supporting Evidence 2', 'Rebuttal Pre-emption', 'Conclusion & Call to Action'].map((block, i) => (
                     <div
                        key={i}
                        onClick={() => triggerAction('Edit Speech Block', `Editing speech block: "${block}".`, 'info')}
                        className={cn("p-3 border rounded-lg cursor-pointer transition-colors", i === 1 ? 'bg-primary/5 border-primary text-secondary' : 'bg-white border-border-main text-text-secondary hover:border-primary/40')}>
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-bold">{block}</span>
                           <span className="text-[10px]">{i === 1 ? '0:45' : '---'}</span>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="flex-1 bg-white border border-border-main rounded-xl p-6 relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                     <span
                       onClick={() => triggerAction('Apply Tone', 'Applying "Persuasive" tone to speech block.', 'info')}
                       className="bg-background-alt px-2 py-1 rounded text-[10px] font-bold text-text-muted uppercase tracking-widest cursor-pointer hover:text-secondary">Persuasive</span>
                     <span
                       onClick={() => triggerAction('Apply Tone', 'Applying "Diplomatic" tone to speech block.', 'info')}
                       className="bg-background-alt px-2 py-1 rounded text-[10px] font-bold text-text-muted uppercase tracking-widest cursor-pointer hover:text-secondary">Diplomatic</span>
                  </div>
                  <h4 className="text-sm font-bold text-secondary mb-4 border-b border-border-main pb-2 w-3/4">Block: Core Stance</h4>
                  <textarea
                    className="w-full h-4/5 resize-none bg-transparent focus:outline-none text-text-primary leading-relaxed"
                    defaultValue={`Honorable Chair, distinguished delegates, \n\nThe delegation of [Country] firmly believes that the current distribution of global resources is not merely inefficient, but fundamentally unjust. We stand before you to advocate for a complete restructuring of the distribution framework.\n\nOur position is grounded in three undeniable realities of the modern global economy...`}
                  />
                  <button
                    onClick={() => triggerAction('Generate Rebuttal', 'AI Generation: Preparing counter-arguments based on current policy landscape.', 'ai')}
                    className="w-full mt-6 py-2 bg-ai-gradient text-white rounded-lg text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
                  >
                    Generate AI Rebuttals
                  </button>
               </div>
            </div>
          </div>
        );
      case 'toolkit':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
                 <Shield size={16} className="text-secondary" /> Debate Preparation Toolkit
               </h3>
               <button
                 onClick={() => triggerAction('Download Cheat Sheet', 'Downloading talking points and rebuttal sheet.', 'info')}
                 className="text-[10px] bg-white border border-border-main px-3 py-1.5 rounded uppercase tracking-widest font-bold text-text-secondary hover:text-primary transition-colors">Download Sheet</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div
                 onClick={() => triggerAction('Edit Talking Points', 'Opening editor for talking points cheat sheet.', 'info')}
                 className="card p-6 border-l-4 border-l-primary pt-6 cursor-pointer hover:shadow-md transition-shadow">
                 <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Talking Points Cheat Sheet</h4>
                 <ul className="space-y-3">
                    <li className="text-sm text-text-primary pb-2 border-b border-border-main">1. Reiterate commitment to UN Charter Article 2(4).</li>
                    <li className="text-sm text-text-primary pb-2 border-b border-border-main">2. Emphasize the economic burden placed on developing nations by the proposed carbon tax.</li>
                    <li className="text-sm text-text-primary pb-2 border-b border-border-main">3. Pivot to technology transfer as the primary solution over financial penalties.</li>
                 </ul>
               </div>

               <div
                 onClick={() => triggerAction('Edit Rebuttals', 'Opening editor for anticipated questions and rebuttals.', 'info')}
                 className="card p-6 border-l-4 border-l-status-error pt-6 cursor-pointer hover:shadow-md transition-shadow">
                 <h4 className="text-xs font-bold text-status-error uppercase tracking-widest mb-4">Anticipated Questions & Rebuttals</h4>
                 <div className="space-y-4">
                    <div className="bg-status-error/5 p-3 rounded">
                       <p className="text-xs font-bold text-status-error mb-1">Q: How does the delegation justify the recent increase in industrial emissions?</p>
                       <p className="text-[10px] text-text-secondary"><span className="font-bold text-text-primary">Rebuttal:</span> Point out that per-capita emissions remain historically low compared to developed nations; frame it as necessary infrastructure scaling for poverty eradication.</p>
                    </div>
                    <div className="bg-status-error/5 p-3 rounded">
                       <p className="text-xs font-bold text-status-error mb-1">Q: Will you commit to the binding targets proposed by the EU bloc?</p>
                       <p className="text-[10px] text-text-secondary"><span className="font-bold text-text-primary">Rebuttal:</span> Reject binding targets that do not account for historical emission responsibilities (differentiated responsibilities doctrine).</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header matching other dashboards */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">Debate Operations</h1>
          <p className="text-text-secondary">Model UN and policy workspace for {orgName}.</p>
        </div>
        <div className="flex items-center gap-2 bg-background-alt p-1 rounded-xl border border-border-main">
          {['Team', 'Individual'].map((type) => (
            <button
              key={type}
              onClick={() => { setWorkspaceType(type.toLowerCase() as WorkspaceType); triggerAction('Change Workspace Type', `Switched to ${type} workspace.`, 'info'); }}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                workspaceType === type.toLowerCase()
                  ? "bg-white text-secondary shadow-sm"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </header>

      {/* Hero Pipeline Widget */}
      <div className="card p-8 bg-gradient-to-br from-secondary/5 to-white border-none shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-md">
             <div className="flex items-center gap-2 mb-3">
               <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                 <Shield size={16} />
               </span>
               <span className="text-sm font-bold text-secondary uppercase tracking-widest">Active Committee Session</span>
             </div>
             <h2 className="text-3xl font-black text-text-primary mb-2">UN Security Council</h2>
             <p className="text-sm text-text-secondary leading-relaxed">
               Topic: Addressing autonomous weaponry proliferation.<br/>
               Role: Active Delegate
             </p>
             <button
               onClick={() => { onOpenProject(); triggerAction('Open Position Paper', 'Opening the position paper for editing.', 'success'); }}
               className="mt-6 px-6 py-2.5 bg-secondary text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-secondary/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2"
             >
               Open Position Paper <ChevronRight size={16} />
             </button>
           </div>

           <div className="flex-1 w-full bg-white p-6 rounded-2xl border border-border-main shadow-sm flex flex-col h-[320px]">
             <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14} /> Session Timeline
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex p-0.5 bg-background-alt rounded border border-border-main">
                    <button 
                      onClick={() => setTaskViewMode('compact')}
                      className={cn(
                        "p-1 rounded transition-all",
                        taskViewMode === 'compact' ? "bg-white text-secondary shadow-sm" : "text-text-muted hover:text-text-secondary"
                      )}
                    >
                      <Layout size={10} />
                    </button>
                    <button 
                      onClick={() => setTaskViewMode('list')}
                      className={cn(
                        "p-1 rounded transition-all",
                        taskViewMode === 'list' ? "bg-white text-secondary shadow-sm" : "text-text-muted hover:text-text-secondary"
                      )}
                    >
                      <List size={10} />
                    </button>
                  </div>
                  <span className="text-[9px] bg-status-warning/10 text-status-warning font-bold px-2 py-1 rounded">2 Days Until Conf</span>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto">
              {taskViewMode === 'compact' ? (
                <div className="space-y-4">
                  {sessionSteps.map((step, i) => (
                    <div 
                      key={step.name} 
                      onClick={() => toggleStepStatus(i)}
                      className="flex items-start gap-3 group cursor-pointer"
                    >
                       <div className="flex flex-col items-center">
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 z-10",
                            step.status === 'completed' ? "bg-status-success border-status-success text-white" : 
                            step.status === 'active' ? "border-secondary bg-secondary/5 text-secondary" : "bg-white border-border-main"
                          )}>
                             {step.status === 'completed' ? <CheckCircle2 size={10} /> : <div className={cn("w-1.5 h-1.5 rounded-full", step.status === 'active' ? "bg-secondary animate-pulse" : "bg-transparent")} />}
                          </div>
                          {i < sessionSteps.length - 1 && <div className="w-0.5 h-6 bg-border-main group-hover:bg-secondary/20 transition-colors"></div>}
                       </div>
                       <div className="flex-1">
                          <p className={cn(
                            "text-xs font-bold transition-colors",
                            step.status === 'completed' ? "text-text-muted line-through" : "text-text-primary group-hover:text-secondary"
                          )}>{step.name}</p>
                          <p className="text-[10px] text-text-secondary">{step.time}</p>
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-background-alt/30 rounded-lg border border-border-main divide-y divide-border-main overflow-hidden">
                  {sessionSteps.map((step, i) => (
                    <div 
                      key={step.name}
                      onClick={() => toggleStepStatus(i)}
                      className={cn(
                        "flex items-center justify-between p-2.5 bg-white hover:bg-background-alt/50 transition-colors cursor-pointer group",
                        step.status === 'completed' && "opacity-60"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={cn(
                          "w-3.5 h-3.5 rounded border flex items-center justify-center transition-all",
                          step.status === 'completed' ? "bg-status-success border-status-success text-white" : "border-text-muted group-hover:border-secondary"
                        )}>
                          {step.status === 'completed' && <CheckCircle2 size={10} />}
                        </div>
                        <span className={cn(
                          "text-[11px] font-bold",
                          step.status === 'completed' ? "text-text-muted line-through" : "text-text-primary"
                        )}>
                          {step.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded",
                          step.status === 'completed' ? "bg-status-success/10 text-status-success" : 
                          step.status === 'active' ? "bg-secondary/10 text-secondary" : "bg-background-alt text-text-muted"
                        )}>
                          {step.status}
                        </span>
                        <span className="text-[9px] text-text-muted font-bold w-12 text-right">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
             </div>
           </div>
        </div>
      </div>

      {/* Debate Specialized Modules */}
      <div className="card p-0 overflow-hidden bg-white shadow-sm border border-border-main">
        {/* Navigation Tabs */}
        <div className="flex border-b border-border-main overflow-x-auto scrollbar-hide">
          {[
            { id: 'monitor', label: 'Global Issue Monitor', icon: <Globe size={16}/> },
            { id: 'map', label: 'Argument Map', icon: <MapIcon size={16}/> },
            { id: 'speech', label: 'Speech Builder', icon: <Mic size={16}/> },
            { id: 'toolkit', label: 'Debate Prep Toolkit', icon: <Shield size={16}/> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-6 py-4 flex items-center gap-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap",
                activeTab === tab.id 
                  ? "border-secondary text-secondary bg-secondary/5" 
                  : "border-transparent text-text-muted hover:text-text-primary hover:bg-background-alt"
              )}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="p-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};
