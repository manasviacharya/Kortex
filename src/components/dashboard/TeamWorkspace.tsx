import React from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';

interface WorkspaceViewProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
}

export const TeamWorkspace: React.FC<WorkspaceViewProps> = ({ profession, role, orgName, workspaceType }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">
            {workspaceType === 'individual' ? 'Personal Feed' : 'Team Hub'}
          </h1>
          <p className="text-text-secondary">
            {workspaceType === 'individual' ? 'Private bookmarks and personal activity.' : 'Unified collaboration for ' + orgName + "'s " + profession + ' team.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 bg-white border border-border-main rounded-xl text-sm font-medium hover:bg-background-alt transition-colors">
             {workspaceType === 'individual' ? 'My History' : 'Team View'}
           </button>
           <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
             {workspaceType === 'individual' ? '+ New Private Note' : '+ Invite Team Member'}
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-6">
           {workspaceType === 'individual' ? (
             <div className="space-y-4">
                {[
                  { title: 'My Bookmarks', count: 12, icon: '🔖' },
                  { title: 'Private Drafts', count: 4, icon: '🔒' },
                  { title: 'Personal Research', count: 24, icon: '🔍' },
                  { title: 'Reminders', count: 2, icon: '⏰' }
                ].map(item => (
                  <div key={item.title} className="card p-6 flex items-center justify-between hover:border-primary transition-all cursor-pointer group">
                     <div className="flex items-center gap-4">
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                           <p className="font-bold text-text-primary">{item.title}</p>
                           <p className="text-xs text-text-muted">{item.count} items stored</p>
                        </div>
                     </div>
                     <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">➜</span>
                  </div>
                ))}
             </div>
           ) : (
             <div className="card p-6 min-h-[500px] flex flex-col justify-between border-2 border-border-main bg-background-alt/30 shadow-sm">
                <div className="space-y-6">
                   {[
                     { user: 'Sarah', msg: `Has everyone reviewed the new ${profession.toLowerCase()} pipeline?`, time: '2m ago' },
                     { user: 'Mike', msg: 'Yes, just finished the fact-check.', time: '1h ago' },
                     { user: 'Kortex AI', msg: `I've analyzed your team conversation and found a related ${profession.toLowerCase()} document.`, time: 'Now', ai: true }
                   ].map((chat, i) => (
                     <div key={i} className={`flex gap-3 ${chat.ai ? 'bg-ai-gradient/5 p-4 rounded-2xl border border-ai/10' : ''}`}>
                        <div className={`w-8 h-8 rounded-full ${chat.ai ? 'bg-ai-gradient' : 'bg-primary/10'} flex items-center justify-center text-[10px] font-bold ${chat.ai ? 'text-white' : 'text-primary'} shrink-0`}>
                          {chat.ai ? '✨' : chat.user[0]}
                        </div>
                        <div>
                           <p className={`text-xs font-bold mb-1 ${chat.ai ? 'text-ai' : 'text-text-primary'}`}>{chat.user} <span className="text-[10px] text-text-muted font-normal ml-1">{chat.time}</span></p>
                           <p className="text-xs text-text-secondary leading-normal">{chat.msg}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="mt-8 flex items-center gap-2">
                   <input type="text" placeholder="Send message to team..." className="flex-1 bg-white border border-border-main rounded-xl px-4 py-2 text-xs focus:outline-none shadow-sm" />
                   <button className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center shadow-sm hover:scale-105 transition-transform">➜</button>
                </div>
             </div>
           )}
        </div>

        <div className="md:col-span-4 space-y-6">
           <div className="card p-6">
              <h3 className="font-bold text-text-primary mb-6 text-sm uppercase tracking-widest">
                {workspaceType === 'individual' ? 'Recent Activity' : 'Online Members'}
              </h3>
              <div className="space-y-4">
                 {workspaceType === 'individual' ? (
                   [
                     { action: 'Edited', target: 'Draft Alpha', time: '2h ago' },
                     { action: 'Uploaded', target: 'Source PDF', time: '4h ago' },
                     { action: 'Linked', target: 'Knowledge Node', time: '1d ago' }
                   ].map((act, i) => (
                     <div key={i} className="flex items-center gap-3 p-2 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        <p className="text-text-secondary"><span className="font-bold text-text-primary">{act.action}</span> {act.target}</p>
                        <span className="text-[10px] text-text-muted ml-auto">{act.time}</span>
                     </div>
                   ))
                 ) : (
                   [
                     { name: 'John Doe', role: role, status: 'Online' },
                     { name: 'Sarah Miller', role: 'Reviewer', status: 'In Meeting' },
                     { name: 'Mike Johnson', role: 'Associate', status: 'Online' }
                   ].map(member => (
                     <div key={member.name} className="flex items-center justify-between p-3 rounded-xl border border-border-main hover:bg-background-alt transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-medium text-[10px]">{member.name[0]}</div>
                           <div>
                              <p className="text-xs font-bold text-text-primary">{member.name}</p>
                              <p className="text-[10px] text-text-muted">{member.role}</p>
                           </div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-status-success' : 'bg-status-warning'}`}></div>
                     </div>
                   ))
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
