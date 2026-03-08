import React, { useState } from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';
import { Users, Cpu, Shield, CreditCard, Building2, UserPlus, ShieldCheck, Zap, Globe, Lock } from 'lucide-react';
import { useAction } from '../../context/ActionContext';

interface WorkspaceViewProps {
   profession: Profession;
   role: Role;
   orgName: string;
   workspaceType: WorkspaceType;
}

export const Settings: React.FC<WorkspaceViewProps> = ({ profession, role, orgName, workspaceType }) => {
   const { triggerAction } = useAction();
   const [activeTab, setActiveTab] = useState('Organization');

   const navItems = [
      { label: 'Organization', icon: Building2 },
      { label: 'Team Members', icon: Users },
      { label: 'AI Preferences', icon: Cpu },
      { label: 'Security', icon: Shield },
      { label: 'Billing', icon: CreditCard },
   ];

   return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
         <header>
            <h1 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">
               {workspaceType === 'individual' ? 'Personal Settings' : 'Workspace Settings'}
            </h1>
            <p className="text-text-secondary">Manage {workspaceType === 'individual' ? 'your' : orgName + "'s"} {profession} configuration.</p>
         </header>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3 space-y-2">
               {navItems.map((item) => (
                  <button
                     key={item.label}
                     onClick={() => setActiveTab(item.label)}
                     className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 ${activeTab === item.label ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:bg-background-alt'}`}
                  >
                     <item.icon size={18} />
                     {item.label}
                  </button>
               ))}
            </div>

            <div className="md:col-span-9 space-y-6">
               <div className="card p-8 space-y-8 min-h-[500px]">
                  {activeTab === 'Organization' && (
                     <>
                        <div className="space-y-4">
                           <h3 className="text-lg font-bold text-text-primary">General Information</h3>
                           <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Organization Name</label>
                                 <input type="text" defaultValue={orgName} className="w-full bg-background-alt border border-border-main rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Profession Base</label>
                                 <input type="text" defaultValue={profession} disabled className="w-full bg-background-alt/50 border border-border-main rounded-xl px-4 py-2.5 text-sm cursor-not-allowed text-text-muted" />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <h3 className="text-lg font-bold text-text-primary">Role Configuration</h3>
                           <p className="text-sm text-text-secondary">Your current role is <span className="font-bold text-primary">{role}</span>. Contact an admin to change permissions.</p>
                           <div className="p-4 rounded-xl bg-status-warning/5 border border-status-warning/20 flex gap-4">
                              <span className="text-lg">⚠️</span>
                              <p className="text-xs text-text-secondary leading-relaxed">Changes to organization-level settings require Lead or Admin permissions.</p>
                           </div>
                        </div>
                     </>
                  )}

                  {activeTab === 'Team Members' && (
                     <div className="space-y-6">
                        <div className="flex justify-between items-center">
                           <h3 className="text-lg font-bold text-text-primary">Manage Team</h3>
                           <button onClick={() => triggerAction('Invite Member', 'Team invitation email sent to the specified address.', 'success')} className="btn-primary flex items-center gap-2 py-2 text-xs">
                              <UserPlus size={14} /> Invite Member
                           </button>
                        </div>
                        <div className="overflow-hidden rounded-xl border border-border-main">
                           <table className="w-full text-left">
                              <thead className="bg-background-alt text-[10px] font-bold text-text-muted uppercase tracking-widest">
                                 <tr>
                                    <th className="px-6 py-3">Member</th>
                                    <th className="px-6 py-3">Role</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3"></th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-border-main text-sm">
                                 {[
                                    { name: 'Manan Shah', email: 'manan@shah.com', role: 'Admin', status: 'Active' },
                                    { name: 'Manasvi Acharya', email: 'manasvi@acharya.com', role: 'Editor', status: 'Active' },
                                    { name: 'Nidhi Joshi ', email: 'nidhi@joshi.com', role: 'Viewer', status: 'Pending' }
                                 ].map((member) => (
                                    <tr key={member.email}>
                                       <td className="px-6 py-4">
                                          <p className="font-bold text-text-primary">{member.name}</p>
                                          <p className="text-xs text-text-muted">{member.email}</p>
                                       </td>
                                       <td className="px-6 py-4 text-text-secondary">{member.role}</td>
                                       <td className="px-6 py-4">
                                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${member.status === 'Active' ? 'bg-status-success/10 text-status-success' : 'bg-status-warning/10 text-status-warning'}`}>
                                             {member.status}
                                          </span>
                                         </td>
                                         <td className="px-6 py-4 text-right">
                                            <button onClick={() => triggerAction('Member Access', `Opening permission management for ${member.name}.`, 'info')} className="text-xs text-text-muted hover:text-primary font-bold">Manage</button>
                                         </td>
                                      </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  )}

                  {activeTab === 'AI Preferences' && (
                     <div className="space-y-8">
                        <h3 className="text-lg font-bold text-text-primary">Intelligence Settings</h3>

                        <div className="space-y-6">
                           <div className="flex items-center justify-between p-4 rounded-xl border border-border-main bg-background-alt/30">
                               <div>
                                  <p className="text-sm font-bold text-text-primary">Advanced Model Accuracy</p>
                                  <p className="text-xs text-text-muted">Use high-fidelity models for complex research tasks.</p>
                               </div>
                               <div 
                                 onClick={() => triggerAction('AI Configuration', 'Model accuracy toggled. Applying changes to research pipeline...', 'ai')}
                                 className="w-12 h-6 bg-primary rounded-full relative cursor-pointer"
                               >
                                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                               </div>
                            </div>

                           <div className="space-y-4">
                              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">AI Personality</label>
                               <div className="grid grid-cols-3 gap-4">
                                  {['Concise', 'Balanced', 'Creative'].map(mode => (
                                     <button 
                                       key={mode} 
                                       onClick={() => triggerAction('AI Personality', `Assistant personality set to ${mode}.`, 'ai')}
                                       className={`py-4 rounded-xl border text-sm font-bold transition-all ${mode === 'Balanced' ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-border-main text-text-muted hover:border-primary/50'}`}
                                     >
                                        {mode}
                                     </button>
                                  ))}
                               </div>
                           </div>

                           <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                              <div className="flex items-center gap-2 text-primary">
                                 <Zap size={16} />
                                 <span className="text-sm font-bold">Turbo Processing</span>
                              </div>
                              <p className="text-xs text-text-secondary leading-relaxed">Turbo processing is active for your profession. Real-time insights will be generated faster.</p>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'Security' && (
                     <div className="space-y-8">
                        <h3 className="text-lg font-bold text-text-primary">Account Security</h3>

                        <div className="space-y-6">
                           <div className="grid grid-cols-1 gap-6">
                               <div 
                                 onClick={() => triggerAction('Change Password', 'Security verification required to update password.', 'warning')}
                                 className="flex items-center justify-between p-6 rounded-2xl border border-border-main bg-white hover:border-primary/30 transition-all cursor-pointer group"
                               >
                                  <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 rounded-xl bg-status-warning/10 text-status-warning flex items-center justify-center">
                                        <Lock size={24} />
                                     </div>
                                     <div>
                                        <p className="text-sm font-bold text-text-primary">Change Password</p>
                                        <p className="text-xs text-text-muted">Last updated 3 months ago</p>
                                     </div>
                                  </div>
                                  <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">Update →</span>
                               </div>

                               <div className="flex items-center justify-between p-6 rounded-2xl border border-border-main bg-white hover:border-primary/30 transition-all cursor-pointer group">
                                  <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 rounded-xl bg-status-success/10 text-status-success flex items-center justify-center">
                                        <ShieldCheck size={24} />
                                     </div>
                                     <div>
                                        <p className="text-sm font-bold text-text-primary">Two-Factor Authentication</p>
                                        <p className="text-xs text-text-muted">Recommended for team accounts</p>
                                     </div>
                                  </div>
                                  <button onClick={(e) => { e.stopPropagation(); triggerAction('Security Settings', '2FA enrollment process started.', 'success'); }} className="px-4 py-2 bg-background-alt hover:bg-border-main rounded-lg text-xs font-bold transition-colors">Enable</button>
                               </div>

                               <div className="flex items-center justify-between p-6 rounded-2xl border border-border-main bg-white hover:border-primary/30 transition-all cursor-pointer group">
                                  <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                        <Globe size={24} />
                                     </div>
                                     <div>
                                        <p className="text-sm font-bold text-text-primary">Active Sessions</p>
                                        <p className="text-xs text-text-muted">2 devices currently logged in</p>
                                     </div>
                                  </div>
                                  <button onClick={(e) => { e.stopPropagation(); triggerAction('Security Audit', 'All other active sessions have been revoked.', 'success'); }} className="text-xs font-bold text-status-error hover:underline">Revoke All</button>
                               </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'Billing' && (
                     <div className="space-y-8">
                        <div className="flex justify-between items-end">
                           <div>
                              <h3 className="text-lg font-bold text-text-primary">Subscription & Billing</h3>
                              <p className="text-xs text-text-muted mt-1">Manage your plan and payment history.</p>
                           </div>
                           <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Active Plan</span>
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                           <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Kortex Enterprise</p>
                           <div className="flex items-baseline gap-2 mb-6">
                              <span className="text-4xl font-serif font-bold text-text-primary">₹499</span>
                              <span className="text-text-muted">/per month</span>
                           </div>
                           <div className="grid grid-cols-2 gap-4 text-xs font-medium text-text-secondary">
                              <p className="flex items-center gap-2">✓ Unlimited AI Insights</p>
                              <p className="flex items-center gap-2">✓ Custom Knowledge Base</p>
                              <p className="flex items-center gap-2">✓ Team Collaboration</p>
                              <p className="flex items-center gap-2">✓ Priority Processing</p>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <h4 className="text-sm font-bold text-text-primary">Payment Method</h4>
                           <div className="flex items-center justify-between p-4 rounded-xl border border-border-main">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-6 bg-text-primary rounded flex items-center justify-center text-[8px] text-white font-bold italic">VISA</div>
                                  <p className="text-sm font-medium text-text-secondary">•••• •••• •••• 4242</p>
                               </div>
                               <button onClick={() => triggerAction('Billing Settings', 'Secure payment management portal opening...', 'info')} className="text-xs font-bold text-primary hover:underline">Edit</button>
                            </div>
                        </div>
                     </div>
                  )}

                   <div className="pt-6 border-t border-border-main flex justify-end gap-3">
                      <button onClick={() => triggerAction('Configuration Reset', 'All unsaved changes have been discarded.', 'warning')} className="px-6 py-2.5 rounded-xl text-sm font-bold text-text-secondary hover:bg-background-alt transition-colors">Discard Changes</button>
                      <button onClick={() => triggerAction('Configuration Saved', 'Workspace settings updated successfully.', 'success')} className="btn-primary">Save Configuration</button>
                   </div>
               </div>
            </div>
         </div>
      </div>
   );
};
