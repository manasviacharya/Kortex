import React from 'react';
import { cn } from '../../utils/cn';

interface TopBarProps {
  onNotificationClick: () => void;
  onProfileClick: () => void;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ onNotificationClick, onProfileClick, className }) => {
  return (
    <header className={cn("h-16 border-b border-border-main bg-panel flex items-center justify-between px-8", className)}>
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-lg">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
          <input 
            type="text" 
            placeholder="Search across your knowledge base..."
            className="w-full bg-background-alt border border-border-main rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onNotificationClick}
          className="p-2 text-text-secondary hover:bg-background-alt rounded-lg transition-colors relative"
        >
          <span>🔔</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-error rounded-full border-2 border-panel"></span>
        </button>
        <div className="h-6 w-px bg-border-main mx-2"></div>
        <button 
          onClick={onProfileClick}
          className="flex items-center gap-2 px-3 py-1.5 bg-background-alt border border-border-main rounded-xl text-sm font-medium hover:bg-border-main/50 transition-colors"
        >
          <div className="w-5 h-5 bg-ai-gradient rounded flex items-center justify-center text-[10px] text-white">W</div>
          <span>Acme Corp</span>
          <span className="text-[10px]">▼</span>
        </button>
      </div>
    </header>
  );
};
