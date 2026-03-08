import React from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';
import { 
  MessageSquare, FileText, Microscope,
  Database, ScrollText, Video, Clapperboard, Globe, ShieldAlert
} from 'lucide-react';
import { useAction } from '../../context/ActionContext';

interface WorkspaceViewProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
}

export const TeamWorkspace: React.FC<WorkspaceViewProps> = ({ profession, role, orgName, workspaceType }) => {
  const { triggerAction } = useAction();
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
           <button 
             onClick={() => triggerAction(workspaceType === 'individual' ? 'My History' : 'Team View', `Opening ${workspaceType === 'individual' ? 'personal activity log' : 'team contribution overview'}.`, 'info')}
             className="px-4 py-2 bg-white border border-border-main rounded-xl text-sm font-medium hover:bg-background-alt transition-colors"
           >
             {workspaceType === 'individual' ? 'My History' : 'Team View'}
           </button>
           <button 
             onClick={() => triggerAction(workspaceType === 'individual' ? 'New Note' : 'Invite Member', workspaceType === 'individual' ? 'Private scratchpad initialized.' : 'Team invitation portal opened.', 'success')}
             className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
           >
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
                  <div 
                    key={item.title} 
                    onClick={() => triggerAction(item.title, `Navigating to ${item.title.toLowerCase()}...`, 'info')}
                    className="card p-6 flex items-center justify-between hover:border-primary transition-all cursor-pointer group"
                  >
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
                   <button 
                     onClick={() => triggerAction('Message Sent', 'Your message has been broadcast to the team channel.', 'success')}
                     className="w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
                   >
                     ➜
                   </button>
                </div>
            </div>
          )}

          {profession === 'Academic Research' && (
            <div className="card p-0 mt-6 border-l-4 border-l-secondary overflow-hidden bg-gradient-to-br from-white to-secondary/5">
              <div className="p-4 border-b border-border-main flex justify-between items-center bg-white/50 backdrop-blur-sm">
                 <h3 className="font-bold text-secondary flex items-center gap-2">
                    <Microscope size={18} className="text-secondary" /> Lab Discussions
                 </h3>
                 <button 
                   onClick={() => triggerAction('New Thread', 'Academic discussion thread initialized.', 'success')}
                   className="text-[10px] bg-secondary text-white px-3 py-1 rounded shadow-sm font-bold uppercase tracking-widest"
                 >
                   New Thread
                 </button>
              </div>
              <div className="p-4 space-y-4">
                 {[
                   { title: 'IRB Approval Updates', latest: 'RS: Protocol 4A needs revision before tomorrow.', time: '2h ago', comments: 14, icon: <ScrollText size={16} /> },
                   { title: 'Dataset Cleaning - Sleep Study', latest: 'AK: I removed outliers > 3SD from the baseline.', time: '5h ago', comments: 32, icon: <Database size={16} /> },
                   { title: 'Methodology Section Draft', latest: 'JD: Can someone review the inclusion criteria?', time: '1d ago', comments: 8, icon: <FileText size={16} /> }
                 ].map((thread, i) => (
                    <div 
                      key={i} 
                      onClick={() => triggerAction('Discussion Thread', `Opening thread: ${thread.title}`, 'info')}
                      className="flex gap-4 p-4 bg-white border border-border-main rounded-xl hover:border-secondary/40 transition-colors cursor-pointer group shadow-sm hover:shadow-md"
                    >
                       <div className="w-10 h-10 rounded bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                          {thread.icon}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                             <h4 className="text-sm font-bold text-text-primary group-hover:text-secondary transition-colors">{thread.title}</h4>
                             <span className="text-[10px] text-text-muted whitespace-nowrap">{thread.time}</span>
                          </div>
                          <p className="text-xs text-text-secondary truncate">{thread.latest}</p>
                       </div>
                       <div className="flex items-center gap-1 text-[10px] font-bold text-text-muted bg-background-alt px-2 py-1 rounded h-fit self-center">
                          <MessageSquare size={12} /> {thread.comments}
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {profession === 'Writer' && (
            <div className="card p-0 mt-6 border-l-4 border-l-secondary overflow-hidden bg-gradient-to-br from-white to-secondary/5">
              <div className="p-4 border-b border-border-main flex justify-between items-center bg-white/50 backdrop-blur-sm">
                 <h3 className="font-bold text-secondary flex items-center gap-2">
                    <MessageSquare size={18} className="text-secondary" /> Peer Review & Beta Feedback
                 </h3>
                 <button 
                   onClick={() => triggerAction('Share Chapter', 'Manuscript sharing portal opened for beta readers.', 'success')}
                   className="text-[10px] bg-secondary text-white px-3 py-1 rounded shadow-sm font-bold uppercase tracking-widest"
                 >
                   Share Chapter
                 </button>
              </div>
              <div className="p-4 space-y-4">
                 {[
                   { title: 'Chapter 3: Pacing Notes', latest: 'Editor: The middle sags slightly. Consider cutting the tavern scene.', time: '1h ago', comments: 4, icon: <ScrollText size={16} /> },
                   { title: 'Character Arc: Kaelen', latest: 'Beta 1: I love his motivation here, very clear.', time: '4h ago', comments: 12, icon: <MessageSquare size={16} /> },
                   { title: 'Sensitivity Read: Act 1', latest: 'Reviewer: The cultural references to the Spire feel authentic.', time: '1d ago', comments: 2, icon: <FileText size={16} /> }
                 ].map((thread, i) => (
                    <div 
                      key={i} 
                      onClick={() => triggerAction('Feedback Thread', `Opening feedback for: ${thread.title}`, 'info')}
                      className="flex gap-4 p-4 bg-white border border-border-main rounded-xl hover:border-secondary/40 transition-colors cursor-pointer group shadow-sm hover:shadow-md"
                    >
                       <div className="w-10 h-10 rounded bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                          {thread.icon}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                             <h4 className="text-sm font-bold text-text-primary group-hover:text-secondary transition-colors">{thread.title}</h4>
                             <span className="text-[10px] text-text-muted whitespace-nowrap">{thread.time}</span>
                          </div>
                          <p className="text-xs text-text-secondary truncate">{thread.latest}</p>
                       </div>
                       <div className="flex items-center gap-1 text-[10px] font-bold text-text-muted bg-background-alt px-2 py-1 rounded h-fit self-center">
                          <MessageSquare size={12} /> {thread.comments}
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {profession === 'Media Production' && (
            <div className="card p-0 mt-6 border-l-4 border-l-secondary overflow-hidden bg-gradient-to-br from-white to-secondary/5">
              <div className="p-4 border-b border-border-main flex justify-between items-center bg-white/50 backdrop-blur-sm">
                 <h3 className="font-bold text-secondary flex items-center gap-2">
                    <Video size={18} className="text-secondary" /> Media Team Collaboration
                 </h3>
                 <button 
                   onClick={() => triggerAction('Share Asset', 'Asset sharing modal initialized.', 'success')}
                   className="text-[10px] bg-secondary text-white px-3 py-1 rounded shadow-sm font-bold uppercase tracking-widest"
                 >
                   Share Asset
                 </button>
              </div>
              <div className="p-4 space-y-4">
                 {[
                   { title: 'Project: Neon Skies', latest: 'Director: The lighting in Scene 4 is too dark.', time: '1h ago', comments: 14, icon: <Clapperboard size={16} /> },
                   { title: 'Script Revisions', latest: 'Editor: Fixed the pacing issue in Act 2.', time: '3h ago', comments: 8, icon: <ScrollText size={16} /> },
                   { title: 'Audio Mastering', latest: 'Sound: Still waiting on the new voiceover files.', time: '1d ago', comments: 3, icon: <MessageSquare size={16} /> }
                 ].map((thread, i) => (
                    <div 
                      key={i} 
                      onClick={() => triggerAction('Production Thread', `Opening production notes for: ${thread.title}`, 'info')}
                      className="flex gap-4 p-4 bg-white border border-border-main rounded-xl hover:border-secondary/40 transition-colors cursor-pointer group shadow-sm hover:shadow-md"
                    >
                       <div className="w-10 h-10 rounded bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                          {thread.icon}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                             <h4 className="text-sm font-bold text-text-primary group-hover:text-secondary transition-colors">{thread.title}</h4>
                             <span className="text-[10px] text-text-muted whitespace-nowrap">{thread.time}</span>
                          </div>
                          <p className="text-xs text-text-secondary truncate">{thread.latest}</p>
                       </div>
                       <div className="flex items-center gap-1 text-[10px] font-bold text-text-muted bg-background-alt px-2 py-1 rounded h-fit self-center">
                          <MessageSquare size={12} /> {thread.comments}
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {profession === 'Debate/MUN' && (
            <div className="card p-0 mt-6 border-l-4 border-l-primary overflow-hidden bg-gradient-to-br from-white to-primary/5">
              <div className="p-4 border-b border-border-main flex justify-between items-center bg-white/50 backdrop-blur-sm">
                 <h3 className="font-bold text-primary flex items-center gap-2">
                    <Globe size={18} className="text-primary" /> Delegation Strategy Room
                 </h3>
                 <button 
                   onClick={() => triggerAction('Post Intel', 'Secure intelligence drop initialized.', 'ai')}
                   className="text-[10px] bg-primary text-white px-3 py-1 rounded shadow-sm font-bold uppercase tracking-widest"
                 >
                   Post Intel
                 </button>
              </div>
              <div className="p-4 space-y-4">
                 {[
                   { title: 'Committee: UNSC', latest: 'Delegate: France is signaling a veto on clause 4.', time: '12m ago', comments: 6, icon: <ShieldAlert size={16} /> },
                   { title: 'Bloc Forming', latest: 'Strategy: We need three more African Union signatures.', time: '1h ago', comments: 14, icon: <MessageSquare size={16} /> },
                   { title: 'Draft Resolution Review', latest: 'Head Delegate: Preamble looks strong. Check operative clauses.', time: '2h ago', comments: 8, icon: <ScrollText size={16} /> }
                 ].map((thread, i) => (
                    <div 
                      key={i} 
                      onClick={() => triggerAction('Intel Thread', `Opening strategy brief for: ${thread.title}`, 'info')}
                      className="flex gap-4 p-4 bg-white border border-border-main rounded-xl hover:border-primary/40 transition-colors cursor-pointer group shadow-sm hover:shadow-md"
                    >
                       <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          {thread.icon}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                             <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{thread.title}</h4>
                             <span className="text-[10px] text-text-muted whitespace-nowrap">{thread.time}</span>
                          </div>
                          <p className="text-xs text-text-secondary truncate">{thread.latest}</p>
                       </div>
                       <div className="flex items-center gap-1 text-[10px] font-bold text-text-muted bg-background-alt px-2 py-1 rounded h-fit self-center">
                          <MessageSquare size={12} /> {thread.comments}
                       </div>
                    </div>
                 ))}
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
                     { action: 'Linked', target: 'Research Node', time: '1d ago' }
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
                     <div 
                       key={member.name} 
                       onClick={() => triggerAction('Member Profile', `Opening collaboration options with ${member.name}.`, 'info')}
                       className="flex items-center justify-between p-3 rounded-xl border border-border-main hover:bg-background-alt transition-colors cursor-pointer group"
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-medium text-[10px]">{member.name[0]}</div>
                           <div>
                              <p className="text-xs font-bold text-text-primary">{member.name}</p>
                              <p className="text-[10px] text-text-muted">{member.role}</p>
                           </div>
                        </div>
                        {profession === 'Academic Research' && (
                  <div className="space-y-4 pt-4 border-t border-border-main mt-4">
                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Active Hypothesis Board</p>
                     <div className="p-3 bg-secondary/5 border-l-2 border-secondary rounded-r text-xs text-secondary italic">
                        "Sleep deprivation directly correlates with decreased gray matter density over a 5-year longitudinal span."
                     </div>
                  </div>
                )}
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
