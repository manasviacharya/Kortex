import React from 'react';
import { motion } from 'framer-motion';
import { type Profession, type Role } from '../../types';
import { cn } from '../../utils/cn';
import {
  Search, AlertTriangle, Activity, Scale, BookOpen, Download,
  Lightbulb, ShieldAlert, BarChart2, TrendingUp, Database, FileText, Globe,
  ChevronRight, Sparkles
} from 'lucide-react';

interface AIPanelProps {
  currentProfession: Profession;
  currentRole: Role;
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const professionInsights = {
  Journalism: [
    { id: 1, type: 'alert', title: 'Fact-check needed', description: 'The source "TechLeaks" has a low credibility rating.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Knowledge Link', description: 'This draft relates to your previous series on "Digital Ethics".', color: 'text-ai' }
  ],
  Legal: [
    { id: 1, type: 'alert', title: 'Clause Conflict', description: 'Clause 4.2 conflicts with the precedent in State vs. Doe.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Precedent Match', description: 'I found 3 similar cases from the 2nd Circuit Court.', color: 'text-ai' }
  ],
  'Academic Research': [
    { id: 1, type: 'alert', title: 'Citation Error', description: 'The citation for Miller (2022) is missing a DOI.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Data Correlation', description: 'Your new dataset matches patterns in the 2024 mapping study.', color: 'text-ai' }
  ],
  Writer: [
    { id: 1, type: 'alert', title: 'Plot Inconsistency', description: 'Character "Alex" was in Berlin in Chapter 2, now in Paris.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Thematic Link', description: 'The recurring "Mirror" motif matches your earlier short stories.', color: 'text-ai' }
  ],
  Startup: [
    { id: 1, type: 'alert', title: 'Roadmap Delay', description: 'The "Auth" module is blocking the Q3 launch.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Competitor Move', description: 'Competitor X just launched a similar feature to your "Insights".', color: 'text-ai' }
  ],
  Consulting: [
    { id: 1, type: 'alert', title: 'Data Gap', description: 'We lack sector data for the SE Asia market entry.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Client Sentiment', description: 'Client feedback indicates a preference for "Speed" over "Cost".', color: 'text-ai' }
  ],
  'Media Production': [
    { id: 1, type: 'alert', title: 'Asset Missing', description: 'B-roll for the "Interview" scene is not indexed.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Visual Rhythm', description: 'The rough cut pacing matches the "Cinematic Style" guide.', color: 'text-ai' }
  ],
  'Debate/MUN': [
    { id: 1, type: 'alert', title: 'Policy Gap', description: 'No records found for "Loss and Damage" in 2021.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Voting Pattern', description: 'Delegation usually votes with G77 on climate issues.', color: 'text-ai' }
  ]
};

export const AIPanel: React.FC<AIPanelProps> = ({ currentProfession, currentRole, className, isOpen, onToggle }) => {
  const insights = professionInsights[currentProfession as keyof typeof professionInsights] || professionInsights.Journalism;

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isOpen ? 320 : 64,
        opacity: 1
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={cn(
        "border-l border-border-main bg-panel flex flex-col h-screen overflow-hidden hidden lg:flex relative",
        className
      )}
    >
      <div className="absolute top-6 right-0 left-0 flex justify-center z-10">
        {!isOpen ? (
          <button
            onClick={onToggle}
            className="w-10 h-10 bg-ai-gradient rounded-xl flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
            title="Open AI Insights"
          >
            <Sparkles size={18} />
          </button>
        ) : (
          <div className="w-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-ai-gradient rounded flex items-center justify-center text-[10px] text-white">
                <Sparkles size={12} />
              </div>
              <span className="text-sm font-bold text-text-primary uppercase tracking-widest">AI Insights</span>
            </div>
            <button
              onClick={onToggle}
              className="p-2 text-text-muted hover:text-secondary rounded-lg hover:bg-background-alt transition-colors"
              title="Collapse Panel"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div className={cn(
        "flex-1 overflow-y-auto scrollbar-hide mt-20 px-6 pb-6 space-y-8 transition-opacity duration-200",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className="min-w-[272px] space-y-8">
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-ai-gradient/5 border border-ai/10">
              <h3 className="text-sm font-semibold text-ai mb-2">Intelligence Context</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Analyzing your activity as <span className="font-bold text-secondary">{currentRole}</span> in the <span className="font-bold text-secondary">{currentProfession}</span> workspace.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Validation & Alerts</h4>
              {insights.map((insight) => (
                <div key={insight.id} className="p-3 rounded-xl border border-border-main bg-background-alt/50 hover:bg-white transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest", insight.color)}>
                      {insight.type}
                    </span>
                    <span className="text-[10px] text-text-muted group-hover:text-text-secondary transition-colors">Dismiss</span>
                  </div>
                  <h5 className="text-xs font-semibold text-text-primary mb-1">{insight.title}</h5>
                  <p className="text-[10px] text-text-secondary leading-normal">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-border-main">
            {currentProfession === 'Journalism' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-secondary mb-3 flex items-center gap-2"><Search size={16} /> Article Finder</h3>
                  <input type="text" placeholder="Search archives..." className="w-full bg-white border border-border-main rounded-lg px-3 py-2 text-xs mb-2" />
                  <div className="flex gap-2">
                    <button className="flex-1 bg-background-alt border border-border-main py-1.5 rounded text-[10px] font-bold text-text-secondary">Topic</button>
                    <button className="flex-1 bg-background-alt border border-border-main py-1.5 rounded text-[10px] font-bold text-text-secondary">Date</button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-status-warning mb-3 flex items-center gap-2"><AlertTriangle size={16} /> Article Checker Warnings</h3>
                  <div className="p-3 bg-status-warning/10 border border-status-warning/20 rounded-lg">
                    <p className="text-xs text-status-warning font-bold mb-1">Unverified Quote</p>
                    <p className="text-[10px] text-text-secondary">Paragraph 4 contains a quote not found in the source transcript.</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2"><Activity size={16} /> Story Impact Detector</h3>
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary mb-1">84/100</p>
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Predicted Engagement</p>
                  </div>
                </div>
              </div>
            )}

            {currentProfession === 'Legal' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-secondary mb-3 flex items-center gap-2"><Scale size={16} /> Case Research Finder</h3>
                  <input type="text" placeholder="Query cases and statutes..." className="w-full bg-white border border-border-main rounded-lg px-3 py-2 text-xs mb-2" />
                  <div className="flex gap-2 mb-3">
                    <select className="flex-1 bg-background-alt border border-border-main py-1.5 px-2 rounded text-[10px] font-bold text-text-secondary focus:outline-none"><option>Jurisdiction</option><option>NY</option><option>CA</option></select>
                    <select className="flex-1 bg-background-alt border border-border-main py-1.5 px-2 rounded text-[10px] font-bold text-text-secondary focus:outline-none"><option>Year</option><option>2023</option><option>2024</option></select>
                  </div>
                  <div className="p-3 bg-white border border-border-main rounded-lg hover:border-primary/40 transition-colors cursor-pointer group">
                    <p className="text-xs font-bold text-secondary mb-1 group-hover:text-primary transition-colors">Smith v. TechCorp (2022)</p>
                    <p className="text-[10px] text-text-secondary mb-2 line-clamp-2">Ruling established precedent on data liabilities for third-party vendors.</p>
                    <button className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-widest hover:bg-primary hover:text-white transition-colors">Insert Citation</button>
                  </div>
                </div>
              </div>
            )}

            {currentProfession === 'Academic Research' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-secondary mb-3 flex items-center gap-2"><BookOpen size={16} /> Research Paper Finder</h3>
                  <input type="text" placeholder="Search academia (DOI, Title)..." className="w-full bg-white border border-border-main rounded-lg px-3 py-2 text-xs mb-2" />
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button className="bg-background-alt border border-border-main py-1.5 rounded text-[10px] font-bold text-text-secondary hover:bg-white">Field</button>
                    <button className="bg-background-alt border border-border-main py-1.5 rounded text-[10px] font-bold text-text-secondary hover:bg-white">Author</button>
                  </div>
                  <div className="p-3 bg-white border border-border-main rounded-lg hover:border-primary/40 transition-colors cursor-pointer group">
                    <p className="text-xs font-bold text-secondary mb-1 group-hover:text-primary transition-colors">Neural Dynamics of Working Memory</p>
                    <p className="text-[10px] text-text-secondary mb-2">Zhang et al., 2023 • 142 Citations</p>
                    <div className="flex gap-2">
                      <button className="text-[10px] font-bold text-white bg-primary px-2 py-1 rounded uppercase tracking-widest hover:bg-primary/90 transition-colors flex items-center gap-1"><BookOpen size={10} /> Cite</button>
                      <button className="text-[10px] font-bold text-secondary bg-background-alt border border-border-main px-2 py-1 rounded uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-1"><Download size={10} /> Import</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentProfession === 'Writer' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-secondary mb-3 flex items-center gap-2"><Lightbulb size={16} /> Story Idea Generator</h3>
                  <textarea placeholder="Seed prompt (e.g. Cyberpunk detective...)" className="w-full bg-white border border-border-main rounded-lg px-3 py-2 text-xs min-h-[60px] resize-none mb-2 focus:outline-none focus:border-ai" />
                  <button className="w-full bg-secondary text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-secondary/90 transition-colors">Generate Plot Points</button>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-status-error mb-3 flex items-center gap-2"><ShieldAlert size={16} /> Consistency Checker</h3>
                  <div className="p-3 bg-status-error/10 border border-status-error/20 rounded-lg">
                    <p className="text-xs text-status-error font-bold mb-1">Trait Contradiction: "Marcus"</p>
                    <p className="text-[10px] text-text-secondary">Marcus is described as aquaphobic in Chapter 1, but is swimming here.</p>
                  </div>
                </div>
              </div>
            )}

            {currentProfession === 'Consulting' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-secondary mb-3 flex items-center gap-2"><BarChart2 size={16} /> Industry Intelligence Panel</h3>
                  <input type="text" placeholder="Search market reports..." className="w-full bg-white border border-border-main rounded-lg px-3 py-2 text-xs mb-2 focus:outline-none focus:border-primary" />
                  <div className="flex gap-2 mb-4">
                    <select className="flex-1 bg-background-alt border border-border-main py-1.5 px-2 rounded text-[10px] font-bold text-text-secondary focus:outline-none"><option>Industry</option><option>Fintech</option></select>
                    <select className="flex-1 bg-background-alt border border-border-main py-1.5 px-2 rounded text-[10px] font-bold text-text-secondary focus:outline-none"><option>Region</option><option>APAC</option></select>
                  </div>

                  <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 border-b border-border-main pb-1">Market Metrics</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-white border border-border-main rounded-lg text-center">
                      <p className="text-[9px] text-text-muted font-bold uppercase mb-1">TAM (2025)</p>
                      <p className="text-xs font-bold text-secondary">$420B</p>
                    </div>
                    <div className="p-2 bg-white border border-border-main rounded-lg text-center">
                      <p className="text-[9px] text-text-muted font-bold uppercase mb-1">CAGR</p>
                      <p className="text-xs font-bold text-status-success">+14.2%</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="p-2 bg-background-alt border border-border-main rounded flex items-center gap-2 justify-between group cursor-pointer hover:border-primary/40">
                      <div className="flex items-center gap-2"><FileText size={12} className="text-primary" /><span className="text-[10px] font-bold text-secondary">Q3 Tech Sector Report</span></div>
                      <Download size={12} className="text-text-muted group-hover:text-primary" />
                    </div>
                    <div className="p-2 bg-background-alt border border-border-main rounded flex items-center gap-2 justify-between group cursor-pointer hover:border-primary/40">
                      <div className="flex items-center gap-2"><Database size={12} className="text-primary" /><span className="text-[10px] font-bold text-secondary">APAC Adoption Dataset</span></div>
                      <Download size={12} className="text-text-muted group-hover:text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentProfession === 'Media Production' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-secondary mb-3 flex items-center gap-2">
                    <TrendingUp size={16} className="text-status-success" /> Content Optimization Tool
                  </h3>
                  <div className="bg-white border border-border-main rounded-xl p-4 shadow-sm mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-text-primary uppercase tracking-widest">Est. Engagement</span>
                      <span className="text-lg font-bold text-status-success">A-</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      <div className="h-2 bg-status-success rounded-full flex-[3]"></div>
                      <div className="h-2 bg-status-warning rounded-full flex-1"></div>
                      <div className="h-2 bg-background-alt border border-border-main rounded-full flex-1"></div>
                    </div>
                    <p className="text-[10px] text-text-secondary">Expected 15% better read-through rate than benchmark due to concise hooks.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-status-error/5 border-l-2 border-status-error rounded-r-xl group hover:bg-status-error/10 transition-colors cursor-pointer">
                      <p className="text-xs font-bold text-text-primary mb-1">SEO Keyword Missing</p>
                      <p className="text-[10px] text-text-secondary mb-2">The keyword "AI Assistant" only appears once. Suggest adding it to H2s.</p>
                      <button className="text-[10px] font-bold text-status-error uppercase tracking-widest hover:underline">Auto-Fix</button>
                    </div>
                    <div className="p-3 bg-status-warning/5 border-l-2 border-status-warning rounded-r-xl group hover:bg-status-warning/10 transition-colors cursor-pointer">
                      <p className="text-xs font-bold text-text-primary mb-1">Headline Hook Weak</p>
                      <p className="text-[10px] text-text-secondary mb-2">Current headline has a low emotional hook score. (Score: 42/100).</p>
                      <button className="text-[10px] font-bold text-status-warning uppercase tracking-widest hover:underline">Suggest 3 Options</button>
                    </div>
                    <div className="p-3 bg-secondary/5 border-l-2 border-secondary rounded-r-xl group hover:bg-secondary/10 transition-colors cursor-pointer">
                      <p className="text-xs font-bold text-text-primary mb-1">Readability Warning</p>
                      <p className="text-[10px] text-text-secondary">Paragraph 3 contains three contiguous sentences over 20 words.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentProfession === 'Debate/MUN' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-secondary mb-3 flex items-center gap-2"><Globe size={16} /> Country Research Panel</h3>
                  <input type="text" placeholder="Search country or committee..." className="w-full bg-white border border-border-main rounded-lg px-3 py-2 text-xs mb-3" />

                  <div className="space-y-3">
                    <div className="p-3 bg-white border-l-4 border-l-secondary shadow-sm rounded-lg hover:border-primary/40 transition-colors cursor-pointer group">
                      <p className="text-xs font-bold text-text-primary mb-1 group-hover:text-secondary transition-colors">Foreign Policy: Climate Finance</p>
                      <p className="text-[10px] text-text-secondary leading-tight line-clamp-2">The delegation historically opposes binding financial commitments without technology transfer agreements.</p>
                      <div className="mt-2 flex gap-1">
                        <span className="bg-background-alt px-1.5 py-0.5 rounded text-[8px] font-bold text-text-muted uppercase tracking-widest">Add to Notes</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white border border-border-main rounded-lg hover:border-primary/40 transition-colors cursor-pointer group">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">UN Voting History</p>
                        <span className="bg-status-success/10 text-status-success text-[8px] font-bold px-1.5 py-0.5 rounded">Res 76/12</span>
                      </div>
                      <p className="text-[10px] text-text-secondary leading-tight mb-2">Voted in favor of establishing the global loss and damage fund.</p>
                      <button className="text-[9px] font-bold text-primary hover:underline uppercase tracking-widest">Cite in Speech</button>
                    </div>

                    <div className="p-3 bg-white border border-border-main rounded-lg">
                      <p className="text-xs font-bold text-text-primary mb-2">Key Indicators</p>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div><span className="text-text-muted">GDP:</span> <span className="font-bold">$3.2T</span></div>
                        <div><span className="text-text-muted">Emissions:</span> <span className="font-bold">2.4%</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={cn(
        "mt-auto p-4 bg-background-alt/50 border-t border-border-main shrink-0 transition-opacity duration-200",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className="min-w-[272px] relative">
          <input
            type="text"
            placeholder={`Ask about ${currentProfession.toLowerCase()}...`}
            className="w-full bg-panel border border-border-main rounded-xl pl-4 pr-10 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-ai/20 focus:border-ai transition-all shadow-sm"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-ai-gradient rounded flex items-center justify-center text-[10px] text-white">➜</button>
        </div>
      </div>
    </motion.aside>
  );
};
