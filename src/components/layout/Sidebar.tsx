import React from 'react';
import { type Profession, type Role } from '../../types';
import { cn } from '../../utils/cn';

interface SidebarProps {
  currentProfession: Profession;
  currentRole: Role;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
}

const navItems = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'research', icon: '🔍', label: 'Research' },
  { id: 'drafts', icon: '📝', label: 'Drafts' },
  { id: 'knowledge', icon: '🧠', label: 'Knowledge Base' },
  { id: 'tasks', icon: '✅', label: 'Tasks' },
  { id: 'team', icon: '👥', label: 'Team Workspace' },
  { id: 'ai', icon: '✨', label: 'AI Assistant' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentProfession, 
  currentRole, 
  activeTab, 
  setActiveTab, 
  className 
}) => {
  return (
    <aside className={cn("w-64 border-r border-border-main bg-panel flex flex-col h-screen", className)}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-ai-gradient rounded-lg flex items-center justify-center text-white font-bold">K</div>
          <span className="text-xl font-bold text-text-primary tracking-tight">Kortex</span>
        </div>
        
        <div className="mb-6">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3 px-3">Workspace</p>
          <div className="flex items-center gap-2 px-3 py-2 bg-background-alt rounded-xl border border-border-main">
            <span className="text-lg">🏢</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-text-primary truncate">{currentProfession}</p>
              <p className="text-[10px] text-text-muted truncate">Team Plan</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors text-left",
                activeTab === item.id 
                  ? "bg-primary/5 text-primary" 
                  : "text-text-secondary hover:bg-background-alt"
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-border-main space-y-4">
        <div className="px-2">
          <div className="p-3 rounded-xl bg-ai-gradient/5 border border-ai/10">
             <div className="flex items-center gap-2 mb-1">
                <span className="text-xs">✨</span>
                <p className="text-[10px] font-bold text-ai uppercase tracking-wider">Kortex AI</p>
             </div>
             <p className="text-[10px] text-text-secondary leading-relaxed">
                Analyze your {currentProfession.toLowerCase()} workspace for new insights.
             </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-medium text-xs">JD</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">John Doe</p>
            <p className="text-xs text-text-muted truncate">{currentRole}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
