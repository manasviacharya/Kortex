export type Profession = 
  | 'Journalism' 
  | 'Legal' 
  | 'Academic Research' 
  | 'Writer' 
  | 'Startup' 
  | 'Consulting' 
  | 'Media Production'
  | 'Debate/MUN';

export type Role = 
  | 'Lead' 
  | 'Editor' 
  | 'Reviewer' 
  | 'Associate' 
  | 'Publisher' 
  | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  profession: Profession;
  role: Role;
  avatar?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  profession: Profession;
}

export interface Workspace {
  id: string;
  name: string;
  type: 'individual' | 'team';
  profession: Profession;
}

export type WorkspaceType = 'individual' | 'team';
