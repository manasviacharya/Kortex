import React, { useState } from 'react';
import { type Role, type WorkspaceType } from '../../types';
import { cn } from '../../utils/cn';
import { Scale, Clock, Link, AlertTriangle, Layout, List, CheckCircle2 } from 'lucide-react';
import { useAction } from '../../context/ActionContext';

interface LegalDashboardProps {
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
  setWorkspaceType: (type: WorkspaceType) => void;
  onOpenProject: () => void;
}

export const LegalDashboard: React.FC<LegalDashboardProps> = ({
  role,
  orgName,
  workspaceType,
  setWorkspaceType,
  onOpenProject,
}) => {
  const { triggerAction } = useAction();
  const [complianceChecks, setComplianceChecks] = useState([
    { rule: 'GDPR Article 17 (Right to Erasure)', status: 'Non-Compliant', severity: 'High', doc: 'Terms of Service Draft' },
    { rule: 'California CCPA Disclosures', status: 'Review Needed', severity: 'Medium', doc: 'Privacy Policy' },
    { rule: 'Federal SEC Filing Deadlines', status: 'Compliant', severity: 'Low', doc: 'Q3 Financials' }
  ]);
  const [taskViewMode, setTaskViewMode] = useState<'compact' | 'list'>('compact');

  const toggleComplianceStatus = (index: number) => {
    setComplianceChecks(prev => prev.map((c, i) => {
      if (i === index) {
        const nextStatus = c.status === 'Compliant' ? 'Review Needed' : 'Compliant';
        triggerAction('Compliance Update', `"${c.rule}" status changed to ${nextStatus}.`, nextStatus === 'Compliant' ? 'success' : 'info');
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };
  const [timeline, setTimeline] = useState([
    { date: 'Oct 14, 2024', event: 'Initial Complaint Filed', type: 'Filing', desc: 'Plaintiff alleges breach of contract regarding the software licensing agreement.' },
    { date: 'Nov 02, 2024', event: 'Discovery Request Submitted', type: 'Action', desc: 'Defense requested 5 years of internal communications.' },
    { date: 'Jan 15, 2025', event: 'Summary Judgment Hearing', type: 'Hearing', desc: 'Judge scheduled hearing for preliminary motions.', isFuture: true }
  ]);

  const runComplianceScan = () => {
    triggerAction('Compliance Scan', 'Initiating full-spectrum compliance audit...', 'success');
    setTimeout(() => {
      setComplianceChecks(prev => prev.map(c => c.status === 'Review Needed' ? { ...c, status: 'Compliant' } : c));
    }, 2000);
  };

  const addTimelineEvent = () => {
    const newEvent = {
       date: 'Feb 10, 2025',
       event: 'New Evidence Filed',
       type: 'Action',
       desc: 'Added a new piece of evidence to the case timeline.',
       isFuture: true
    };
    setTimeline(prev => [...prev.filter(e => !e.isFuture), newEvent, ...prev.filter(e => e.isFuture)]);
    triggerAction('Event Added', 'New event added to the case timeline.', 'success');
  };
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Dashboard Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">Legal Workspace</span>
            <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest">{role} Access</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-secondary mb-2 tracking-tight">Legal Operations Hub</h1>
          <p className="text-text-secondary">Welcome back. {workspaceType === 'individual' ? 'Your personal' : orgName + "'s"} legal intelligence core is active.</p>
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

      {/* Top Grid: Case Outcome Predictor & Compliance Checker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Module 3: Case Outcome Predictor */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif text-secondary flex items-center gap-2">
               <Scale size={20} className="text-primary" />
               Case Outcome Predictor
            </h3>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Current Active: State vs. TechCorp</span>
          </div>
          
          <div className="p-6 border border-border-main rounded-xl bg-white shadow-sm space-y-6">
             <div className="flex items-center justify-between">
                <div className="cursor-pointer" onClick={onOpenProject}>
                   <p className="text-3xl font-bold text-primary mb-1">78%</p>
                   <p className="text-xs text-text-secondary">Predicted Success Probability</p>
                </div>
                <div className="w-32 h-32 rounded-full border-8 border-background-alt relative flex items-center justify-center">
                   <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" className="text-primary" strokeDasharray="351.8" strokeDashoffset={351.8 * (1 - 0.78)} />
                   </svg>
                   <span className="text-xs font-bold text-secondary text-center">Likely<br/>Resolution</span>
                </div>
             </div>
             
             <div className="pt-4 border-t border-border-main">
                <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Key Judicial Reasoning Patterns</h4>
                <div className="space-y-2">
                   {['Precedent favors intellectual property retention (82% match)', 'Jurisdictional hurdles in 5th Circuit usually lead to dismissal (64% match)'].map((reason, i) => (
                     <div key={i} className="flex gap-3 text-sm text-text-secondary">
                        <span className="text-status-success font-bold shrink-0">✓</span>
                        <p>{reason}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Module 8: Compliance Checker with Dual View */}
        <div>
           <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif text-secondary flex items-center gap-2">
              <AlertTriangle size={20} className="text-status-warning" />
              Real-time Compliance Checks
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
                onClick={runComplianceScan}
                className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
              >
                Scan Docs
              </button>
            </div>
          </div>
          
          {taskViewMode === 'compact' ? (
            <div className="space-y-4">
               {complianceChecks.map((check, i) => (
                  <div 
                   key={i} 
                   onClick={() => toggleComplianceStatus(i)}
                   className={cn(
                     "p-4 bg-white border rounded-xl grid grid-cols-12 gap-4 items-center transition-all cursor-pointer",
                     check.status === 'Compliant' ? "bg-background-alt/30 border-transparent opacity-80" : "border-border-main hover:border-primary/50"
                   )}
                 >
                     <div className="col-span-1 flex justify-center">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          check.severity === 'High' ? "bg-status-error animate-pulse" : 
                          check.severity === 'Medium' ? "bg-status-warning" : "bg-status-success"
                        )}></div>
                     </div>
                     <div className="col-span-8 overflow-hidden">
                        <p className={cn(
                          "text-sm font-bold truncate",
                          check.status === 'Compliant' ? "text-text-muted line-through" : "text-secondary"
                        )}>{check.rule}</p>
                        <p className="text-xs text-text-muted mt-0.5 truncate">Source: {check.doc}</p>
                     </div>
                     <div className="col-span-3 text-right">
                        <span className={cn(
                          "text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded inline-block transition-colors",
                          check.status === 'Non-Compliant' ? "bg-status-error/10 text-status-error" : 
                          check.status === 'Review Needed' ? "bg-status-warning/10 text-status-warning" : "bg-status-success/10 text-status-success"
                        )}>
                           {check.status}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
          ) : (
            <div className="bg-background-alt/30 rounded-xl overflow-hidden border border-border-main divide-y divide-border-main">
              {complianceChecks.map((check, i) => (
                <div 
                  key={i}
                  onClick={() => toggleComplianceStatus(i)}
                  className={cn(
                    "flex items-center justify-between p-3 bg-white hover:bg-background-alt/50 transition-colors cursor-pointer group",
                    check.status === 'Compliant' && "opacity-60 grayscale-[0.5]"
                  )}
                >
                  <div className="flex items-center gap-3 overflow-hidden px-1">
                    <div className={cn(
                      "w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                      check.status === 'Compliant' ? "bg-status-success border-status-success text-white" : "border-text-muted group-hover:border-primary"
                    )}>
                      {check.status === 'Compliant' && <CheckCircle2 size={10} />}
                    </div>
                    <span className={cn(
                      "text-[11px] truncate max-w-[200px]", 
                      check.status === 'Compliant' ? "text-text-muted line-through" : "text-secondary font-bold"
                    )}>
                      {check.rule}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 px-2 font-medium">
                    <span className={cn(
                      "text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded",
                      check.status === 'Non-Compliant' ? "bg-status-error/10 text-status-error" : 
                      check.status === 'Review Needed' ? "bg-status-warning/10 text-status-warning" : "bg-status-success/10 text-status-success"
                    )}>
                      {check.status}
                    </span>
                    <span className={cn(
                      "text-[9px] w-12 text-center rounded px-1 py-0.5",
                      check.severity === 'High' ? "text-status-error border border-status-error/20" : 
                      check.severity === 'Medium' ? "text-status-warning border border-status-warning/20" : "text-status-success border border-status-success/20"
                    )}>
                      {check.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Middle Grid: Legal Timeline & Precedent Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-border-main pt-12">
         
         {/* Module 6: Legal Timeline Builder */}
        <div>
           <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif text-secondary flex items-center gap-2">
               <Clock size={20} className="text-primary" />
               Case Timeline Builder
            </h3>
            <div className="flex gap-2">
               <button 
                 onClick={() => triggerAction('Timeline Filter', 'Switching case timeline view to monthly aggregation.', 'info')}
                 className="px-2 py-1 bg-background-alt border border-border-main rounded text-xs text-text-secondary hover:bg-white"
               >
                 Month
               </button>
               <button 
                 onClick={() => triggerAction('Timeline View', 'Displaying case events in a detailed chronological list.', 'info')}
                 className="px-2 py-1 bg-white border border-border-main shadow-sm rounded text-xs text-secondary font-bold"
               >
                 List
               </button>
            </div>
          </div>
          
          <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border-main before:to-transparent">
             {timeline.map((event, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                   <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div className={cn("w-2 h-2 rounded-full", event.isFuture ? "bg-white/50" : "bg-white")}></div>
                   </div>
                   <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border-main bg-white hover:border-primary/30 transition-colors shadow-sm cursor-grab active:cursor-grabbing">
                      <div className="flex items-center justify-between mb-1">
                         <time className="text-xs font-bold text-primary uppercase tracking-widest">{event.date}</time>
                         <span className="text-[9px] bg-background-alt text-text-secondary px-1.5 py-0.5 rounded uppercase tracking-widest">{event.type}</span>
                      </div>
                      <h4 className="text-sm font-bold text-secondary mb-1">{event.event}</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">{event.desc}</p>
                   </div>
                </div>
             ))}
          </div>
          <button 
            onClick={addTimelineEvent}
            className="w-full mt-6 py-3 border-2 border-dashed border-border-main rounded-xl text-xs font-bold text-text-muted hover:text-primary hover:border-primary/30 transition-colors"
          >
            + Click to add event to timeline
          </button>
        </div>

        {/* Module 7: Precedent Explorer */}
        <div>
           <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif text-secondary flex items-center gap-2">
               <Link size={20} className="text-primary" />
               Precedent Discovery
            </h3>
            <span className="text-xs font-bold text-status-success">14 High-Match Rulings</span>
          </div>
          
          <div className="space-y-4">
            {[
              { case: 'Orem vs. DataTech (2019)', cite: '402 F.3d 112', match: 94, summary: 'Established that API scraping without explicit consent violates standard TOS.' },
              { case: 'State of CA vs. InnovateLLC (2021)', cite: 'Cal.App.4th 889', match: 88, summary: 'Requires "clear and conspicuous" opt-out mechanisms for data resale.' },
              { case: 'Smith vs. CloudStorage Inc (2015)', cite: 'U.S. Dist. LEXIS 441', match: 72, summary: 'Limitation of liability clauses upheld for free-tier users.' }
            ].map((prec, i) => (
              <div key={i} className="p-4 border border-border-main hover:border-primary/50 transition-colors rounded-xl bg-white group">
                <div className="flex justify-between items-start mb-2">
                   <div>
                      <h4 className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">{prec.case}</h4>
                      <p className="text-[10px] font-mono text-text-muted mt-0.5">{prec.cite}</p>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-ai/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-ai">{prec.match}%</span>
                   </div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed mb-4">{prec.summary}</p>
                <div className="flex gap-2 pt-3 border-t border-border-main opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={() => triggerAction('Insert Citation', 'Adding selected precedent citation to your current legal draft.', 'info')}
                     className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
                   >
                     Insert Citation
                   </button>
                   <span className="text-text-muted text-[10px]">•</span>
                   <button 
                     onClick={() => triggerAction('View Full Text', `Opening complete judicial opinion for "${prec.case}".`, 'info')}
                     className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:underline"
                   >
                     View Full text
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
