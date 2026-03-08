import React, { useState } from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';
import { useAction } from '../../context/ActionContext';
import { cn } from '../../utils/cn';
import { 
  Layout, List, Plus, CheckCircle2, Circle, 
  Clock, User, Tag, MoreVertical 
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  assignees: string[];
  priority: 'High' | 'Medium' | 'Low';
  date: string;
  status: string;
  completed: boolean;
}

interface WorkspaceViewProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
}

export const TaskBoard: React.FC<WorkspaceViewProps> = ({ profession, orgName, workspaceType }) => {
  const { triggerAction } = useAction();
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Initial Data based on profession
  const getInitialTasks = (prof: Profession): Task[] => {
    if (prof === 'Academic Research') {
      return [
        { id: '1', title: 'Cognitive Load Thesis', assignees: ['RS'], priority: 'High', date: 'Oct 12', status: 'Idea', completed: false },
        { id: '2', title: 'Neuroplasticity grant prop.', assignees: ['JD'], priority: 'Medium', date: 'Oct 15', status: 'Idea', completed: false },
        { id: '3', title: 'Analyze Smith 2021 Data', assignees: ['JD'], priority: 'High', date: 'Oct 18', status: 'Literature Review', completed: false },
        { id: '4', title: 'Synthesize REM sleep findings', assignees: ['RS'], priority: 'Low', date: 'Oct 20', status: 'Literature Review', completed: false },
        { id: '5', title: 'Run Cohort B Trials', assignees: ['RS', 'AK'], priority: 'High', date: 'Nov 01', status: 'Experiment/Study', completed: false },
        { id: '6', title: 'Write Methods Section', assignees: ['JD'], priority: 'High', date: 'Nov 15', status: 'Draft Paper', completed: false }
      ];
    }
    // Default fallback tasks
    return [
      { id: '101', title: 'Initial Project Sync', assignees: ['Admin'], priority: 'High', date: 'Today', status: 'Todo', completed: false },
      { id: '102', title: 'Review System Requirements', assignees: ['Admin'], priority: 'Medium', date: 'Tomorrow', status: 'Todo', completed: false },
      { id: '103', title: 'Data Migration Pass', assignees: ['Tech'], priority: 'High', date: 'Today', status: 'In Progress', completed: false }
    ];
  };

  const [tasks, setTasks] = useState<Task[]>(getInitialTasks(profession));

  const columns = profession === 'Academic Research' 
    ? ['Idea', 'Literature Review', 'Experiment/Study', 'Draft Paper', 'Peer Review', 'Submission']
    : ['Todo', 'In Progress', 'In Review', 'Completed'];

  const addTask = (status: string = columns[0]) => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTaskTitle,
      assignees: ['You'],
      priority: 'Medium',
      date: 'Soon',
      status: status,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setShowAddModal(false);
    triggerAction('Add Task', `New task "${newTaskTitle}" added.`, 'success');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    const task = tasks.find(t => t.id === id);
    if (task) {
      triggerAction(
        task.completed ? 'Task Unchecked' : 'Task Completed', 
        `"${task.title}" updated.`, 
        task.completed ? 'info' : 'success'
      );
    }
  };

  const renderBoardView = () => (
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide min-h-[600px]">
      {columns.map((column) => (
        <div key={column} className="w-80 shrink-0 flex flex-col border-r border-border-main last:border-0 pr-6">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-border-main">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-secondary">{column}</h3>
              <span className="text-[10px] bg-background-alt px-2 py-0.5 rounded-full text-text-muted font-bold">
                {tasks.filter(t => t.status === column).length}
              </span>
            </div>
            <button 
              onClick={() => { setShowAddModal(true); triggerAction('New Task', `Adding task to ${column}`, 'info'); }}
              className="text-text-muted hover:text-primary transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {tasks.filter(t => t.status === column).map(task => (
              <div 
                key={task.id} 
                className={cn(
                  "card p-4 border border-border-main bg-white transition-all group relative",
                  task.completed ? "opacity-60 grayscale-[0.5]" : "hover:border-primary/50 hover:shadow-md"
                )}
              >
                <div className="flex items-start gap-3 mb-3">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={cn(
                      "mt-0.5 shrink-0 transition-colors",
                      task.completed ? "text-status-success" : "text-text-muted hover:text-primary"
                    )}
                  >
                    {task.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </button>
                  <p className={cn(
                    "text-sm font-bold text-secondary leading-tight transition-all",
                    task.completed && "line-through text-text-muted"
                  )}>
                    {task.title}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1 text-text-muted"><User size={10} /> {task.assignees.join(', ')}</span>
                    <span className={cn(
                      "font-bold px-1.5 py-0.5 rounded-sm",
                      task.priority === 'High' ? "text-status-error bg-status-error/5" : 
                      task.priority === 'Medium' ? "text-status-warning bg-status-warning/5" : "text-text-muted bg-background-alt"
                    )}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] pt-2 border-t border-border-main">
                    <span className="flex items-center gap-1 text-text-muted"><Clock size={10} /> {task.date}</span>
                    <button className="text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">Details</button>
                  </div>
                </div>
              </div>
            ))}
            {tasks.filter(t => t.status === column).length === 0 && (
              <div className="py-12 flex flex-col items-center justify-center text-center opacity-40 border border-dashed border-border-main rounded-xl">
                <Tag size={24} className="mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest">No Tasks</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="bg-white border border-border-main rounded-2xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-background-alt border-b border-border-main">
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted w-12"></th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Task Name</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Status</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Assignees</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Priority</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Due Date</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-main">
          {tasks.map(task => (
            <tr key={task.id} className={cn(
              "hover:bg-background-alt/30 transition-colors group",
              task.completed && "opacity-60"
            )}>
              <td className="px-6 py-4">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "transition-colors",
                    task.completed ? "text-status-success" : "text-text-muted hover:text-primary"
                  )}
                >
                  {task.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </button>
              </td>
              <td className="px-6 py-4">
                <p className={cn(
                  "text-sm font-bold text-secondary",
                  task.completed && "line-through text-text-muted"
                )}>{task.title}</p>
              </td>
              <td className="px-6 py-4 text-xs font-medium text-text-secondary">
                <span className="px-2 py-1 rounded bg-background-alt border border-border-main">
                  {task.status}
                </span>
              </td>
              <td className="px-6 py-4 text-xs font-medium text-text-secondary">
                <div className="flex -space-x-2">
                  {task.assignees.map(a => (
                    <div key={a} className="w-6 h-6 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center text-[8px] font-bold text-primary" title={a}>
                      {a}
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded",
                  task.priority === 'High' ? "bg-status-error/10 text-status-error" : 
                  task.priority === 'Medium' ? "bg-status-warning/10 text-status-warning" : "bg-background-alt text-text-muted"
                )}>
                  {task.priority}
                </span>
              </td>
              <td className="px-6 py-4 text-xs text-text-muted font-medium">
                {task.date}
              </td>
              <td className="px-6 py-4">
                <button className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-secondary mb-1 tracking-tight">
            {workspaceType === 'individual' ? 'Personal Tasks' : 'Project Board'}
          </h1>
          <p className="text-text-secondary">Managing {orgName}'s {profession} pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-background-alt rounded-xl border border-border-main">
            <button 
              onClick={() => setViewMode('board')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'board' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
              )}
            >
              <Layout size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'list' ? "bg-white text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
              )}
            >
              <List size={18} />
            </button>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <Plus size={18} /> New Task
          </button>
        </div>
      </header>

      {/* Add Task Modal / Inline input */}
      {showAddModal && (
        <div className="bg-background-alt/50 border border-border-main p-4 rounded-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-4">
            <input 
              autoFocus
              type="text" 
              placeholder="What needs to be done?" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              className="flex-1 bg-white border border-border-main rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors font-medium shadow-inner"
            />
            <button 
              onClick={() => addTask()}
              className="bg-secondary text-white px-6 py-3 rounded-xl text-sm font-bold"
            >
              Add
            </button>
            <button 
              onClick={() => setShowAddModal(false)}
              className="text-text-muted font-bold text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {viewMode === 'board' ? renderBoardView() : renderListView()}
    </div>
  );
};
