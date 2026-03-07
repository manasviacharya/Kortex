import React, { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { LandingPage } from './components/landing/LandingPage';
import { Onboarding } from './components/onboarding/Onboarding';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { LogoutPage } from './components/auth/LogoutPage';
import { ProfessionDashboard } from './components/dashboard/ProfessionDashboard';
import { ResearchWorkspace } from './components/dashboard/ResearchWorkspace';
import { DocumentEditor } from './components/dashboard/DocumentEditor';
import { KnowledgeBase } from './components/dashboard/KnowledgeBase';
import { TaskBoard } from './components/dashboard/TaskBoard';
import { TeamWorkspace } from './components/dashboard/TeamWorkspace';
import { AIAssistant } from './components/dashboard/AIAssistant';
import { Settings } from './components/dashboard/Settings';
import { Notifications } from './components/dashboard/Notifications';
import { type Profession, type Role, type WorkspaceType } from './types';

type ViewState = 'landing' | 'login' | 'signup' | 'logout' | 'onboarding' | 'dashboard';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [config, setConfig] = useState<{ profession: Profession; role: Role; orgName: string } | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [workspaceType, setWorkspaceType] = useState<WorkspaceType>('team');

  if (view === 'landing') {
    return (
      <LandingPage onStart={() => setView('signup')} />
    );
  }

  if (view === 'login') {
    return (
      <LoginPage 
        onLogin={() => {
          if (config) {
            setView('dashboard');
          } else {
            setView('onboarding');
          }
        }}
        onGoToSignup={() => setView('signup')}
        onGoBack={() => setView('landing')}
      />
    );
  }

  if (view === 'signup') {
    return (
      <SignupPage 
        onSignup={() => setView('onboarding')}
        onGoToLogin={() => setView('login')}
        onGoBack={() => setView('landing')}
      />
    );
  }

  if (view === 'logout') {
    return (
      <LogoutPage 
        onLogoutComplete={() => {
          setView('landing');
          setActiveTab('dashboard');
        }}
      />
    );
  }

  if (view === 'onboarding') {
    return (
      <Onboarding 
        onComplete={(data) => {
          setConfig(data);
          setView('dashboard');
        }}
      />
    );
  }

  const currentProf = config?.profession || 'Journalism';
  const currentRole = config?.role || 'Lead';
  const currentOrg = config?.orgName || 'Acme Corp';

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <ProfessionDashboard 
            profession={currentProf} 
            role={currentRole} 
            orgName={currentOrg} 
            workspaceType={workspaceType}
            setWorkspaceType={setWorkspaceType}
            onOpenProject={() => setActiveTab('drafts')}
            onOpenTasks={() => setActiveTab('tasks')}
            onOpenAI={() => setActiveTab('ai')}
            onOpenKnowledge={() => setActiveTab('knowledge')}
            onOpenTeam={() => setActiveTab('team')}
          />
        );
      case 'research':
        return <ResearchWorkspace profession={currentProf} role={currentRole} orgName={currentOrg} workspaceType={workspaceType} />;
      case 'drafts':
        return <DocumentEditor profession={currentProf} role={currentRole} orgName={currentOrg} workspaceType={workspaceType} />;
      case 'knowledge':
        return <KnowledgeBase profession={currentProf} role={currentRole} orgName={currentOrg} workspaceType={workspaceType} />;
      case 'tasks':
        return <TaskBoard profession={currentProf} role={currentRole} orgName={currentOrg} workspaceType={workspaceType} />;
      case 'team':
        return <TeamWorkspace profession={currentProf} role={currentRole} orgName={currentOrg} workspaceType={workspaceType} />;
      case 'ai':
        return <AIAssistant profession={currentProf} role={currentRole} orgName={currentOrg} workspaceType={workspaceType} />;
      case 'settings':
        return <Settings profession={currentProf} role={currentRole} orgName={currentOrg} workspaceType={workspaceType} />;
      case 'notifications':
        return <Notifications profession={currentProf} role={currentRole} orgName={currentOrg} workspaceType={workspaceType} />;
      default:
        return (
          <ProfessionDashboard 
            profession={currentProf} 
            role={currentRole} 
            orgName={currentOrg} 
            workspaceType={workspaceType}
            setWorkspaceType={setWorkspaceType}
            onOpenProject={() => setActiveTab('drafts')} 
            onOpenTasks={() => setActiveTab('tasks')} 
            onOpenAI={() => setActiveTab('ai')}
            onOpenKnowledge={() => setActiveTab('knowledge')}
            onOpenTeam={() => setActiveTab('team')}
          />
        );
    }
  };

  return (
    <div className="relative">
      <MainLayout 
        currentProfession={currentProf} 
        currentRole={currentRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {renderActiveTab()}
      </MainLayout>
      <button 
        onClick={() => setView('logout')}
        className="fixed bottom-8 left-8 bg-white border border-border-main text-text-muted px-4 py-2 rounded-xl text-xs font-medium shadow-lg hover:text-primary transition-all z-50"
      >
        ← Logout
      </button>
    </div>
  );
}

export default App;
