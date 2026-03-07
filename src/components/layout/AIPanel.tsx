import { type Profession, type Role } from '../../types';
import { cn } from '../../utils/cn';

interface AIPanelProps {
  currentProfession: Profession;
  currentRole: Role;
  className?: string;
}

const professionInsights = {
  Journalism: [
    { id: 1, type: 'alert', title: 'Fact-check needed', description: 'The source "TechLeaks" has a low credibility rating.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Knowledge Link', description: 'This draft relates to your previous series on "Digital Ethics".', color: 'text-ai' },
    { id: 3, type: 'suggestion', title: 'Headline Hub', description: 'Suggested: "The New Newsroom: AI at the Helm"', color: 'text-secondary' },
  ],
  Legal: [
    { id: 1, type: 'alert', title: 'Clause Conflict', description: 'Clause 4.2 conflicts with the precedent in State vs. Doe.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Precedent Match', description: 'I found 3 similar cases from the 2nd Circuit Court.', color: 'text-ai' },
    { id: 3, type: 'suggestion', title: 'Brief Outline', description: 'Add a section on "Jurisdictional Challenges".', color: 'text-secondary' },
  ],
  'Academic Research': [
    { id: 1, type: 'alert', title: 'Citation Error', description: 'The citation for Miller (2022) is missing a DOI.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Data Correlation', description: 'Your new dataset matches patterns in the 2024 mapping study.', color: 'text-ai' },
    { id: 3, type: 'suggestion', title: 'Peer Review Prep', description: 'Strengthen the methodology section for Q1 journals.', color: 'text-secondary' },
  ],
  Writer: [
    { id: 1, type: 'alert', title: 'Plot Inconsistency', description: 'Character "Alex" was in Berlin in Chapter 2, now in Paris.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Thematic Link', description: 'The recurring "Mirror" motif matches your earlier short stories.', color: 'text-ai' },
    { id: 3, type: 'suggestion', title: 'Dialogue Polish', description: 'Make the protagonist more cynical in this scene.', color: 'text-secondary' },
  ],
  Startup: [
    { id: 1, type: 'alert', title: 'Roadmap Delay', description: 'The "Auth" module is blocking the Q3 launch.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Competitor Move', description: 'Competitor X just launched a similar feature to your "Insights".', color: 'text-ai' },
    { id: 3, type: 'suggestion', title: 'Pivot Point', description: 'Consider focusing on the "API-first" approach.', color: 'text-secondary' },
  ],
  Consulting: [
    { id: 1, type: 'alert', title: 'Data Gap', description: 'We lack sector data for the SE Asia market entry.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Client Sentiment', description: 'Client feedback indicates a preference for "Speed" over "Cost".', color: 'text-ai' },
    { id: 3, type: 'suggestion', title: 'Strategic Pivot', description: 'Focus on "Operational Efficiency" for the Q4 report.', color: 'text-secondary' },
  ],
  'Media Production': [
    { id: 1, type: 'alert', title: 'Asset Missing', description: 'B-roll for the "Interview" scene is not indexed.', color: 'text-status-error' },
    { id: 2, type: 'insight', title: 'Visual Rhythm', description: 'The rough cut pacing matches the "Cinematic Style" guide.', color: 'text-ai' },
    { id: 3, type: 'suggestion', title: 'Script Change', description: 'Trim the monologue in Scene 4 for better flow.', color: 'text-secondary' },
  ]
};

export const AIPanel: React.FC<AIPanelProps> = ({ currentProfession, currentRole, className }) => {
  const insights = professionInsights[currentProfession as keyof typeof professionInsights] || professionInsights.Journalism;

  return (
    <aside className={cn("w-80 border-l border-border-main bg-panel flex flex-col h-screen", className)}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-6 h-6 bg-ai-gradient rounded flex items-center justify-center text-[10px] text-white">✨</div>
          <span className="text-sm font-bold text-text-primary uppercase tracking-widest">AI Insights</span>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-ai-gradient/5 border border-ai/10">
            <h3 className="text-sm font-semibold text-ai mb-2">Intelligence Context</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Analyzing your activity as <span className="font-bold">{currentRole}</span> in the <span className="font-bold">{currentProfession}</span> workspace.
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
      </div>
      
      <div className="mt-auto p-4 bg-background-alt/50 border-t border-border-main">
        <div className="relative">
          <input 
            type="text" 
            placeholder={`Ask about ${currentProfession.toLowerCase()}...`}
            className="w-full bg-panel border border-border-main rounded-xl pl-4 pr-10 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-ai/20 focus:border-ai transition-all shadow-sm"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-ai-gradient rounded flex items-center justify-center text-[10px] text-white">➜</button>
        </div>
      </div>
    </aside>
  );
};
