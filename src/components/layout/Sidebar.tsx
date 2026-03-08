import React from 'react';
import { type Profession, type Role } from '../../types';
import { cn } from '../../utils/cn';
import {
  LayoutDashboard,
  Search,
  FileEdit,
  CheckSquare,
  Users,
  Sparkles,
  Settings,
  Globe,
  Building2,
  LogOut
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAction } from '../../context/ActionContext';

interface SidebarProps {
  currentProfession: Profession;
  currentRole: Role;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
  userName?: string;
  orgName?: string;
  onLogout?: () => void;
}

const navItems = [
  { id: 'dashboard', icon: <LayoutDashboard size={18} strokeWidth={2} />, label: 'Dashboard' },
  { id: 'research', icon: <Search size={18} strokeWidth={2} />, label: 'Research' },
  { id: 'drafts', icon: <FileEdit size={18} strokeWidth={2} />, label: 'Drafts' },
  { id: 'tasks', icon: <CheckSquare size={18} strokeWidth={2} />, label: 'Tasks' },
  { id: 'team', icon: <Users size={18} strokeWidth={2} />, label: 'Team Workspace' },
  { id: 'ai', icon: <Sparkles size={18} strokeWidth={2} />, label: 'AI Assistant' },
  { id: 'settings', icon: <Settings size={18} strokeWidth={2} />, label: 'Settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentProfession,
  currentRole,
  activeTab,
  setActiveTab,
  className,
  userName,
  orgName,
  onLogout
}) => {
  const { triggerAction } = useAction();
  return (
    <aside className={cn("w-64 border-r border-border-main bg-panel flex flex-col h-screen", className)}>
      <div className="p-8 pb-4 flex items-center gap-3">
        <Logo size={36} />
        <h1 className="text-3xl font-serif font-bold text-secondary tracking-tight">Kortex</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pt-0 scrollbar-hide">
        <div className="mb-6">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3 px-3">Workspace</p>
          <div 
            onClick={() => triggerAction('Workspace Switcher', 'Opening list of available team spaces and professional profiles.', 'info')}
            className="flex items-center gap-2 px-3 py-2 bg-background-alt rounded-xl border border-border-main hover:border-primary/50 cursor-pointer transition-all group"
          >
            <div className="text-secondary opacity-80 group-hover:text-primary transition-colors"><Building2 size={24} strokeWidth={1.5} /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-primary truncate">{orgName || currentProfession}</p>
              <p className="text-[10px] text-text-muted truncate uppercase tracking-widest font-bold">{currentProfession} Plan</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-sm font-bold tracking-wide
                ${activeTab === item.id
                  ? 'text-primary bg-primary/5'
                  : 'text-text-secondary hover:text-secondary hover:bg-background-alt'}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
          {(currentProfession === 'Journalism' || (currentRole as string) === 'Journalism') && (
            <button
              onClick={() => setActiveTab('situation-monitor')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-sm font-bold tracking-wide
                ${activeTab === 'situation-monitor'
                  ? 'text-primary bg-primary/5'
                  : 'text-text-secondary hover:text-secondary hover:bg-background-alt'}`}
            >
              <span><Globe size={18} strokeWidth={2} /></span>
              Situation Monitor
            </button>
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-border-main flex flex-col gap-3 bg-panel mt-auto">
        <div 
          onClick={() => triggerAction('AI Hub', 'Opening global AI insights and workspace analysis history.', 'ai')}
          className="p-4 border border-border-main rounded-xl hover:border-ai/50 cursor-pointer transition-all group bg-white/50"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-primary group-hover:scale-110 transition-transform"><Sparkles size={14} strokeWidth={2.5} /></span>
            <h4 className="text-xs font-bold text-secondary tracking-widest uppercase">KORTEX AI</h4>
          </div>
          <p className="text-[10px] text-text-secondary leading-tight">
            Analyze your {currentProfession.toLowerCase()} workspace for new insights.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <div 
            onClick={() => triggerAction('User Profile', 'Opening your account settings and profile overview.', 'info')}
            className="flex items-center gap-3 p-3 rounded-xl border border-border-main/50 bg-background-alt/30 hover:bg-background-alt cursor-pointer transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs border border-secondary/20 shadow-sm group-hover:scale-105 transition-transform">
              {userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase() : 'JD'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-text-primary truncate">{userName || 'John Doe'}</p>
              <p className="text-[9px] text-text-muted truncate uppercase tracking-widest font-bold leading-none">{currentRole}</p>
            </div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-status-error hover:bg-status-error/5 rounded-lg transition-all text-xs font-bold"
            >
              <LogOut size={14} />
              <span>Log out</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
