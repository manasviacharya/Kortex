import React from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';

interface WorkspaceViewProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
}

export const TaskBoard: React.FC<WorkspaceViewProps> = ({ profession, role, orgName, workspaceType }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">
            {workspaceType === 'individual' ? 'My Tasks' : 'Task Board'}
          </h1>
          <p className="text-text-secondary">Manage {workspaceType === 'individual' ? 'your' : orgName + "'s"} {profession} workflow.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 bg-white border border-border-main rounded-xl text-sm font-medium hover:bg-background-alt transition-colors">Board View</button>
           <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">+ Add Task</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Todo', color: 'bg-primary/10 text-primary', tasks: ['Review Evidence', 'Drafting Intro', 'Stakeholder Sync'] },
          { title: 'In Progress', color: 'bg-secondary/10 text-secondary', tasks: ['Market Analysis', 'Client Feedback Map'] },
          { title: 'Completed', color: 'bg-status-success/10 text-status-success', tasks: ['Project Alpha Prep', 'Initial Research', 'Internal Audit'] }
        ].map(column => (
          <div key={column.title} className="space-y-6">
            <div className="flex items-center justify-between mb-4">
               <h3 className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${column.color}`}>{column.title}</h3>
               <span className="text-[10px] text-text-muted font-bold">{column.tasks.length} tasks</span>
            </div>
            <div className="space-y-4">
               {column.tasks.map((task, i) => (
                 <div key={i} className="card p-6 border-border-main hover:bg-background-alt transition-all cursor-pointer group">
                    <p className="text-sm font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">{task}</p>
                    <div className="flex items-center justify-between mt-4">
                       <div className="flex -space-x-2">
                          {[1, 2].map(u => (
                            <div key={u} className="w-5 h-5 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-[8px] font-bold">U{u}</div>
                          ))}
                       </div>
                       <span className="text-[10px] text-text-muted">Due 2d</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
