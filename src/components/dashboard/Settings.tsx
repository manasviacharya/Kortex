import React from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';

interface WorkspaceViewProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
}

export const Settings: React.FC<WorkspaceViewProps> = ({ profession, role, orgName, workspaceType }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">
          {workspaceType === 'individual' ? 'Personal Settings' : 'Workspace Settings'}
        </h1>
        <p className="text-text-secondary">Manage {workspaceType === 'individual' ? 'your' : orgName + "'s"} {profession} configuration.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-2">
           {['Organization', 'Team Members', 'AI Preferences', 'Security', 'Billing'].map((item, i) => (
             <button key={item} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${i === 0 ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:bg-background-alt'}`}>
                {item}
             </button>
           ))}
        </div>

        <div className="md:col-span-8 space-y-6">
           <div className="card p-8 space-y-8">
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

              <div className="pt-6 border-t border-border-main flex justify-end gap-3">
                 <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-text-secondary hover:bg-background-alt transition-colors">Discard Changes</button>
                 <button className="btn-primary">Save Configuration</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
