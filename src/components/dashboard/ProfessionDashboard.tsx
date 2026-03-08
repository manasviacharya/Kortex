import React, { useState } from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';
import { cn } from '../../utils/cn';
import { useAction } from '../../context/ActionContext';
import { 
  BookOpen, PenTool, Lightbulb, Briefcase, CheckCircle2, Plus, Layout, List, 
  Newspaper, Scale, Video
} from 'lucide-react';

interface DashboardProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
  setWorkspaceType: (type: WorkspaceType) => void;
  onOpenProject: () => void;
  onOpenTasks: () => void;
  onOpenAI: () => void;
  onOpenTeam: () => void;
}

const professionSpecificData = {
  Journalism: {
    title: 'Newsroom Pipeline',
    description: 'Track investigations, sources, and story drafts.',
    icon: <Newspaper size={24} strokeWidth={1.5} className="text-secondary" />,
    pipeline: ['Idea', 'Draft', 'Review', 'Edit', 'Publish'],
    activeStep: 1,
    metrics: [
      { label: 'Active Drafts', value: '12', trend: '+2' },
      { label: 'Fact-checks', value: '45', trend: '+12' },
      { label: 'Published', value: '128', trend: '+5' }
    ],
    projects: [
      { title: 'The Future of AI in Newsrooms', status: 'Drafting', info: '1,200 words • 2h ago' },
      { title: 'Ethics of Synthetic Media', status: 'Review', info: '2,400 words • 5h ago' }
    ]
  },
  Legal: {
    title: 'Case Management',
    description: 'Organize precedents, briefs, and client communications.',
    icon: <Scale size={24} strokeWidth={1.5} className="text-secondary" />,
    pipeline: ['Evidence', 'Analysis', 'Drafting', 'Review', 'Filing'],
    activeStep: 2,
    metrics: [
      { label: 'Open Cases', value: '8', trend: '0' },
      { label: 'Briefs Pending', value: '14', trend: '+3' },
      { label: 'Compliance Alerts', value: '2', trend: '-1' }
    ],
    projects: [
      { title: 'State vs. Henderson Case File', status: 'Drafting', info: 'Evidence extracted • 1h ago' },
      { title: 'Compliance Audit Q1', status: 'Analysis', info: '24 documents scanned' }
    ]
  },
  'Academic Research': {
    title: 'Research Hub',
    description: 'Manage literature reviews and data synthesis.',
    icon: <BookOpen size={24} strokeWidth={1.5} className="text-secondary" />,
    pipeline: ['Lit Review', 'Experiment', 'Data Analysis', 'Drafting', 'Peer Review'],
    activeStep: 0,
    metrics: [
      { label: 'Citations', value: '842', trend: '+24' },
      { label: 'Active Papers', value: '4', trend: '+1' },
      { label: 'Data Sets', value: '15', trend: '+2' }
    ],
    projects: [
      { title: 'Quantum Entanglement in Micro-chips', status: 'Lit Review', info: '42 papers indexed' },
      { title: 'Neural Path Mapping Study', status: 'Data Analysis', info: '98% accuracy' }
    ]
  },
  Writer: {
    title: 'Manuscript Workspace',
    description: 'Develop character arcs, timelines, and drafts.',
    icon: <PenTool size={24} strokeWidth={1.5} className="text-secondary" />,
    pipeline: ['Outlining', 'Drafting', 'Revision', 'Polishing', 'Submission'],
    activeStep: 1,
    metrics: [
      { label: 'Word Count', value: '45k', trend: '+2k' },
      { label: 'Chapters', value: '14', trend: '+1' },
      { label: 'Characters', value: '28', trend: '0' }
    ],
    projects: [
      { title: 'The Silicon Shadow (Novel)', status: 'Drafting', info: 'Chapter 12 in progress' },
      { title: 'Short Story Collection', status: 'Revision', info: '3/5 stories revised' }
    ]
  },
  Startup: {
    title: 'Product Command Center',
    description: 'Align features, roadmaps, and marketing materials.',
    icon: <Lightbulb size={24} strokeWidth={1.5} className="text-secondary" />,
    pipeline: ['Ideation', 'Roadmap', 'Design', 'Build', 'Launch'],
    activeStep: 3,
    metrics: [
      { label: 'Feature Docs', value: '32', trend: '+4' },
      { label: 'Sprint Tasks', value: '18', trend: '-5' },
      { label: 'Decision Logs', value: '56', trend: '+8' }
    ],
    projects: [
      { title: 'Kortex Mobile App MVP', status: 'Build', info: 'Auth module complete' },
      { title: 'Q3 Product Roadmap', status: 'Design', info: 'Stakeholder review needed' }
    ]
  },
  Consulting: {
    title: 'Client Engagement',
    description: 'Develop strategies, analyze data, and present findings.',
    icon: <Briefcase size={24} strokeWidth={1.5} className="text-secondary" />,
    pipeline: ['Discovery', 'Analysis', 'Strategic Plan', 'Review', 'Presentation'],
    activeStep: 2,
    metrics: [
      { label: 'Client Projects', value: '6', trend: '0' },
      { label: 'Insights Found', value: '124', trend: '+18' },
      { label: 'Reports Gen', value: '12', trend: '+2' }
    ],
    projects: [
      { title: 'Market Entry Strategy: Asia', status: 'Strategic Plan', info: 'Competitor analysis done' },
      { title: 'Internal Efficiency Audit', status: 'Analysis', info: 'Department X interview' }
    ]
  },
  'Media Production': {
    title: 'Production Slate',
    description: 'Coordinate scripts, assets, and shoot schedules.',
    icon: <Video size={24} strokeWidth={1.5} className="text-secondary" />,
    pipeline: ['Pre-prod', 'Shooting', 'Editing', 'VFX', 'Distribution'],
    activeStep: 2,
    metrics: [
      { label: 'Active Shoots', value: '3', trend: '+1' },
      { label: 'Footage (GB)', value: '840', trend: '+120' },
      { label: 'Timeline Edits', value: '142', trend: '+14' }
    ],
    projects: [
      { title: 'Documentary: The AI Shift', status: 'Editing', info: 'Rough cut v2' },
      { title: 'Brand Story: Future Tech', status: 'Pre-prod', info: 'Script approved' }
    ]
  }
};

