import React from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';
import { Sparkles, ArrowRight, Video, MessageSquare } from 'lucide-react';
import { useAction } from '../../context/ActionContext';

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
  ],
  'Debate/MUN': [
    { title: 'Argument Strengthener', desc: 'Reinforce your policy argument with stronger phrasing.' },
    { title: 'Persuasive Speech Tone', desc: 'Adjust tone to match diplomatic assembly standards.' },
    { title: 'Opponent Anticipation', desc: 'Draft potential counter-arguments to this paragraph.' }
  ]
};

export const DocumentEditor: React.FC<WorkspaceViewProps> = ({ profession, role, orgName, workspaceType }) => {
  const { triggerAction } = useAction();
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
           <button onClick={() => triggerAction('Save Snapshot', 'Current draft snapshot saved to your workspace.', 'success')} className="px-4 py-2 bg-white border border-border-main rounded-xl text-sm font-medium hover:bg-background-alt transition-colors">Save Copy</button>
           <button onClick={() => triggerAction(`Publish ${profession}`, `Preparing your ${profession.toLowerCase()} piece for distribution...`, 'info')} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">Publish {profession}</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-6">
          <div className="card p-10 min-h-[600px] shadow-sm relative group overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
             <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                 <div className="flex items-center gap-4 text-text-muted text-xs font-bold uppercase tracking-widest mb-10 border-b border-border-main pb-4">
                   <span className="text-primary">Draft #241</span>
                   <span>•</span>
                   <span>Created by John Doe</span>
                   <span>•</span>
                   <span>3,240 words</span>

                   {/* Module 8: Multiverse Mode Toggle */}
                   {profession === 'Journalism' && (
                     <div className="ml-auto flex items-center gap-2">
                       <span className="text-[9px]">Multiverse View:</span>
                       <select className="bg-background-alt border border-border-main text-secondary px-2 py-1 rounded focus:outline-none">
                         <option>Standard</option>
                         <option>Environmental</option>
                         <option>Governmental</option>
                         <option>Economic</option>
                         <option>Social</option>
                       </select>
                     </div>
                   )}
                 </div>

                 {/* Module 3: Headline Generator */}
                 {profession === 'Journalism' && (
                   <div className="mb-8 p-4 bg-background-alt/30 border border-border-main rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                         <h3 className="text-sm font-bold text-secondary font-serif">Headline Suggestions</h3>
                         <button onClick={() => triggerAction('Generate Headlines', 'AI is generating high-impact headlines based on your content.', 'ai')} className="text-[10px] font-bold text-white bg-primary px-3 py-1 rounded uppercase tracking-widest">Generate New</button>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                         {[
                           { title: "The Silent Shift in City Infrastructure", score: 92, tone: "Analytical" },
                           { title: "Why Our Zoning Laws Are Failing Us", score: 88, tone: "Critical" },
                           { title: "Building the Future: Urban Growth Realities", score: 85, tone: "Optimistic" },
                           { title: "Concrete Jungles: The New Infrastructure Debate", score: 79, tone: "Exploratory" },
                           { title: "Breaking Down the 2024 City Budget Plan", score: 81, tone: "Direct" }
                         ].map((hl, i) => (
                           <div key={i} className="min-w-[220px] p-3 border border-border-main bg-white rounded-lg group hover:border-primary/40 transition-colors">
                              <p className="text-xs font-bold text-secondary mb-2">{hl.title}</p>
                              <div className="flex items-center justify-between mb-3 text-[9px] font-bold uppercase tracking-widest">
                                 <span className="text-status-success">Score: {hl.score}</span>
                                 <span className="text-text-muted">{hl.tone}</span>
                              </div>
                              <div className="grid grid-cols-3 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button onClick={() => triggerAction('Copy Headline', 'Headline copied to clipboard.', 'success')} className="bg-background-alt hover:bg-white border border-border-main rounded py-1 text-[9px] font-bold text-secondary">Copy</button>
                                 <button onClick={() => triggerAction('Replace Headline', 'Draft title updated with suggestion.', 'success')} className="bg-background-alt hover:bg-white border border-border-main rounded py-1 text-[9px] font-bold text-secondary">Replace</button>
                                 <button onClick={() => triggerAction('Save Headline', 'Suggestion added to your project library.', 'info')} className="bg-background-alt hover:bg-white border border-border-main rounded py-1 text-[9px] font-bold text-secondary">Save</button>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {/* Legal Argument Analyzer */}
                 {profession === 'Legal' && (
                   <div className="mb-8 p-4 bg-background-alt/30 border border-border-main rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                         <h3 className="text-sm font-bold text-secondary font-serif">Argument Analysis Tool</h3>
                         <button onClick={() => triggerAction('Analyze Draft', 'Performing logical consistency check on legal arguments...', 'ai')} className="text-[10px] font-bold text-white bg-primary px-3 py-1 rounded uppercase tracking-widest">Analyze Draft</button>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                         {[
                           { type: "Weak Argument", text: "Reliance on outdated 2004 precedent.", fix: "Update" },
                           { type: "Logical Gap", text: "Missing connection between user intent and liability.", fix: "Rewrite" },
                           { type: "Precedent Match", text: "Consider citing State vs. TechCorp for privacy claims.", fix: "Insert" }
                         ].map((arg, i) => (
                           <div key={i} className="min-w-[220px] p-3 border border-border-main bg-white rounded-lg group hover:border-primary/40 transition-colors">
                              <p className="text-[9px] font-bold text-status-warning mb-1 uppercase tracking-widest">{arg.type}</p>
                              <p className="text-xs text-secondary mb-3 leading-relaxed">{arg.text}</p>
                              <div className="grid grid-cols-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button onClick={() => triggerAction('Fix Applied', `Legal ${arg.fix.toLowerCase()} suggested for this segment.`, 'success')} className="bg-background-alt hover:bg-white border border-border-main rounded py-1 text-[9px] font-bold text-secondary">{arg.fix}</button>
                                 <button onClick={() => triggerAction('Suggestion Dismissed', 'Legal suggestion hidden.', 'info')} className="bg-background-alt hover:bg-white border border-border-main rounded py-1 text-[9px] font-bold text-secondary">Dismiss</button>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {/* Module 2: Literature Gap Detector (Academic Research) */}
                 {profession === 'Academic Research' && (
                   <div className="mb-8 p-4 bg-background-alt/30 border border-border-main rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                         <h3 className="text-sm font-bold text-secondary font-serif">Literature Gap Analysis</h3>
                         <button onClick={() => triggerAction('Scan Literature', 'Cross-referencing your paper with existing research databases...', 'ai')} className="text-[10px] font-bold text-white bg-primary px-3 py-1 rounded uppercase tracking-widest">Analyze Draft</button>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                         {[
                           { type: "Missing Perspective", text: "Longitudinal data lacking on this demographic.", fix: "Add Section" },
                           { type: "Uncited Core Paper", text: "Smith et al. (2021) strongly counters this claim.", fix: "Auto-Cite" },
                           { type: "Under-explored", text: "Methodology section misses bias control factors.", fix: "Review" }
                         ].map((gap, i) => (
                           <div key={i} className="min-w-[220px] p-3 border border-border-main bg-white rounded-lg group hover:border-primary/40 transition-colors">
                              <p className="text-[9px] font-bold text-primary mb-1 uppercase tracking-widest">{gap.type}</p>
                              <p className="text-xs text-secondary mb-3 leading-relaxed">{gap.text}</p>
                              <div className="grid grid-cols-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button onClick={() => triggerAction('Section Updated', `Academic ${gap.fix.toLowerCase()} task added to queue.`, 'success')} className="bg-background-alt hover:bg-white border border-border-main rounded py-1 text-[9px] font-bold text-secondary">{gap.fix}</button>
                                 <button onClick={() => triggerAction('Suggestion Dismissed', 'Academic suggestion hidden.', 'info')} className="bg-background-alt hover:bg-white border border-border-main rounded py-1 text-[9px] font-bold text-secondary">Dismiss</button>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {/* Writing Style Analyzer (Writer) */}
                 {profession === 'Writer' && (
                   <div className="mb-8 p-4 bg-secondary/5 border border-secondary/20 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                         <h3 className="text-sm font-bold text-secondary font-serif">Writing Style Analyzer</h3>
                         <button onClick={() => triggerAction('Analyze Pacing', 'Evaluating narrative flow and stylistic metrics...', 'ai')} className="text-[10px] font-bold text-white bg-secondary px-3 py-1 rounded uppercase tracking-widest">Analyze Draft</button>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                         {[
                           { type: "Pacing Issue", text: "Sentence length is too uniform. Vary structure to build tension.", fix: "Vary Lengths" },
                           { type: "Overused Word", text: "You used 'suddenly' 14 times in this chapter.", fix: "Find Synonyms" },
                           { type: "Show, Don't Tell", text: "'He was very angry.' Consider describing his clenched fists or flushed face.", fix: "Rewrite Scene" }
                         ].map((issue, i) => (
                           <div key={i} className="min-w-[220px] p-3 border border-border-main bg-white rounded-lg group hover:border-secondary/40 transition-colors">
                              <p className="text-[9px] font-bold text-secondary mb-1 uppercase tracking-widest">{issue.type}</p>
                              <p className="text-xs text-secondary mb-3 leading-relaxed">{issue.text}</p>
                              <div className="grid grid-cols-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button onClick={() => triggerAction('Style Applied', `Manuscript ${issue.fix.toLowerCase()} applied via AI assistant.`, 'success')} className="bg-background-alt hover:bg-white border border-border-main rounded py-1 text-[9px] font-bold text-secondary">{issue.fix}</button>
                                 <button onClick={() => triggerAction('Suggestion Dismissed', 'Creative suggestion hidden.', 'info')} className="bg-background-alt hover:bg-white border border-border-main rounded py-1 text-[9px] font-bold text-secondary">Dismiss</button>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {/* Insight Generator & Recommendation Builder (Consulting) */}
                 {profession === 'Consulting' && (
                   <div className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-xl flex flex-col gap-4">
                      {/* Insight Generator */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                           <h3 className="text-sm font-bold text-secondary font-serif">Insight Generator</h3>
                           <button onClick={() => triggerAction('Data Analysis', 'Summarizing strategic findings from linked datasets...', 'ai')} className="text-[10px] font-bold text-white bg-primary px-3 py-1 rounded uppercase tracking-widest">Analyze Data</button>
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                           {[
                             { type: "Key Insight", text: "Customer acquisition costs dropped 15% in Q3.", impact: "High Margin", action: "Insert" },
                             { type: "Strategic Risk", text: "New entrant may capture 5% market share by Q2.", impact: "Threat", action: "Draft Mitigation" }
                           ].map((item, i) => (
                             <div key={i} className="min-w-[220px] p-3 border border-border-main bg-white rounded-lg group hover:border-primary/40 transition-colors">
                                <p className="text-[9px] font-bold text-primary mb-1 uppercase tracking-widest">{item.type}</p>
                                <p className="text-xs text-secondary mb-3 leading-relaxed">{item.text}</p>
                                <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-text-muted mb-3">
                                   Impact: <span className={item.impact === 'Threat' ? 'text-status-error' : 'text-status-success'}>{item.impact}</span>
                                </div>
                                 <div className="grid grid-cols-2 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => triggerAction('Insight Applied', `${item.action} task initialized in draft.`, 'success')} className="bg-background-alt hover:bg-white border border-border-main rounded py-1 text-[9px] font-bold text-secondary">{item.action}</button>
                                    <button onClick={() => triggerAction('Suggestion Dismissed', 'Consulting suggestion hidden.', 'info')} className="bg-background-alt hover:bg-white border border-border-main rounded py-1 text-[9px] font-bold text-secondary">Dismiss</button>
                                 </div>
                             </div>
                           ))}
                        </div>
                      </div>

                      {/* Recommendation Builder */}
                      <div className="pt-4 border-t border-primary/10">
                        <div className="flex items-center justify-between mb-3">
                           <h3 className="text-sm font-bold text-secondary font-serif">Recommendation Builder</h3>
                           <button onClick={() => triggerAction('Formatting Structure', 'AI is reorganizing recommendations into professional framework...', 'ai')} className="text-[10px] font-bold text-primary bg-white border border-border-main px-3 py-1 rounded uppercase tracking-widest hover:border-primary transition-colors">Format Struct</button>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-[10px] font-bold text-center">
                           <div className="p-2 bg-white rounded border border-border-main text-text-secondary cursor-pointer hover:border-primary">1. Problem Statement</div>
                           <div className="p-2 bg-white rounded border border-border-main text-text-secondary cursor-pointer hover:border-primary">2. Analysis Summary</div>
                           <div className="p-2 bg-primary text-white rounded shadow-sm cursor-pointer border border-primary">3. Recommended Action</div>
                           <div className="p-2 bg-white rounded border border-border-main text-text-secondary cursor-pointer hover:border-primary">4. Expected Impact</div>
                        </div>
                      </div>
                   </div>
                 )}

                 {/* 3. Script & Content Draft Builder (Media Production) */}
                 {profession === 'Media Production' && (
                   <div className="absolute -right-4 top-24 translate-x-full w-64 space-y-4">
                      <div className="bg-white border border-border-main rounded-xl p-4 shadow-sm group hover:border-secondary/40 transition-colors">
                         <h4 className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-widest mb-3">
                            <Video size={14} className="text-secondary" /> Script Assistant
                         </h4>
                         <p className="text-[10px] text-text-secondary mb-3">Optimize pacing and visual cues.</p>
                         <div className="space-y-2">
                            <button onClick={() => triggerAction('Hook Search', 'AI is searching for high-retention opening hooks...', 'ai')} className="w-full text-left p-2 rounded bg-background-alt hover:bg-white border border-transparent hover:border-border-main text-xs text-text-secondary flex justify-between items-center transition-colors">
                               <span>Suggest Hook</span> <span className="text-[10px] font-bold text-primary">AI</span>
                            </button>
                            <button onClick={() => triggerAction('Production Format', 'Script formatted with visual and auditory cues.', 'success')} className="w-full text-left p-2 rounded bg-background-alt hover:bg-white border border-transparent hover:border-border-main text-xs text-text-secondary flex justify-between items-center transition-colors">
                               <span>Format Visual Cues</span> <span>🎬</span>
                            </button>
                         </div>
                      </div>

                      <div className="bg-status-success/5 border border-status-success/20 rounded-xl p-4 shadow-sm">
                         <h4 className="text-xs font-bold text-status-success uppercase tracking-widest mb-1 flex items-center gap-1">
                            <MessageSquare size={12}/> Tone Analyzer
                         </h4>
                         <p className="text-[10px] text-text-secondary leading-tight">Currently calibrated for <span className="font-bold text-text-primary">Dramatic / Cinematic</span> styles. Hook retention looks strong.</p>
                      </div>
                   </div>
                 )}

                 {/* 4. Position Paper Builder (Debate/MUN) */}
                 {profession === 'Debate/MUN' && (
                   <div className="absolute -right-4 top-24 translate-x-full w-64 space-y-4">
                      <div className="bg-white border border-border-main rounded-xl p-4 shadow-sm group hover:border-secondary/40 transition-colors">
                         <h4 className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-widest mb-3">
                            <Sparkles size={14} className="text-secondary" /> Position Paper Builder
                         </h4>
                         <p className="text-[10px] text-text-secondary mb-3">Structure your committee stance.</p>
                         <div className="grid grid-cols-1 gap-2 text-[10px] font-bold">
                            <button onClick={() => triggerAction('Section Focused', 'Historical Background module activated.', 'info')} className="p-2 text-left bg-background-alt rounded border border-transparent hover:border-border-main hover:bg-white text-text-secondary transition-colors">1. Historical Background</button>
                            <button onClick={() => triggerAction('Section Focused', 'Country Stance module activated.', 'info')} className="p-2 text-left bg-secondary/10 rounded border border-secondary/20 text-secondary transition-colors font-black">2. Country Stance</button>
                            <button onClick={() => triggerAction('Section Focused', 'Proposed Solutions module activated.', 'info')} className="p-2 text-left bg-background-alt rounded border border-transparent hover:border-border-main hover:bg-white text-text-secondary transition-colors">3. Proposed Solutions</button>
                         </div>
                      </div>

                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 shadow-sm">
                         <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Clarity Score: 85/100</h4>
                         <p className="text-[10px] text-text-secondary leading-tight flex justify-between mt-2">
                           <span>Rhetoric: <span className="text-status-success">Strong</span></span>
                           <span>Diplomacy: <span className="text-status-warning">Moderate</span></span>
                         </p>
                      </div>
                   </div>
                 )}

                 <h2 className="text-4xl font-black text-text-primary tracking-tight leading-tight mb-8">
                   Untitled {profession} Project
                 </h2>
                 <div className="space-y-6 text-text-secondary leading-relaxed text-lg font-medium">
                    {/* Module 2: Article Checker Highlights (Journalism) & Contract Risk Analyzer (Legal) */}
                    {profession === 'Journalism' ? (
                      <div className="space-y-4">
                        <p>Start writing your journalism piece here. The <span className="bg-primary/10 text-primary border-b border-primary border-dashed cursor-help" title="Conflicting Report: Reuters reports 3 casualties; local police report 0.">Situation Monitor</span> actively checks the wire.</p>
                        <p>The recent budget cut means that <span className="bg-status-error/10 text-status-error border-b border-status-error border-dashed cursor-help" title="Unsupported Claim: lacks citation.">city infrastructure spending dropped 40%</span>. However, critics argue against this.</p>
                        <p>Moreover, the <span className="bg-status-warning/10 text-status-warning border-b border-status-warning border-dashed cursor-help" title="Outdated Information: The cited population statistic is from 2018.">population statistic</span> doesn't align with the new zoning laws.</p>
                      </div>
                    ) : profession === 'Legal' ? (
                      <div className="space-y-4">
                        <p>1. Term: This Agreement shall commence on the Effective Date. <span className="bg-status-error/10 text-status-error border-b border-status-error border-dashed cursor-help" title="High Risk: Ambiguous termination conditions. Action: Rewrite clause.">Either party may terminate at any time.</span></p>
                        <p>2. Liability: The Company's total liability shall not exceed the amounts paid. <span className="bg-status-warning/10 text-status-warning border-b border-status-warning border-dashed cursor-help" title="Medium Risk: Missing mutual indemnification clause. Action: Request revision.">[Missing Indemnification Clause]</span></p>
                        <p>3. Dispute Resolution: All disputes shall be resolved in a court of competent jurisdiction. <span className="bg-status-success/10 text-status-success border-b border-status-success border-dashed cursor-help" title="Low Risk: Standard arbitration preferred. Action: Add legal note.">Standard jurisdiction clause.</span></p>
                      </div>
                    ) : profession === 'Academic Research' ? (
                      <div className="space-y-4">
                        <p>Begin drafting your research paper here. The <span className="bg-primary/10 text-primary border-b border-primary border-dashed cursor-help" title="Live Extraction: Monitoring for methodological claims.">Reference Engine</span> actively scans your literature citations.</p>
                        <p>Early findings indicate that <span className="bg-status-error/10 text-status-error border-b border-status-error border-dashed cursor-help" title="Missing Citation: Claim requires supporting literature.">working memory load significantly decreases after interventions</span>.</p>
                        <p>However, the <span className="bg-status-warning/10 text-status-warning border-b border-status-warning border-dashed cursor-help" title="Methodology Flag: Subsample size may be too small for statistical significance.">control group subset (n=12)</span> shown in Figure 2 limits generalizability.</p>
                      </div>
                    ) : profession === 'Writer' ? (
                      <div className="space-y-4">
                        <p>Begin drafting your manuscript here. The <span className="bg-secondary/10 text-secondary border-b border-secondary border-dashed cursor-help" title="Active Analysis: Monitoring pacing and style metrics.">Story Co-Pilot</span> actively analyzes your narrative.</p>
                        <p>The protagonist hesitated at the threshold. <span className="bg-status-error/10 text-status-error border-b border-status-error border-dashed cursor-help" title="Show, Don't Tell: Describe the physical reaction of hesitation instead of stating it.">She felt very anxious.</span></p>
                        <p>The hallway was dark, and <span className="bg-status-warning/10 text-status-warning border-b border-status-warning border-dashed cursor-help" title="Overused Word: You've used 'suddenly' 3 times in the last 500 words.">suddenly</span> a loud noise echoed from below.</p>
                      </div>
                    ) : profession === 'Consulting' ? (
                      <div className="space-y-4">
                        <p>Begin drafting your strategy document here. The <span className="bg-primary/10 text-primary border-b border-primary border-dashed cursor-help" title="Live Mapping: Checking against Q3 hypotheses.">Strategy Engine</span> actively validates your recommendations.</p>
                        <p>Based on the market trend analysis, we propose a strategic pivot. <span className="bg-status-error/10 text-status-error border-b border-status-error border-dashed cursor-help" title="Missing Metric: Specify the expected ROI for this pivot.">This will significantly increase revenue.</span></p>
                        <p>The core problem stems from lagging supply chain adoption, and <span className="bg-status-warning/10 text-status-warning border-b border-status-warning border-dashed cursor-help" title="Weak Recommendation: Provide actionable steps instead of vague directives.">we must optimize our logistics network</span> immediately to stay competitive.</p>
                      </div>
                    ) : profession === 'Media Production' ? (
                      <div className="space-y-4">
                        <p>Begin drafting your content script here. The <span className="bg-secondary/10 text-secondary border-b border-secondary border-dashed cursor-help" title="Active Analysis: Monitoring tension and audience retention.">Script Assistant</span> actively analyzes your narrative pacing.</p>
                        <p>The host turns to the camera, looking directly into the lens. <span className="bg-status-error/10 text-status-error border-b border-status-error border-dashed cursor-help" title="Visual Cue Missing: Add a visual indicator for this transition (e.g. B-Roll, Zoom).">"So, what does this mean for the industry?"</span></p>
                        <p>According to the latest reports, <span className="bg-status-warning/10 text-status-warning border-b border-status-warning border-dashed cursor-help" title="Weak Hook: This sentence has a low engagement probability. Consider leading with the core data point.">there has been a shift in consumer behavior</span> that we cannot ignore.</p>
                      </div>
                    ) : profession === 'Debate/MUN' ? (
                      <div className="space-y-4">
                        <p>Begin drafting your position paper here. The <span className="bg-primary/10 text-primary border-b border-primary border-dashed cursor-help" title="Active Policy Scrutiny: Checking against country voting record.">Policy Engine</span> actively cross-references your claims.</p>
                        <p>The delegation believes we should pursue nuclear disarmament. <span className="bg-status-error/10 text-status-error border-b border-status-error border-dashed cursor-help" title="Policy Contradiction: Your country voted AGAINST the recent disarmament treaty. Adjust stance.">We call upon all nations to disarm immediately.</span></p>
                        <p>Furthermore, <span className="bg-status-warning/10 text-status-warning border-b border-status-warning border-dashed cursor-help" title="Weak Phrasing: Use stronger diplomatic language (e.g., 'strongly urges', 'condemns').">we suggest that other countries reconsider</span> their current border policies.</p>
                      </div>
                    ) : (
                      <p>Start writing your {profession.toLowerCase()} masterpiece here. Kortex AI will provide real-time suggestions based on your role as {role} and your organization's memory.</p>
                    )}
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
                 <Sparkles size={18} /> AI {profession} Assistant
              </h3>
              <div className="space-y-4">
                 {draftingTools.map(action => (
                   <button 
                     key={action.title} 
                     onClick={() => triggerAction(action.title, `Executing ${profession} ${action.title.toLowerCase()} suite...`, 'ai')}
                     className="w-full text-left p-3 rounded-xl border border-ai/20 bg-white hover:bg-ai/5 transition-all group"
                   >
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
                 <button onClick={() => triggerAction('Comment Sent', 'Your comment has been added to the team thread.', 'success')} className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center"><ArrowRight size={14} /></button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
