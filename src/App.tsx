import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { LandingPage } from './components/landing/LandingPage';
import { Onboarding } from './components/onboarding/Onboarding';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { LogoutPage } from './components/auth/LogoutPage';
import { ProfessionDashboard } from './components/dashboard/ProfessionDashboard';
import { JournalistDashboard } from './components/dashboard/JournalistDashboard';
import { LegalDashboard } from './components/dashboard/LegalDashboard';
import { AcademicDashboard } from './components/dashboard/AcademicDashboard';
import { WriterDashboard } from './components/dashboard/WriterDashboard';
import { ConsultingDashboard } from './components/dashboard/ConsultingDashboard';
import { MediaDashboard } from './components/dashboard/MediaDashboard';
import { DebateDashboard } from './components/dashboard/DebateDashboard';
import { ResearchWorkspace } from './components/dashboard/ResearchWorkspace';
import { DocumentEditor } from './components/dashboard/DocumentEditor';
import { TaskBoard } from './components/dashboard/TaskBoard';
import { TeamWorkspace } from './components/dashboard/TeamWorkspace';
import { AIAssistant } from './components/dashboard/AIAssistant';
import { Settings } from './components/dashboard/Settings';
import { Notifications } from './components/dashboard/Notifications';
import { SituationMonitor } from './components/dashboard/SituationMonitor';
import { type Profession, type Role, type WorkspaceType } from './types';
import { ActionProvider } from './context/ActionContext';
import { SystemFeedback } from './components/common/SystemFeedback';


type ViewState = 'landing' | 'login' | 'signup' | 'logout' | 'onboarding' | 'dashboard';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [config, setConfig] = useState<{ profession: Profession; role: Role; orgName: string } | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [workspaceType, setWorkspaceType] = useState<WorkspaceType>('team');

  if (view === 'landing') {
    return (
      <LandingPage
        onStart={() => setView('login')}
        onGetStarted={() => setView('signup')}
      />
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
        onSignup={(data: { name: string; email: string }) => {
          setUser(data);
          setView('onboarding');
        }}
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
        userName={user?.name}
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
        if (currentProf === 'Academic Research' || (currentRole as string) === 'Academic Research') {
          return (
            <AcademicDashboard
              role={currentRole}
              orgName={currentOrg}
              workspaceType={workspaceType}
              setWorkspaceType={setWorkspaceType}
              onOpenProject={() => setActiveTab('drafts')}
            />
          );
        }
        if (currentProf === 'Writer' || (currentRole as string) === 'Writer') {
          return (
            <WriterDashboard
              profession={currentProf}
              role={currentRole}
              orgName={currentOrg}
              workspaceType={workspaceType}
              setWorkspaceType={setWorkspaceType}
            />
          );
        }
        if (currentProf === 'Legal' || (currentRole as string) === 'Legal') {
          return (
            <LegalDashboard
              role={currentRole}
              orgName={currentOrg}
              workspaceType={workspaceType}
              setWorkspaceType={setWorkspaceType}
              onOpenProject={() => setActiveTab('drafts')}
            />
          );
        }
        if (currentProf === 'Journalism' || (currentRole as string) === 'Journalism') {
          return (
            <JournalistDashboard
              role={currentRole}
              orgName={currentOrg}
              workspaceType={workspaceType}
              setWorkspaceType={setWorkspaceType}
              onOpenProject={() => setActiveTab('drafts')}
            />
          );
        }
        if (currentProf === 'Consulting' || (currentRole as string) === 'Consulting') {
          return (
            <ConsultingDashboard
              profession={currentProf}
              role={currentRole}
              orgName={currentOrg}
              workspaceType={workspaceType}
              setWorkspaceType={setWorkspaceType}
              onOpenProject={() => setActiveTab('drafts')}
            />
          );
        }
        if (currentProf === 'Media Production' || (currentRole as string) === 'Media Production') {
          return (
            <MediaDashboard
              profession={currentProf}
              role={currentRole}
              orgName={currentOrg}
              workspaceType={workspaceType}
              setWorkspaceType={setWorkspaceType}
              onOpenProject={() => setActiveTab('drafts')}
            />
          );
        }
        if (currentProf === 'Debate/MUN' || (currentRole as string) === 'Debate/MUN') {
          return (
            <DebateDashboard
              role={currentRole}
              orgName={currentOrg}
              workspaceType={workspaceType}
              setWorkspaceType={setWorkspaceType}
              onOpenProject={() => setActiveTab('drafts')}
            />
          );
        }
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
            onOpenTeam={() => setActiveTab('team')}
          />
        );
      case 'research':
        return <ResearchWorkspace profession={currentProf} role={currentRole} orgName={currentOrg} workspaceType={workspaceType} />;
      case 'drafts':
        return <DocumentEditor profession={currentProf} role={currentRole} orgName={currentOrg} workspaceType={workspaceType} />;

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
      case 'situation-monitor':
        return <SituationMonitor profession={currentProf} role={currentRole} orgName={currentOrg} workspaceType={workspaceType} />;
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
            onOpenTeam={() => setActiveTab('team')}
          />
        );
    }
  };

  return (
    <ActionProvider>
      <div className="relative">
        <MainLayout
          currentProfession={currentProf}
          currentRole={currentRole}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userName={user?.name}
          orgName={config?.orgName}
          onLogout={() => setView('logout')}
        >
          {renderActiveTab()}
        </MainLayout>
        <SystemFeedback />
      </div>
    </ActionProvider>
  );
}

export default App;
