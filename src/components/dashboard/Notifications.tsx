import React from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';

interface WorkspaceViewProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
}

export const Notifications: React.FC<WorkspaceViewProps> = ({ profession, role, orgName, workspaceType }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">Notifications</h1>
          <p className="text-text-secondary">Stay updated with {workspaceType === 'individual' ? 'your personal' : orgName + "'s"} {profession} activity.</p>
        </div>
        <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">Mark all as read</button>
      </header>

      <div className="max-w-3xl mx-auto space-y-4">
        {[
          { type: 'AI', title: 'New Insight Found', msg: 'Kortex AI found a correlation between "Project Alpha" and "Market Research".', time: '2m ago', icon: '✨', color: 'bg-ai/10 text-ai' },
          { type: 'Team', title: 'Comment on Draft', msg: 'Sarah Miller commented on your draft: "Needs more data".', time: '1h ago', icon: '💬', color: 'bg-primary/10 text-primary' },
          { type: 'System', title: 'Task Due Soon', msg: 'The task "Review Evidence" is due in 2 hours.', time: '2h ago', icon: '✅', color: 'bg-status-error/10 text-status-error' },
          { type: 'Team', title: 'Project Shared', msg: 'Mike Johnson shared "Compliance Audit Q1" with you.', time: '1d ago', icon: '📁', color: 'bg-secondary/10 text-secondary' }
        ].map((notif, i) => (
          <div key={i} className="card p-6 flex gap-6 items-start hover:bg-background-alt transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-primary group">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${notif.color}`}>
                {notif.icon}
             </div>
             <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                   <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{notif.title}</p>
                   <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{notif.time}</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{notif.msg}</p>
                <div className="flex items-center gap-2 mt-4">
                   <span className={`text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded ${notif.color}`}>{notif.type}</span>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