const roleSpecificActions = {
  Lead: ['Review Team Velocity', 'Manage Workspace', 'Assign Projects'],
  Editor: ['Draft Queue', 'Style Guide', 'Publishing Schedule'],
  Reviewer: ['Pending Approvals', 'Fact-Check Queue', 'Validation Logs'],
  Associate: ['My Drafts', 'Research Sources', 'Task List'],
  Publisher: ['Distribution Hub', 'Final Review', 'Archiving'],
  Admin: ['Organization Analytics', 'Role Permissions', 'Billing & Plan']
};

export const ProfessionDashboard: React.FC<DashboardProps> = ({
  profession,
  role,
  orgName,
  workspaceType,
  setWorkspaceType,
  onOpenProject,
  onOpenTasks,
  onOpenAI,
  onOpenTeam
}) => {
  const { triggerAction } = useAction();
  const [tasks, setTasks] = useState([
    { id: 1, task: `Validate ${profession} findings`, due: 'Today', prio: 'High', completed: false },
    { id: 2, task: 'Stakeholder Review Prep', due: 'Tomorrow', prio: 'Medium', completed: false },
    { id: 3, task: 'Approve Pending Drafts', due: 'Today', prio: 'Medium', completed: false },
    { id: 4, task: 'Team Sync: Project Delta', due: 'In 2h', prio: 'High', completed: false }
  ]);
  const [taskViewMode, setTaskViewMode] = useState<'compact' | 'list'>('compact');
  const [newTaskName, setNewTaskName] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    const task = tasks.find(t => t.id === id);
    if (task) {
      triggerAction(task.completed ? 'Task Unchecked' : 'Task Completed', `${task.task} status updated.`, task.completed ? 'info' : 'success');
    }
  };

  const addTask = () => {
    if (!newTaskName.trim()) return;
    const newTask = {
      id: Date.now(),
      task: newTaskName,
      due: 'Today',
      prio: 'Medium',
      completed: false
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTaskName('');
    setIsAddingTask(false);
    triggerAction('Task Created', `"${newTaskName}" added to your priority list.`, 'success');
  };

  const data = professionSpecificData[profession as keyof typeof professionSpecificData] || professionSpecificData.Journalism;
  const actions = roleSpecificActions[role as keyof typeof roleSpecificActions] || roleSpecificActions.Associate;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">{profession} Workspace</span>
            <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest">{role} Access</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mb-1 tracking-tight">{role} Dashboard</h1>
          <p className="text-text-secondary">Welcome back. Your {workspaceType === 'individual' ? 'Personal' : orgName} workspace has 3 new AI insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-background-alt rounded-xl border border-border-main">
            <button
              onClick={() => { setWorkspaceType('individual'); triggerAction('Workspace Type Change', 'Switched to Individual workspace.', 'info'); }}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                workspaceType === 'individual' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
              )}
            >
              Individual
            </button>
            <button
              onClick={() => { setWorkspaceType('team'); triggerAction('Workspace Type Change', 'Switched to Team workspace.', 'info'); }}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                workspaceType === 'team' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
              )}
            >
              Team
            </button>
          </div>
        </div>
      </header>

      {/* Role-Specific Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {data.metrics.map((metric: { label: string; value: string; trend: string }, i: number) => (
          <div key={i} className="card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">{metric.label}</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-text-primary">{metric.value}</span>
              <span className="text-[10px] font-bold text-status-success mb-1">{metric.trend}</span>
            </div>
          </div>
        ))}
        <div className="card p-6 flex flex-col justify-between">
          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Active Role</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-text-primary">{role}</span>
            <button onClick={() => triggerAction('Role Settings', 'Opened role settings.', 'info')} className="text-[10px] font-bold text-secondary uppercase hover:underline">Settings</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Workflow & Projects */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Role Actions */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {actions.map(action => (
              <button
                key={action}
                onClick={() => triggerAction('Quick Action', `Initializing "${action}" process.`, 'info')}
                className="whitespace-nowrap px-4 py-2 bg-white border border-border-main rounded-xl text-xs font-bold text-text-secondary hover:border-primary hover:text-primary transition-all"
              >
                {action}
              </button>
            ))}
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-serif font-semibold text-text-primary flex items-center gap-2">
                <span>{data.icon}</span> {profession} Workflow
              </h2>
              <div className="hidden md:flex gap-1">
                {data.pipeline.map((step: string, idx: number) => (
                  <div key={step} className="flex items-center gap-1">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap",
                      idx === data.activeStep ? "bg-primary text-white" :
                        "bg-background-alt text-text-muted"
                    )}>
                      {step}
                    </span>
                    {idx < data.pipeline.length - 1 && <span className="text-text-muted text-[10px]">→</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {data.projects.map((project: { title: string; status: string; info: string }, i: number) => (
                <div key={i} onClick={() => { onOpenProject(); triggerAction('Open Project', `Opened project: "${project.title}".`, 'info'); }} className="flex items-center justify-between p-4 rounded-2xl hover:bg-background-alt transition-all cursor-pointer border border-transparent hover:border-border-main group">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-xl",
                      i === 0 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                    )}>
                      {i === 0 ? <BookOpen size={20} /> : <Briefcase size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">{project.title}</p>
                      <p className="text-xs text-text-muted">{project.status} • {project.info}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); onOpenProject(); triggerAction('Edit Project', `Editing project: "${project.title}".`, 'info'); }} className="p-2 hover:bg-white rounded-lg transition-colors"><PenTool size={16} /></button>
                    <button onClick={(e) => { e.stopPropagation(); onOpenProject(); triggerAction('Open Project Button', `Opened project: "${project.title}".`, 'info'); }} className="text-[10px] font-bold text-primary uppercase tracking-widest px-3 py-1.5 rounded-lg bg-primary/10">Open Project</button>
                  </div>
                </div>
              ))}
              <button onClick={() => { onOpenProject(); triggerAction('Create New Project', `Initiated creation of a new ${profession} project.`, 'info'); }} className="w-full py-3 rounded-2xl border-2 border-dashed border-border-main text-text-muted text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                + Create New {profession} Project
              </button>
            </div>
          </div>
        </div>

        {/* Side Panels */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card p-6 border-l-4 border-l-secondary">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif font-semibold text-text-primary flex items-center gap-2">
                <span className="text-secondary"><CheckCircle2 size={20} /></span> Priority Tasks
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex p-1 bg-background-alt rounded-lg border border-border-main">
                  <button 
                    onClick={() => setTaskViewMode('compact')}
                    className={cn(
                      "p-1.5 rounded transition-all",
                      taskViewMode === 'compact' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                    )}
                  >
                    <Layout size={14} />
                  </button>
                  <button 
                    onClick={() => setTaskViewMode('list')}
                    className={cn(
                      "p-1.5 rounded transition-all",
                      taskViewMode === 'list' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
                    )}
                  >
                    <List size={14} />
                  </button>
                </div>
                <button 
                  onClick={() => setIsAddingTask(!isAddingTask)}
                  className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
                >
                  {isAddingTask ? 'Cancel' : '+ Add'}
                </button>
              </div>
            </div>
            
            {isAddingTask && (
              <div className="mb-4 flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <input 
                  autoFocus
                  type="text" 
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  placeholder="New priority task..." 
                  className="flex-1 bg-white border border-border-main rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors font-medium shadow-inner"
                />
                <button 
                  onClick={addTask}
                  className="bg-primary text-white p-2 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}

            {taskViewMode === 'compact' ? (
              <div className="space-y-4">
                {tasks.map((t) => (
                  <div 
                    key={t.id} 
                    onClick={() => toggleTask(t.id)} 
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-2xl transition-all cursor-pointer group",
                      t.completed ? "bg-background-alt/30 opacity-60" : "hover:bg-background-alt border border-transparent hover:border-border-main bg-white"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-lg border-2 mt-0.5 flex items-center justify-center transition-all shrink-0",
                      t.completed 
                        ? "bg-status-success border-status-success text-white" 
                        : t.prio === 'High' 
                          ? "border-status-error group-hover:bg-status-error/10" 
                          : "border-border-main group-hover:border-secondary"
                    )}>
                      {t.completed && <CheckCircle2 size={12} />}
                    </div>
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm font-bold text-text-primary leading-tight transition-all",
                        t.completed ? "line-through text-text-muted" : "group-hover:text-primary"
                      )}>{t.task}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest",
                          t.completed ? "text-text-muted" : t.prio === 'High' ? "text-status-error" : "text-text-muted"
                        )}>Due {t.due}</span>
                        <span className="text-[10px] text-text-muted">•</span>
                        <span className="text-[10px] text-text-muted font-medium">{t.prio} Priority</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-background-alt/30 rounded-xl overflow-hidden border border-border-main divide-y divide-border-main">
                {tasks.map((t) => (
                  <div 
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className={cn(
                      "flex items-center justify-between p-3 bg-white hover:bg-background-alt/50 transition-colors cursor-pointer group",
                      t.completed && "opacity-60 grayscale-[0.5]"
                    )}
                  >
                    <div className="flex items-center gap-2 overflow-hidden px-1">
                      <div className={cn(
                        "w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                        t.completed ? "bg-status-success border-status-success text-white" : "border-text-muted group-hover:border-primary"
                      )}>
                        {t.completed && <CheckCircle2 size={10} />}
                      </div>
                      <span className={cn(
                        "text-[11px] truncate", 
                        t.completed ? "text-text-muted line-through" : "text-text-primary font-bold"
                      )}>
                        {t.task}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={cn(
                        "text-[8px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded",
                        t.prio === 'High' ? "bg-status-error/10 text-status-error" : "bg-background-alt text-text-muted"
                      )}>
                        {t.prio[0]}
                      </span>
                      <span className="text-[9px] text-text-muted font-medium whitespace-nowrap">{t.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => { onOpenTasks(); triggerAction('Open Task Board', 'Opened the task board.', 'info'); }} className="w-full mt-6 text-xs font-bold text-text-muted uppercase tracking-widest hover:text-primary transition-colors">Open Task Board</button>
          </div>

          <div className="card p-6 bg-ai-gradient text-white relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs text-white"><Lightbulb size={12} /></div>
                <h2 className="text-xl font-serif font-semibold">AI Intelligence</h2>
              </div>
              <p className="text-xs text-white/90 leading-relaxed mb-6">
                I've detected a significant correlation between your current {profession} research and the "Market Trends" project. Should I generate a cross-project summary?
              </p>
              <div className="flex gap-2">
                <button onClick={() => { onOpenAI(); triggerAction('Generate AI Summary', 'Generating cross-project AI summary.', 'success'); }} className="flex-1 bg-white text-primary px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-background-main transition-all">Generate</button>
                <button onClick={() => { onOpenAI(); triggerAction('Ignore AI Suggestion', 'Ignored AI cross-project summary suggestion.', 'warning'); }} className="flex-1 bg-white/20 border border-white/30 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/30 transition-all">Ignore</button>
              </div>
            </div>
          </div>

          <div onClick={() => { onOpenTeam(); triggerAction('Open Team Activity', 'Opened team activity panel.', 'info'); }} className="card p-5 bg-background-alt/30 border border-dashed border-border-main cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-lg group-hover:bg-secondary group-hover:text-white transition-all">
                <Briefcase size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-text-primary">Team Activity</p>
                <p className="text-[10px] text-text-muted truncate">Sarah: "Draft for project Alpha is ready for review..."</p>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-background-alt flex items-center justify-center text-[8px] font-bold">U{i}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
