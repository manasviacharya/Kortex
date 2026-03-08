import React, { useState } from 'react';
import { type Role, type WorkspaceType } from '../../types';
import { 
  Users, GitBranch, LayoutTemplate, 
  Clock, Target, CheckCircle2,
  Layout, List, ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAction } from '../../context/ActionContext';

interface WorkspaceViewProps {
  profession: string;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
  setWorkspaceType: (type: WorkspaceType) => void;
}

export const WriterDashboard: React.FC<WorkspaceViewProps> = ({ role, orgName, workspaceType, setWorkspaceType }) => {
  const [taskViewMode, setTaskViewMode] = useState<'compact' | 'list'>('compact');
  const [characters, setCharacters] = useState([
    { name: 'Elias Thorne', role: 'Protagonist', arc: 'Redemption', motivation: 'Atonement for past failures.', status: 'active' },
    { name: 'Kaelen', role: 'Antagonist', arc: 'Corruption', motivation: 'Absolute control of the weave.', status: 'active' },
    { name: 'Lyra', role: 'Ally', arc: 'Coming of Age', motivation: 'Discovery of hidden lineage.', status: 'active' }
  ]);
  const { triggerAction } = useAction();

  const toggleCharacterStatus = (idx: number) => {
    setCharacters(prev => prev.map((char, i) => {
      if (i === idx) {
        const newStatus = char.status === 'completed' ? 'active' : 'completed';
        triggerAction('Character Status Updated', `${char.name} status is now ${newStatus}.`, 'success');
        return { ...char, status: newStatus };
      }
      return char;
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mb-1 tracking-tight">
            Author Workspace
          </h1>
          <p className="text-text-secondary">
            Writing overview for {orgName}. Role: {role}.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 bg-background-alt p-1 rounded-xl border border-border-main mr-2">
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
           <button 
              onClick={() => triggerAction('Writer Settings', 'Configuring your personal Author Workspace and manuscript templates.', 'info')}
              className="px-4 py-2 bg-white border border-border-main rounded-xl text-sm font-medium hover:bg-background-alt transition-colors"
            >
              Settings
            </button>
           <button 
              onClick={() => triggerAction('New Manuscript', 'Initializing a new manuscript with AI-powered plot assistance.', 'success')}
              className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              New Manuscript
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Module 3: Character Builder with Dual View */}
        <div className="md:col-span-8 card p-0 flex flex-col border-2 border-border-main overflow-hidden">
           <div className="p-5 border-b border-border-main bg-background-alt/30 flex justify-between items-center">
             <div>
                <h2 className="text-lg font-bold text-secondary flex items-center gap-2">
                   <Users size={20} className="text-primary" /> Character Builder
                </h2>
                <p className="text-xs text-text-muted mt-1">Manage profiles, traits, and story arcs.</p>
             </div>
             <div className="flex items-center gap-2">
                <div className="flex p-1 bg-white rounded-lg border border-border-main shadow-sm">
                  <button 
                    onClick={() => setTaskViewMode('compact')}
                    className={cn(
                      "p-1 rounded transition-all",
                      taskViewMode === 'compact' ? "bg-primary/10 text-primary" : "text-text-muted hover:text-text-secondary"
                    )}
                  >
                    <Layout size={12} />
                  </button>
                  <button 
                    onClick={() => setTaskViewMode('list')}
                    className={cn(
                      "p-1 rounded transition-all",
                      taskViewMode === 'list' ? "bg-primary/10 text-primary" : "text-text-muted hover:text-text-secondary"
                    )}
                  >
                    <List size={12} />
                  </button>
                </div>
                <button 
                  onClick={() => triggerAction('Add Character', 'Launching character creation wizard for new cast members.', 'info')}
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm"
                >
                  +
                </button>
             </div>
           </div>

           <div className="p-5 bg-white flex-1">
              {taskViewMode === 'compact' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {characters.map((char, idx) => (
                    <div 
                        key={char.name} 
                        onClick={() => toggleCharacterStatus(idx)}
                        className={cn(
                          "p-4 border border-border-main rounded-xl transition-all cursor-pointer group flex flex-col",
                          char.status === 'completed' ? "bg-background-alt/20 opacity-60" : "hover:border-primary/40 bg-white"
                        )}
                      >
                        <div className="flex justify-between items-start mb-2">
                           <h3 className={cn(
                             "font-bold transition-colors",
                             char.status === 'completed' ? "text-text-muted line-through" : "text-text-primary group-hover:text-primary"
                           )}>{char.name}</h3>
                           <span className="text-[9px] bg-background-alt text-text-secondary px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">{char.role}</span>
                        </div>
                        <p className="text-[11px] text-text-muted mb-3 flex-1">"{char.motivation}"</p>
                        <div className="flex items-center gap-2 text-[10px] text-secondary font-bold tracking-widest uppercase border-t border-border-main pt-2">
                           {char.status === 'completed' ? <CheckCircle2 size={12} className="text-status-success" /> : <Target size={12} />} 
                           {char.arc}
                        </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-background-alt/30 rounded-xl border border-border-main divide-y divide-border-main overflow-hidden">
                  {characters.map((char, idx) => (
                    <div 
                      key={char.name}
                      onClick={() => toggleCharacterStatus(idx)}
                      className={cn(
                        "flex items-center justify-between p-3 bg-white hover:bg-background-alt/50 transition-colors cursor-pointer group",
                        char.status === 'completed' && "opacity-60"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                          char.status === 'completed' ? "bg-status-success border-status-success text-white" : "border-text-muted group-hover:border-primary"
                        )}>
                          {char.status === 'completed' && <CheckCircle2 size={10} />}
                        </div>
                        <div>
                          <span className={cn(
                            "text-xs font-bold block",
                            char.status === 'completed' ? "text-text-muted line-through" : "text-text-primary"
                          )}>
                            {char.name}
                          </span>
                          <span className="text-[9px] text-text-muted uppercase tracking-widest">{char.role} • {char.arc}</span>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-text-muted group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                    </div>
                  ))}
                </div>
              )}
           </div>
        </div>

      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        
        {/* Module 2: Plot Structure Builder */}
        <div className="card p-6 border border-border-main bg-white hover:border-secondary/30 transition-colors">
           <div className="flex items-center justify-between mb-6">
             <div>
                <h2 className="text-lg font-bold text-secondary flex items-center gap-2">
                   <LayoutTemplate size={20} className="text-secondary" /> Plot Structure Builder
                </h2>
                <p className="text-xs text-text-muted mt-1">Currently using: Three-Act Structure</p>
             </div>
              <button 
                onClick={() => triggerAction('Framework Change', 'Analyzing your draft to recommend alternative plot architectures (Hero\'s Journey, Save the Cat, etc.).', 'ai')}
                className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
              >
                Change Framework
              </button>
           </div>

           <div className="space-y-4 relative">
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-background-alt -z-10"></div>
              {[
                { act: 'Act I: Setup', title: 'The Inciting Incident', stat: 'Ch 1-5', color: 'border-status-warning', bg: 'bg-status-warning' },
                { act: 'Act II: Confrontation', title: 'Crossing the Threshold', stat: 'Ch 6-15', color: 'border-primary', bg: 'bg-primary' },
                { act: 'Act III: Resolution', title: 'The Climax', stat: 'Ch 16-24', color: 'border-secondary', bg: 'bg-secondary' }
              ].map((plot, i) => (
                 <div 
                    key={i} 
                    onClick={() => triggerAction('Plot Action', `Focusing on ${plot.act} beats and scene transitions.`, 'info')}
                    className="flex gap-4 group cursor-pointer"
                  >
                    <div className={`w-7 h-7 rounded-full border-4 border-white ${plot.bg} shrink-0 shadow-sm transition-transform group-hover:scale-110`}></div>
                    <div className={`flex-1 p-3 bg-white border border-border-main rounded-xl border-l-4 ${plot.color} hover:shadow-md transition-shadow`}>
                       <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1 block">{plot.act}</span>
                       <div className="flex justify-between items-center">
                          <p className="text-sm font-bold text-text-primary">{plot.title}</p>
                          <span className="text-[10px] bg-background-alt px-1.5 py-0.5 rounded text-text-secondary">{plot.stat}</span>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Module 7: Story Timeline Builder */}
        <div className="card p-6 border border-border-main bg-white hover:border-primary/30 transition-colors">
           <div className="flex items-center justify-between mb-6">
             <div>
                <h2 className="text-lg font-bold text-secondary flex items-center gap-2">
                   <GitBranch size={20} className="text-primary" /> Timeline Builder
                </h2>
                <p className="text-xs text-text-muted mt-1">Chronological scene ordering & character arcs.</p>
             </div>
              <button 
                onClick={() => triggerAction('Add Event', 'Inserting a new chronological event or scene anchor into the timeline.', 'info')}
                className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                +
              </button>
           </div>

           <div className="space-y-3 overflow-y-auto pr-2 max-h-[300px]">
              {[
                { time: 'Day 1 - Morning', event: 'Elias wakes up in the ruins.', chars: ['Elias Thorne'], conflict: 'Survival' },
                { time: 'Day 1 - Evening', event: 'The first encounter with Kaelen\'s scouts.', chars: ['Elias Thorne', 'Kaelen'], conflict: 'Combat' },
                { time: 'Day 3 - Noon', event: 'Discovery of the artifact in the Sunken City.', chars: ['Lyra', 'Elias'], conflict: 'Mystery' }
              ].map((timeline, i) => (
                 <div 
                    key={i} 
                    onClick={() => triggerAction('Timeline Scene', `Opening scene details for "${timeline.event}" with conflict analysis.`, 'info')}
                    className="flex flex-col p-3 border border-border-main rounded-xl hover:border-secondary/30 transition-all bg-background-alt/20 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-2">
                       <Clock size={12} className="text-text-muted" />
                       <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">{timeline.time}</span>
                    </div>
                    <p className="text-sm font-medium text-text-primary mb-3 leading-tight">{timeline.event}</p>
                    <div className="flex justify-between items-center mt-auto">
                       <div className="flex -space-x-2">
                          {timeline.chars.map((c, i) => (
                             <div key={i} className="w-6 h-6 rounded-full bg-secondary/20 border-2 border-white flex items-center justify-center text-[8px] font-bold text-secondary" title={c}>{c.charAt(0)}</div>
                           ))}
                       </div>
                       <span className="text-[10px] bg-status-warning/10 text-status-warning px-2 rounded-full font-bold">{timeline.conflict}</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};
