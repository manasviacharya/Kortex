import React, { useState } from 'react';
import { 
  TrendingUp, BarChart2, Target, Network, Layers, RefreshCw, ChevronRight, Activity, Percent, ArrowUpRight, ArrowDownRight, Flag, Briefcase,
  Layout, List, CheckCircle2
} from 'lucide-react';
import type { Profession, Role, WorkspaceType } from '../../types';
import { cn } from '../../utils/cn';
import { useAction } from '../../context/ActionContext';

interface ConsultingDashboardProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
  setWorkspaceType: (type: WorkspaceType) => void;
  onOpenProject: () => void;
}

export const ConsultingDashboard: React.FC<ConsultingDashboardProps> = ({ 
  profession,
  role, 
  orgName,
  workspaceType,
  setWorkspaceType,
  onOpenProject
}) => {
  const [activeFramework, setActiveFramework] = useState<'SWOT' | 'Porters' | 'PESTLE'>('SWOT');
  const [consultingPipeline, setConsultingPipeline] = useState([
    { name: 'Discovery', status: 'completed' },
    { name: 'Analysis', status: 'completed' },
    { name: 'Strategic Plan', status: 'active' },
    { name: 'Review', status: 'pending' },
    { name: 'Presentation', status: 'pending' }
  ]);
  const [taskViewMode, setTaskViewMode] = useState<'compact' | 'list'>('compact');
  const { triggerAction } = useAction();

  const toggleStepStatus = (idx: number) => {
    setConsultingPipeline(prev => prev.map((step, i) => {
      if (i === idx) {
        let newStatus = 'completed';
        if (step.status === 'completed') newStatus = 'active';
        else if (step.status === 'active') newStatus = 'pending';
        else newStatus = 'completed';
        
        triggerAction('Pipeline Updated', `Project step "${step.name}" is now ${newStatus}.`, 'success');
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
          <h1 className="text-4xl font-serif font-bold text-secondary mb-2 tracking-tight">Strategy Intelligence Hub</h1>
          <p className="text-text-secondary">Welcome back. The {workspaceType === 'individual' ? 'Personal' : orgName} strategy firm is active.</p>
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

      {/* Hero Pipeline Widget with Dual View */}
      <div className="py-6 border-y border-border-main flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif text-secondary flex items-center gap-2">
            <Briefcase size={20} className="text-primary"/> Project Pipeline
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
            <button onClick={onOpenProject} className="text-[10px] bg-primary text-white hover:bg-primary/90 px-3 py-1.5 rounded-lg font-bold uppercase tracking-widest transition-colors shadow-sm">+ New Project</button>
          </div>
        </div>

        {taskViewMode === 'compact' ? (
          <div className="flex items-center gap-4 text-sm font-bold tracking-wide overflow-x-auto pb-2 scrollbar-none">
            {consultingPipeline.map((step, idx) => (
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
                {idx < consultingPipeline.length - 1 && <span className="text-text-muted font-normal text-xs shrink-0">→</span>}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-border-main divide-y divide-border-main overflow-hidden shadow-sm">
            {consultingPipeline.map((step, idx) => (
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

      {/* 1. Market Trend Analyzer */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <Activity size={20} className="text-primary" /> Market Trend Analyzer
          </h2>
          <button 
            onClick={() => triggerAction('Market Signals', 'Opening exhaustive database of industry trends, competitor signals, and macro themes.', 'info')}
            className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
          >
            View All Signals
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-5 border border-border-main bg-white hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-3 text-text-secondary">
               <TrendingUp size={16} className="text-status-success" />
               <span className="text-xs font-bold uppercase tracking-widest">Emerging Trend</span>
            </div>
            <p className="text-sm font-bold text-text-primary mb-1">Generative AI in Supply Chain</p>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">Adoption rates up 34% YoY across top-tier logistics firms. Focus on predictive route optimization.</p>
             <div className="flex items-center justify-between text-[10px] pt-3 border-t border-border-main">
                <span className="font-medium text-status-success flex items-center gap-1"><ArrowUpRight size={12}/> High Impact</span>
                <button 
                  onClick={() => triggerAction('Trend Analysis', 'Deep-diving into Generative AI adoption patterns and logistic ROI impact.', 'ai')}
                  className="bg-background-alt hover:bg-white border border-border-main px-2 py-1 rounded"
                >
                  Analyze
                </button>
             </div>
          </div>

          <div className="card p-5 border border-border-main bg-white hover:border-status-warning/30 transition-colors">
             <div className="flex items-center gap-3 mb-3 text-text-secondary">
               <Flag size={16} className="text-status-warning" />
               <span className="text-xs font-bold uppercase tracking-widest">Target Competitor</span>
            </div>
            <p className="text-sm font-bold text-text-primary mb-1">Quantum Logistics Inc.</p>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">Recently acquired two last-mile delivery startups in APAC region. Potential margin threats to Client B.</p>
             <div className="flex items-center justify-between text-[10px] pt-3 border-t border-border-main">
                <span className="font-medium text-status-warning flex items-center gap-1"><RefreshCw size={12}/> Monitoring</span>
                <button 
                  onClick={() => triggerAction('Competitor Intelligence', 'Retrieving latest financial filings and M&A history for Quantum Logistics.', 'info')}
                  className="bg-background-alt hover:bg-white border border-border-main px-2 py-1 rounded"
                >
                  Analyze
                </button>
             </div>
          </div>

          <div className="card p-5 border border-border-main bg-white hover:border-status-error/30 transition-colors">
            <div className="flex items-center gap-3 mb-3 text-text-secondary">
               <Percent size={16} className="text-status-error" />
               <span className="text-xs font-bold uppercase tracking-widest">Market Disruption</span>
            </div>
            <p className="text-sm font-bold text-text-primary mb-1">New Tariffs on Semiconductors</p>
            <p className="text-xs text-text-secondary leading-relaxed mb-4">Projected 15% increase in baseline manufacturing costs affecting the consumer electronics sector directly.</p>
             <div className="flex items-center justify-between text-[10px] pt-3 border-t border-border-main">
                <span className="font-medium text-status-error flex items-center gap-1"><ArrowDownRight size={12}/> Risk Warning</span>
                <button 
                  onClick={() => triggerAction('Scenario Modeling', 'Simulating manufacturing cost variations based on semiconductor tariff shifts.', 'success')}
                  className="bg-background-alt hover:bg-white border border-border-main px-2 py-1 rounded"
                >
                  Analyze
                </button>
             </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 2. Strategy Framework Builder */}
        <section className="card p-6 border-t-4 border-t-primary">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Layers size={20} className="text-primary" /> Strategy Framework Builder
            </h2>
          </div>
          <div className="flex gap-2 mb-6">
             {['SWOT', 'Porters', 'PESTLE'].map(fw => (
                <button 
                  key={fw}
                  onClick={() => setActiveFramework(fw as any)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors ${activeFramework === fw ? 'bg-primary text-white' : 'bg-background-alt text-text-secondary hover:bg-border-main'}`}
                >
                   {fw} {fw === 'Porters' ? "5 Forces" : ""}
                </button>
             ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             {activeFramework === 'SWOT' && (
                <>
                   <div className="p-4 bg-status-success/5 border border-status-success/20 rounded-xl relative group">
                      <p className="text-[10px] font-bold text-status-success uppercase tracking-widest mb-2">Strengths</p>
                      <ul className="text-xs text-text-secondary space-y-1 list-disc pl-4 marker:text-status-success">
                         <li>High brand equity</li>
                         <li>Robust proprietary tech</li>
                      </ul>
                       <button 
                        onClick={() => triggerAction('Strength Analysis', 'Expanding SWOT: Strengths into competitive advantage report.', 'info')}
                        className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 text-status-success"
                      >
                        <BarChart2 size={12}/>
                      </button>
                   </div>
                   <div className="p-4 bg-status-error/5 border border-status-error/20 rounded-xl relative group">
                      <p className="text-[10px] font-bold text-status-error uppercase tracking-widest mb-2">Weaknesses</p>
                      <ul className="text-xs text-text-secondary space-y-1 list-disc pl-4 marker:text-status-error">
                         <li>High operational costs</li>
                         <li>Slow R&D cycles</li>
                      </ul>
                       <button 
                        onClick={() => triggerAction('Weakness Analysis', 'Generating mitigation strategies for identified weaknesses.', 'ai')}
                        className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 text-status-error"
                      >
                        <BarChart2 size={12}/>
                      </button>
                   </div>
                   <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl relative group">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Opportunities</p>
                      <ul className="text-xs text-text-secondary space-y-1 list-disc pl-4 marker:text-primary">
                         <li>M&A in Eastern Europe</li>
                         <li>New AI product lines</li>
                      </ul>
                       <button 
                        onClick={() => triggerAction('Opportunity Analysis', 'Analyzing market potential and M&A targets.', 'success')}
                        className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 text-primary"
                      >
                        <BarChart2 size={12}/>
                      </button>
                   </div>
                   <div className="p-4 bg-status-warning/5 border border-status-warning/20 rounded-xl relative group">
                      <p className="text-[10px] font-bold text-status-warning uppercase tracking-widest mb-2">Threats</p>
                      <ul className="text-xs text-text-secondary space-y-1 list-disc pl-4 marker:text-status-warning">
                         <li>Legislative barriers</li>
                         <li>Commoditization</li>
                      </ul>
                       <button 
                        onClick={() => triggerAction('Threat Analysis', 'Simulating risk exposure from legislative and market commoditization.', 'info')}
                        className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 text-status-warning"
                      >
                        <BarChart2 size={12}/>
                      </button>
                   </div>
                </>
             )}
             {activeFramework !== 'SWOT' && (
               <div className="col-span-2 py-12 flex flex-col items-center justify-center text-center border border-dashed border-border-main rounded-xl bg-background-alt/30">
                  <Target size={24} className="text-text-muted mb-3" />
                  <p className="text-sm font-bold text-text-secondary mb-1">Select Canvas Layout</p>
                  <p className="text-xs text-text-muted">Click to generate AI pre-filled data mapping.</p>
               </div>
             )}
          </div>
           <button 
            onClick={() => triggerAction('Export Visual', 'Generating PDF/PPTX strategy deck with localized branding.', 'info')}
            className="w-full mt-6 py-2 border border-border-main rounded-lg text-xs font-bold text-text-secondary hover:bg-background-alt transition-colors"
          >
            Export Visualization
          </button>
        </section>

        <div className="space-y-8">
           {/* 3. Problem Breakdown Tool */}
           <section className="card p-6 border-t-4 border-t-secondary">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                 <Network size={20} className="text-secondary" /> Problem Structuring
               </h2>
                <button 
                  onClick={() => triggerAction('Add Node', 'Inserting new issue node into the strategy map.', 'info')}
                  className="text-[10px] bg-secondary text-white px-3 py-1 rounded font-bold uppercase tracking-widest"
                >
                  + New Node
                </button>
             </div>
             
             <div className="bg-background-alt rounded-xl p-4 relative overflow-hidden">
                <div className="absolute left-[39px] top-6 bottom-4 w-px bg-border-main"></div>
                <div className="space-y-4 relative z-10">
                   {/* Root */}
                   <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded bg-secondary text-white flex items-center justify-center shrink-0 shadow-sm mt-1">1</div>
                      <div className="flex-1 bg-white p-3 rounded-lg border border-border-main">
                         <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Core Issue</p>
                         <p className="text-xs text-text-secondary">Q3 Profit margins declined by 12% despite revenue growth.</p>
                      </div>
                   </div>
                   {/* Hypothesis */}
                   <div className="flex items-start gap-4 ml-8">
                      <div className="w-6 h-6 rounded bg-white border-2 border-primary text-primary flex items-center justify-center shrink-0 z-10 mt-1">H</div>
                      <div className="flex-1 bg-primary/5 p-3 rounded-lg border border-primary/20 relative group">
                         <div className="absolute -left-[30px] top-4 w-[30px] h-px bg-border-main"></div>
                         <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Hypothesis A</p>
                         <p className="text-xs text-text-secondary">Logistics costs have disproportionately increased handling the new product line.</p>
                      </div>
                   </div>
                   {/* Evidence */}
                   <div className="flex items-start gap-4 ml-16">
                      <div className="w-6 h-6 rounded bg-background-alt border border-border-main text-text-muted flex items-center justify-center shrink-0 z-10 mt-1"><BarChart2 size={12}/></div>
                      <div className="flex-1 bg-white p-3 rounded-lg border border-border-main relative group">
                         <div className="absolute -left-[30px] top-4 w-[30px] h-px bg-border-main"></div>
                         <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Data Evidence</p>
                         <p className="text-xs text-text-secondary">Shipping anomalies report (Oct-Nov) shows avg cost/unit +$2.15.</p>
                      </div>
                   </div>
                </div>
             </div>
           </section>

           {/* 4. Scenario Simulation Tool */}
           <section className="card p-6">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                 <RefreshCw size={20} className="text-text-primary" /> Scenario Simulation
               </h2>
                <button 
                  onClick={() => triggerAction('Run Simulations', 'Initiating Monte Carlo simulations for APAC expansion vs. Consolidation.', 'success')}
                  className="text-[10px] bg-background-alt text-text-secondary px-3 py-1 border border-border-main rounded font-bold uppercase tracking-widest"
                >
                  Run Models
                </button>
             </div>
             
             <div className="space-y-3">
               {[
                 { scenario: 'Aggressive Expansion (APAC)', roi: '+24%', risk: 'High', prob: '45%' },
                 { scenario: 'Defensive Consolidation', roi: '+8%', risk: 'Low', prob: '80%' },
                 { scenario: 'Status Quo Projection', roi: '-2%', risk: 'Medium', prob: '95%' }
                ].map((sim, i) => (
                   <div 
                    key={i} 
                    onClick={() => triggerAction('Scenario Result', `Viewing detailed financial breakdown for "${sim.scenario}".`, 'info')}
                    className="flex items-center justify-between p-3 border border-border-main rounded-lg hover:bg-background-alt transition-colors cursor-pointer group"
                  >
                     <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${sim.risk === 'High' ? 'bg-status-error' : sim.risk === 'Medium' ? 'bg-status-warning' : 'bg-status-success'}`}></div>
                        <p className="text-sm font-bold text-text-primary">{sim.scenario}</p>
                     </div>
                     <div className="flex items-center gap-4 text-xs">
                        <span className="text-text-muted">Prob: {sim.prob}</span>
                        <span className="font-bold text-text-primary">{sim.roi} ROI</span>
                        <ChevronRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                     </div>
                  </div>
               ))}
             </div>
           </section>
        </div>
      </div>
    </div>
  );
};
