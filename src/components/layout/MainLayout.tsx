import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { AIPanel } from './AIPanel';
import { type Profession, type Role } from '../../types';
import { cn } from '../../utils/cn';

interface MainLayoutProps {
  children: React.ReactNode;
  currentProfession: Profession;
  currentRole: Role;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  currentProfession, 
  currentRole, 
  activeTab,
  setActiveTab,
  className 
}) => {
  return (
    <div className="flex h-screen bg-background-main overflow-hidden">
      <Sidebar 
        currentProfession={currentProfession} 
        currentRole={currentRole} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar 
          onNotificationClick={() => setActiveTab('notifications')}
          onProfileClick={() => setActiveTab('settings')}
        />
        <main className={cn("flex-1 overflow-y-auto p-8", className)}>
          {children}
        </main>
      </div>
      <AIPanel currentProfession={currentProfession} currentRole={currentRole} />
    </div>
  );
};
