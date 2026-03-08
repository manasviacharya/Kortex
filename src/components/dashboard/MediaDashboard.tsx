import React, { useState } from 'react';
import { 
  Lightbulb, TrendingUp, Users, Calendar, Megaphone, Video, MessageSquare, PlayCircle, Target, RefreshCw,
  Layout, List, CheckCircle2, ChevronRight
} from 'lucide-react';
import type { Profession, Role, WorkspaceType } from '../../types';
import { cn } from '../../utils/cn';
import { useAction } from '../../context/ActionContext';

interface MediaDashboardProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
  setWorkspaceType: (type: WorkspaceType) => void;
  onOpenProject: () => void;
}

export const MediaDashboard: React.FC<MediaDashboardProps> = ({ 
  profession,
  role, 
  orgName,
  workspaceType,
  setWorkspaceType,
  onOpenProject
}) => {
  const [activeCampaign, setActiveCampaign] = useState('summer_launch');
  const [mediaPipeline, setMediaPipeline] = useState([
    { name: 'Idea', status: 'completed' },
    { name: 'Draft', status: 'completed' },
    { name: 'Editing', status: 'completed' },
    { name: 'Design/Media', status: 'active' },
    { name: 'Review', status: 'pending' },
    { name: 'Publish', status: 'pending' }
  ]);
  const [taskViewMode, setTaskViewMode] = useState<'compact' | 'list'>('compact');
  const { triggerAction } = useAction();

  const toggleStepStatus = (idx: number) => {
    setMediaPipeline(prev => prev.map((step, i) => {
      if (i === idx) {
        let newStatus = 'completed';
        if (step.status === 'completed') newStatus = 'active';
        else if (step.status === 'active') newStatus = 'pending';
        else newStatus = 'completed';
        
        triggerAction('Pipeline Updated', `Production step "${step.name}" is now ${newStatus}.`, 'success');
        return { ...step, status: newStatus };
      }
      return step;
    }));
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">{profession} Workspace</span>
            <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest">{role} Access</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-secondary mb-2 tracking-tight">Content Studio Hub</h1>
          <p className="text-text-secondary">Welcome back. The {workspaceType === 'individual' ? 'Personal' : orgName} content engine is ready.</p>
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

      {/* Hero Content Pipeline Widget with Dual View */}
      <div className="py-6 border-y border-border-main flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif text-secondary flex items-center gap-2">
            <Video size={20} className="text-primary"/> Production Pipeline
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex p-1 bg-background-alt rounded-lg border border-border-main">
              <button 
                onClick={() => setTaskViewMode('compact')}
                className={cn(
                  "p-1 rounded transition-all",
                  taskViewMode === 'compact' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                )}
              >
                <Layout size={12} />
              </button>
              <button 
                onClick={() => setTaskViewMode('list')}
                className={cn(
                  "p-1 rounded transition-all",
                  taskViewMode === 'list' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                )}
              >
                <List size={12} />
              </button>
            </div>
            <button onClick={onOpenProject} className="text-[10px] bg-primary text-white hover:bg-primary/90 px-3 py-1.5 rounded-lg font-bold uppercase tracking-widest transition-colors shadow-sm">+ New Content</button>
          </div>
        </div>

        {taskViewMode === 'compact' ? (
          <div className="flex items-center gap-4 text-sm font-bold tracking-wide overflow-x-auto pb-2 scrollbar-none">
            {mediaPipeline.map((step, idx) => (
              <React.Fragment key={step.name}>
                <div 
                  onClick={() => toggleStepStatus(idx)}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    step.status === 'completed' ? "bg-status-success border-status-success text-white" : 
                    step.status === 'active' ? "border-primary text-primary" : "border-border-main text-text-muted"
                  )}>
                    {step.status === 'completed' ? <CheckCircle2 size={10} /> : <span className="text-[10px]">{idx + 1}</span>}
                  </div>
                  <span className={cn(
                    "transition-colors whitespace-nowrap",
                    step.status === 'active' ? "text-primary border-b-2 border-primary pb-0.5" : "text-text-secondary group-hover:text-secondary",
                    step.status === 'completed' && "line-through opacity-60"
                  )}>
                    {step.name}
                  </span>
                </div>
                {idx < mediaPipeline.length - 1 && <span className="text-text-muted font-normal text-xs shrink-0">→</span>}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-border-main divide-y divide-border-main overflow-hidden shadow-sm">
            {mediaPipeline.map((step, idx) => (
              <div 
                key={step.name}
                onClick={() => toggleStepStatus(idx)}
                className={cn(
                  "flex items-center justify-between p-3 hover:bg-background-alt/50 transition-colors cursor-pointer group",
                  step.status === 'completed' && "bg-background-alt/20"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                    step.status === 'completed' ? "bg-status-success border-status-success text-white" : "border-text-muted group-hover:border-primary"
                  )}>
                    {step.status === 'completed' && <CheckCircle2 size={10} />}
                  </div>
                  <span className={cn(
                    "text-xs font-bold",
                    step.status === 'completed' ? "text-text-muted line-through" : "text-secondary"
                  )}>
                    {step.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                    step.status === 'completed' ? "bg-status-success/10 text-status-success" : 
                    step.status === 'active' ? "bg-primary/10 text-primary animate-pulse" : "bg-background-alt text-text-muted"
                  )}>
                    {step.status}
                  </span>
                  <ChevronRight size={14} className="text-text-muted group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Content Idea Generator */}
        <section className="card p-6 border-t-4 border-t-secondary">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Lightbulb size={20} className="text-secondary" /> Idea Generator
            </h2>
             <button 
                onClick={() => triggerAction('AI Brainstorm', 'Generating content ideas based on your recent trending niches.', 'ai')}
                className="text-[10px] bg-secondary text-white px-3 py-1 rounded font-bold uppercase tracking-widest"
              >
                Brainstorm
              </button>
          </div>
          
          <div className="flex gap-2 mb-4">
             <input type="text" placeholder="Niche: Tech reviews, AI tutorials..." className="flex-1 bg-background-alt border border-border-main rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-secondary transition-colors" />
              <button 
                onClick={() => triggerAction('Refresh Trends', 'Scanning social APIs for new viral patterns.', 'info')}
                className="bg-background-main border border-border-main p-2 rounded-lg hover:bg-background-alt transition-colors"
              >
                <RefreshCw size={16} className="text-text-secondary" />
              </button>
          </div>

          <div className="space-y-3">
             {[
               { idea: 'The Truth About Next-Gen AI Assistants', type: 'Video', format: 'Long-form', interest: 'High' },
               { idea: '5 Must-Have Plugins for Creators in 2024', type: 'Blog', format: 'Listicle', interest: 'Med' },
               { idea: 'React vs Vue: 60 Second Showdown', type: 'Social', format: 'Shorts/Reels', interest: 'Viral Potential' }
             ].map((item, i) => (
                <div key={i} className="flex items-start justify-between p-4 bg-white border border-border-main rounded-xl hover:border-secondary/40 transition-colors group cursor-pointer">
                   <div>
                      <h4 className="font-bold text-sm text-text-primary mb-1 group-hover:text-secondary transition-colors">{item.idea}</h4>
                      <div className="flex gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                         <span>{item.type}</span> • <span>{item.format}</span>
                      </div>
                   </div>
                   <div className="flex flex-col items-end gap-2">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                        item.interest === 'High' || item.interest === 'Viral Potential' ? "bg-status-success/10 text-status-success" : "bg-status-warning/10 text-status-warning"
                      )}>
                         {item.interest}
                      </span>
                      <button className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-secondary hover:underline transition-opacity">Expand ➜</button>
                   </div>
                </div>
             ))}
          </div>
        </section>

        {/* 4. Trend Discovery Panel */}
        <section className="card p-6 border-t-4 border-t-primary">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" /> Trend Discovery
            </h2>
            <div className="flex gap-1">
               {['TikTok', 'YouTube', 'X'].map(p => (
                 <button key={p} className="text-[9px] font-bold uppercase tracking-widest bg-background-alt border border-border-main px-2 py-1 rounded text-text-secondary hover:bg-white">{p}</button>
               ))}
            </div>
          </div>

          <div className="space-y-4">
             {[
               { topic: '#AIFilters', vol: '1.2M posts', velocity: 'Rising fast', context: 'Users are testing the new V7 filters on old photos.' },
               { topic: 'Minimalist Desk Setups', vol: '840K views', velocity: 'Steady', context: 'Focusing on cable management and mechanical keyboards.' },
               { topic: 'Camera Gear Rumors', vol: '120K posts', velocity: 'Spiking', context: 'Upcoming announcement from major mirrorless manufacturer.' }
              ].map((trend, i) => (
                 <div 
                  key={i} 
                  onClick={() => triggerAction('Trend Drill-down', `Analyzing audience sentiment for "${trend.topic}" on social platforms.`, 'info')}
                  className="flex gap-4 p-3 hover:bg-background-alt rounded-lg transition-colors cursor-pointer border border-transparent hover:border-border-main"
                >
                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                      #{i + 1}
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                         <h4 className="font-bold text-sm text-text-primary">{trend.topic}</h4>
                         <span className="text-[10px] font-bold text-status-error uppercase tracking-widest">{trend.velocity}</span>
                      </div>
                      <p className="text-xs text-text-secondary mb-1">{trend.context}</p>
                      <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">{trend.vol}</p>
                   </div>
                </div>
             ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 9. Campaign Strategy Builder */}
        <section className="lg:col-span-2 card p-6 border border-border-main">
           <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Megaphone size={20} className="text-status-warning" /> Campaign Strategy
            </h2>
            <select 
              className="text-xs bg-white border border-border-main rounded px-2 py-1 font-bold text-text-primary focus:outline-none"
              value={activeCampaign}
              onChange={(e) => setActiveCampaign(e.target.value)}
            >
               <option value="summer_launch">Summer Product Launch '24</option>
               <option value="rebrand">Brand Guidelines Rollout</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
             <div className="p-4 bg-background-alt border border-border-main rounded-xl">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Campaign Goal</p>
                <p className="text-sm font-bold text-text-primary">Drive 50k App Installs</p>
             </div>
             <div className="p-4 bg-background-alt border border-border-main rounded-xl">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Target Persona</p>
                <p className="text-sm font-bold text-text-primary">Gen Z Creators</p>
             </div>
             <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl relative overflow-hidden group">
                <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-primary/10 -skew-x-12 translate-x-4"></div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 relative z-10">Budget utilization</p>
                <p className="text-lg font-bold text-primary relative z-10">64% / $45k</p>
             </div>
          </div>

          <div>
             <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-3 border-b border-border-main pb-2">Linked Content</h3>
             <div className="space-y-2">
                {[
                  { title: 'Promo Teaser Video - IG Reels', status: 'Published', views: '124K' },
                  { title: 'Feature Deep Dive - YouTube', status: 'In Review', views: '--' },
                  { title: 'Launch Day Tweet Thread', status: 'Drafting', views: '--' }
                ].map((content, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-white border border-border-main rounded-lg">
                      <div className="flex items-center gap-3">
                         <PlayCircle size={16} className="text-text-muted" />
                         <span className="text-sm font-medium text-text-primary">{content.title}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold">
                         <span className={cn(
                           "uppercase tracking-widest px-2 py-0.5 rounded text-[9px]",
                           content.status === 'Published' ? "bg-status-success/10 text-status-success" : 
                           content.status === 'In Review' ? "bg-status-warning/10 text-status-warning" : "bg-background-alt text-text-muted"
                         )}>{content.status}</span>
                         <span className="text-text-secondary w-12 text-right">{content.views}</span>
                      </div>
                   </div>
                ))}
                 <button 
                  onClick={() => triggerAction('Link Content', 'Opening content picker to associate existing assets with this campaign.', 'info')}
                  className="w-full py-2 mt-2 border-2 border-dashed border-border-main text-xs font-bold text-text-muted hover:text-primary hover:border-primary/50 transition-colors rounded-lg"
                >
                  + Link Existing Content
                </button>
             </div>
          </div>
        </section>

        {/* 5. Audience Insight Analyzer */}
        <section className="card p-6 bg-secondary/5 border border-secondary/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-secondary flex items-center gap-2">
              <Users size={20} /> Audience Insights
            </h2>
             <button 
              onClick={() => triggerAction('Full Insights', 'Generating comprehensive audience demographic and psychographic report.', 'ai')}
              className="text-[10px] text-secondary font-bold hover:underline"
            >
              Full Report
            </button>
          </div>

          <div className="space-y-6">
             <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Audience Demographics</p>
                <div className="flex flex-col gap-2 shadow-sm p-4 bg-white rounded-xl border border-border-main">
                   <div className="flex justify-between text-xs font-bold"><span className="text-text-secondary">18-24</span><span className="text-primary">45%</span></div>
                   <div className="w-full bg-background-alt h-1.5 rounded-full overflow-hidden"><div className="bg-primary h-full w-[45%]"></div></div>
                   
                   <div className="flex justify-between text-xs font-bold mt-2"><span className="text-text-secondary">25-34</span><span className="text-secondary">35%</span></div>
                   <div className="w-full bg-background-alt h-1.5 rounded-full overflow-hidden"><div className="bg-secondary h-full w-[35%]"></div></div>
                   
                   <div className="flex justify-between text-xs font-bold mt-2"><span className="text-text-secondary">35+</span><span className="text-status-warning">20%</span></div>
                   <div className="w-full bg-background-alt h-1.5 rounded-full overflow-hidden"><div className="bg-status-warning h-full w-[20%]"></div></div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white border border-border-main rounded-xl">
                   <Target size={14} className="text-status-success mb-2"/>
                   <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Peak Eng. Time</p>
                   <p className="text-sm font-bold text-text-primary">Thu, 4 PM EST</p>
                </div>
                <div className="p-3 bg-white border border-border-main rounded-xl">
                   <MessageSquare size={14} className="text-status-success mb-2"/>
                   <p className="text-[10px] font-bold text-text-muted uppercase mb-1">Sentiment</p>
                   <p className="text-sm font-bold text-text-primary">92% Positive</p>
                </div>
             </div>
          </div>
        </section>
      </div>

      {/* 2. Content Calendar Planner */}
      <section className="card p-6">
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Calendar size={20} className="text-primary" /> Content Timeline Planner
            </h2>
             <div className="flex gap-2">
                <button 
                  onClick={() => triggerAction('Timeline Filter', 'Switching content calendar to monthly overview.', 'info')}
                  className="text-[10px] bg-background-alt border border-border-main text-text-secondary px-3 py-1.5 rounded font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Month
                </button>
                <button 
                  onClick={() => triggerAction('Timeline Filter', 'Viewing content production for the current week.', 'info')}
                  className="text-[10px] bg-primary text-white border border-primary px-3 py-1.5 rounded font-bold uppercase tracking-widest shadow-sm"
                >
                  Week
                </button>
             </div>
          </div>

          <div className="relative pt-4">
             {/* Timeline track */}
             <div className="absolute top-[38px] left-0 right-0 h-0.5 bg-border-main z-0"></div>

             <div className="grid grid-cols-5 gap-4 relative z-10">
                {['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16'].map((day, i) => (
                   <div key={i} className="flex flex-col">
                      <div className="text-center mb-4">
                         <span className="px-3 py-1 bg-white border border-border-main rounded-full text-[10px] font-bold text-text-secondary uppercase tracking-widest shadow-sm">{day}</span>
                      </div>
                      
                      {/* Event Cards */}
                      <div className="space-y-3 pt-4">
                          {i === 1 && (
                             <div 
                              onClick={() => triggerAction('Edit Content', 'Opening detailed editor for Podcast Episode #45.', 'info')}
                              className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-primary text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                            >
                               <p className="font-bold mb-1 line-clamp-2">Podcast Episode #45: The Creator Economy</p>
                               <span className="text-[9px] uppercase tracking-widest font-bold px-1.5 bg-white/50 rounded">Spotify Layout</span>
                             </div>
                          )}
                         {i === 3 && (
                            <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary text-xs cursor-pointer hover:bg-secondary/20 transition-colors">
                               <p className="font-bold mb-1 line-clamp-2">Newsletter Issue 82 Drop</p>
                               <span className="text-[9px] uppercase tracking-widest font-bold px-1.5 bg-white/50 rounded">Substack</span>
                            </div>
                         )}
                                                {i === 4 && (
                             <div className="flex flex-col gap-3">
                                <div 
                                  onClick={() => triggerAction('Edit Content', 'Opening social media promo draft.', 'info')}
                                  className="p-3 bg-status-success/10 border border-status-success/20 rounded-lg text-status-success text-xs cursor-pointer hover:bg-status-success/20 transition-colors"
                                >
                                   <p className="font-bold mb-1 line-clamp-2">Promo Short - X & Shorts</p>
                                   <span className="text-[9px] uppercase tracking-widest font-bold px-1.5 bg-white/50 rounded">Social</span>
                                </div>
                                <button 
                                  onClick={() => triggerAction('Add Content', 'Scheduling a new content piece for Friday.', 'info')}
                                  className="h-12 border-2 border-dashed border-border-main rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors pb-1 text-lg font-light"
                                >
                                  +
                                </button>
                             </div>
                          )}
                          {i !== 1 && i !== 3 && i !== 4 && (
                             <button 
                              onClick={() => triggerAction('Add Content', `Scheduling a new content piece for ${day}.`, 'info')}
                              className="h-12 w-full border-2 border-dashed border-border-main rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-colors pb-1 text-lg font-light"
                            >
                              +
                            </button>
                          )}
                      </div>
                   </div>
                ))}
             </div>
          </div>
      </section>

    </div>
  );
};
