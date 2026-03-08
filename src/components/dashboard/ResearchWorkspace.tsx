import React from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';
import { 
  Link, Radio, Scale, Library, FolderOpen, Bell, Bookmark, FileText, 
  FlaskConical, Hourglass, User, Lightbulb, Map, Edit3, Rocket, 
  BarChart2, Target, Search, Clapperboard, Video, ScrollText, Upload, Sparkles,
  Database, CheckCircle2, LayoutDashboard, PieChart, Image as ImageIcon
} from 'lucide-react';
import { useAction } from '../../context/ActionContext';

interface WorkspaceViewProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
}

const professionTools = {
  Journalism: [
    { name: 'Source Tracker', icon: <Link size={24} className="text-secondary" />, desc: 'Track and verify source credibility.' },
    { name: 'News Monitor', icon: <Radio size={24} className="text-secondary" />, desc: 'Real-time monitoring of news wires.' },
    { name: 'Fact-Check Engine', icon: <Scale size={24} className="text-secondary" />, desc: 'Validate claims against trusted databases.' }
  ],
  Legal: [
    { name: 'Precedent Search', icon: <Library size={24} className="text-secondary" />, desc: 'Search through legal case history.' },
    { name: 'Evidence Extraction', icon: <FolderOpen size={24} className="text-secondary" />, desc: 'AI-driven evidence classification.' },
    { name: 'Compliance Alerts', icon: <Bell size={24} className="text-secondary" />, desc: 'Monitor regulatory changes.' }
  ],
  'Academic Research': [
    { name: 'Citation Manager', icon: <Bookmark size={24} className="text-secondary" />, desc: 'Organize and format your references.' },
    { name: 'Paper Extraction', icon: <FileText size={24} className="text-secondary" />, desc: 'Extract key data from academic PDFs.' },
    { name: 'Literature Review', icon: <FlaskConical size={24} className="text-secondary" />, desc: 'Map relationships between studies.' }
  ],
  Writer: [
    { name: 'Story Timeline', icon: <Hourglass size={24} className="text-secondary" />, desc: 'Visualize narrative structure.' },
    { name: 'Character DB', icon: <User size={24} className="text-secondary" />, desc: 'Manage character traits and arcs.' },
    { name: 'Idea Board', icon: <Lightbulb size={24} className="text-secondary" />, desc: 'Organize world-building notes.' }
  ],
  Startup: [
    { name: 'Roadmap Builder', icon: <Map size={24} className="text-secondary" />, desc: 'Plan and track product milestones.' },
    { name: 'Decision Log', icon: <Edit3 size={24} className="text-secondary" />, desc: 'Document key pivot points and rationale.' },
    { name: 'Feature Docs', icon: <Rocket size={24} className="text-secondary" />, desc: 'Centralized product documentation.' }
  ],
  Consulting: [
    { name: 'Market Analysis', icon: <BarChart2 size={24} className="text-secondary" />, desc: 'Generate competitor and sector reports.' },
    { name: 'Strategic Insights', icon: <Target size={24} className="text-secondary" />, desc: 'Identify growth opportunities.' },
    { name: 'Discovery Tool', icon: <Search size={24} className="text-secondary" />, desc: 'Client interview and data gathering.' }
  ],
  'Media Production': [
    { name: 'Production Slate', icon: <Clapperboard size={24} className="text-secondary" />, desc: 'Manage shoot schedules and assets.' },
    { name: 'Footage Library', icon: <Video size={24} className="text-secondary" />, desc: 'Index and tag raw media assets.' },
    { name: 'Script Assistant', icon: <ScrollText size={24} className="text-secondary" />, desc: 'AI-powered script analysis.' }
  ]
};

export const ResearchWorkspace: React.FC<WorkspaceViewProps> = ({ profession, orgName, workspaceType }) => {
  const { triggerAction } = useAction();
  const tools = professionTools[profession as keyof typeof professionTools] || professionTools.Journalism;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">{profession} Research Hub</h1>
        <p className="text-text-secondary">
          {workspaceType === 'individual' ? 'Personal' : orgName} AI-powered content analysis for your {profession} projects.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tools.map(tool => (
              <div 
                key={tool.name} 
                onClick={() => triggerAction(tool.name, `Initializing ${tool.name} for current research context...`, 'ai')}
                className="card p-5 hover:border-primary transition-all cursor-pointer group"
              >
                <div className="mb-3 group-hover:scale-110 transition-transform">{tool.icon}</div>
                <h4 className="text-sm font-bold text-text-primary mb-1">{tool.name}</h4>
                <p className="text-[10px] text-text-secondary leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>

          <div className="card p-8 border-2 border-dashed border-border-main bg-background-alt/30 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"><Upload size={32} className="text-primary" /></div>
            <h3 className="text-lg font-bold text-text-primary mb-2">Upload {profession} Material</h3>
            <p className="text-sm text-text-secondary max-w-sm mb-6">Drop PDF, Word, or Markdown files here. Kortex AI will automatically index and extract {profession.toLowerCase()}-specific insights.</p>
            <button onClick={() => triggerAction('File Browser', 'System file browser opened.', 'info')} className="btn-primary">Browse Files</button>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
               <span className="text-secondary"><Search size={20} /></span> Recent Extractions
            </h2>
            <div className="space-y-3">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border-main hover:bg-background-alt transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-ai/10 rounded-lg flex items-center justify-center text-ai"><FileText size={20} /></div>
                       <div>
                          <p className="text-sm font-bold text-text-primary">{profession} Document {i}</p>
                          <p className="text-[10px] text-text-muted">Extracted 24 {profession.toLowerCase()} insights • {i}h ago</p>
                       </div>
                    </div>
                    <button onClick={() => triggerAction('Extraction Details', 'Opening full insight breakdown for this document.', 'info')} className="text-[10px] font-bold text-primary uppercase opacity-0 group-hover:opacity-100 transition-opacity">View Insights</button>
                 </div>
               ))}
            </div>
          </div>

          {/* Legal Module: Evidence Organizer */}
          {profession === 'Legal' && (
             <div className="card p-6 border-2 border-primary/20 bg-primary/5">
               <h2 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                  <FolderOpen size={20} className="text-primary" /> Evidence Management Panel
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {[
                    { cat: 'Documents', count: 42, icon: <FileText size={16}/> },
                    { cat: 'Testimonies', count: 8, icon: <User size={16}/> },
                    { cat: 'Media', count: 12, icon: <Video size={16}/> }
                  ].map(type => (
                     <div key={type.cat} className="flex flex-col p-3 bg-white rounded-lg border border-border-main">
                        <div className="flex items-center justify-between mb-2 text-text-muted">
                           {type.icon}
                           <span className="text-[10px] uppercase font-bold tracking-widest">{type.cat}</span>
                        </div>
                        <span className="text-2xl font-bold text-secondary">{type.count}</span>
                     </div>
                  ))}
               </div>
               <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">Recent Attachments</h3>
                  {[
                    { name: 'Defendant Email Thread', section: 'Motive Section 2.1', type: 'Documents' },
                    { name: 'Surveillance Footage 10-14', section: 'Alibi Defense', type: 'Media' },
                    { name: 'Witness Statement - Smith', section: 'Timeline Event 4', type: 'Testimonies' }
                  ].map((ev, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-white border border-border-main rounded-xl hover:border-primary/40 transition-colors">
                         <div>
                            <p className="text-xs font-bold text-secondary">{ev.name}</p>
                            <p className="text-[10px] text-text-secondary mt-1">Linked to: <span className="text-primary cursor-pointer hover:underline">{ev.section}</span></p>
                         </div>
                         <button 
                           onClick={() => triggerAction('Argument Linked', 'Evidence successfully associated with legal argument.', 'success')}
                           className="text-[10px] font-bold text-text-muted hover:text-primary uppercase tracking-widest transition-colors flex items-center gap-1"
                         >
                            <Link size={12} />
                            Link Argument
                         </button>
                     </div>
                  ))}
               </div>
             </div>
          )}

          {/* Academic Module: Dataset Manager */}
          {profession === 'Academic Research' && (
             <div className="card p-6 border-2 border-primary/20 bg-primary/5 mt-6">
               <h2 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                  <Database size={20} className="text-primary" /> Dataset Manager
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {[
                    { cat: 'Raw Datasets', size: '2.4TB', icon: <Upload size={16}/> },
                    { cat: 'Cleaned', size: '850GB', icon: <CheckCircle2 size={16}/> },
                    { cat: 'Variables', count: 1420, icon: <Search size={16}/> }
                  ].map((type: any) => (
                     <div key={type.cat} className="flex flex-col p-3 bg-white rounded-lg border border-border-main">
                        <div className="flex items-center justify-between mb-2 text-text-muted">
                           {type.icon}
                           <span className="text-[10px] uppercase font-bold tracking-widest">{type.cat}</span>
                        </div>
                        <span className="text-2xl font-bold text-secondary">{type.size || type.count}</span>
                     </div>
                  ))}
               </div>
               <div className="space-y-3 pt-2">
                   <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-secondary uppercase tracking-widest">Active Datasets</h3>
                      <button 
                        onClick={() => triggerAction('Upload Dataset', 'Select your research data (CSV/JSON/XLSX) to begin analysis.', 'ai')}
                        className="text-[10px] font-bold text-white bg-primary px-3 py-1 rounded hover:opacity-90 transition-opacity flex items-center gap-1"
                      >
                         <Upload size={12} /> Upload New
                      </button>
                   </div>
                  {[
                    { name: 'EEG_Sleep_Study_WaveForms_V2.csv', linked: 'Experiment 2.A', rows: '1.2M' },
                    { name: 'Demographic_Survey_Results_Q3.json', linked: 'Methods Section', rows: '450' },
                    { name: 'Control_Group_Baseline_Stats.xlsx', linked: 'Supplemental Data', rows: '12' }
                  ].map((ds, i) => (
                     <div key={i} className="flex flex-col p-3 bg-white border border-border-main rounded-xl hover:border-primary/40 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                           <p className="text-xs font-bold text-secondary truncate">{ds.name}</p>
                           <span className="text-[10px] text-text-muted font-mono bg-background-alt px-1.5 rounded">{ds.rows} rows</span>
                        </div>
                         <div className="flex items-center justify-between mt-2">
                            <p className="text-[10px] text-text-secondary">Linked to: <span className="text-primary cursor-pointer hover:underline font-medium">{ds.linked}</span></p>
                            <button 
                              onClick={() => triggerAction('Data Preview', 'Generating data snapshot for review...', 'ai')}
                              className="text-[10px] font-bold text-text-muted hover:text-primary uppercase tracking-widest transition-colors flex items-center gap-1"
                            >
                               Preview
                            </button>
                         </div>
                     </div>
                  ))}
               </div>
             </div>
          )}

          {/* Writer Module: World Building Workspace & Scene Organizer */}
          {profession === 'Writer' && (
             <div className="card p-6 border-2 border-secondary/20 bg-secondary/5 mt-6">
               <h2 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                  <Library size={20} className="text-secondary" /> World Building & Scenes
               </h2>
               
               {/* World Building Sub-Module */}
               <div className="mb-6">
                 <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Lore Database</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { cat: 'Characters', count: 42, icon: <User size={14}/> },
                      { cat: 'Locations', count: 18, icon: <Map size={14}/> },
                      { cat: 'Magic/Tech', count: 24, icon: <Sparkles size={14}/> },
                      { cat: 'History', count: 11, icon: <Hourglass size={14}/> }
                    ].map((type: any) => (
                       <div key={type.cat} className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-main hover:border-secondary/40 transition-colors cursor-pointer">
                          <div className="flex items-center gap-2 text-text-secondary">
                             {type.icon}
                             <span className="text-xs font-bold">{type.cat}</span>
                          </div>
                          <span className="text-[10px] font-mono text-text-muted bg-background-alt px-1.5 rounded">{type.count}</span>
                       </div>
                    ))}
                 </div>
               </div>

               {/* Scene Organizer Sub-Module */}
               <div>
                   <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold text-secondary uppercase tracking-widest">Scene Organizer (Act 1)</h3>
                      <button 
                        onClick={() => triggerAction('New Scene', 'Blank scene template created in Act 1.', 'success')}
                        className="text-[10px] font-bold text-white bg-secondary px-3 py-1 rounded hover:opacity-90 transition-opacity"
                      >
                         + New Scene
                      </button>
                   </div>
                  <div className="space-y-2">
                     {[
                       { title: 'The Call to Action', pov: 'Elias', status: 'Drafted', location: 'The Lower Wards' },
                       { title: 'Refusal of the Call', pov: 'Elias', status: 'Outlined', location: 'The Neon Market' },
                       { title: 'Meeting the Mentor', pov: 'Kaelen', status: 'Ideation', location: 'The Spire' }
                     ].map((scene, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white border border-border-main rounded-xl hover:border-secondary/40 transition-colors group">
                           <div className="mb-2 sm:mb-0">
                              <p className="text-xs font-bold text-secondary flex items-center gap-2">
                                 <span className="text-text-muted text-[10px] font-mono w-4">{i+1}.</span> 
                                 {scene.title}
                              </p>
                              <div className="flex items-center gap-3 mt-1 text-[10px] text-text-secondary">
                                 <span className="flex items-center gap-1"><User size={10}/> {scene.pov}</span>
                                 <span className="flex items-center gap-1"><Map size={10}/> {scene.location}</span>
                              </div>
                           </div>
                           <div className="flex items-center gap-3">
                              <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                                scene.status === 'Drafted' ? 'bg-status-success/10 text-status-success' : 
                                scene.status === 'Outlined' ? 'bg-primary/10 text-primary' : 
                                'bg-background-alt text-text-muted'
                              }`}>
                                 {scene.status}
                              </span>
                              <button 
                                onClick={() => triggerAction('Edit Scene', 'Opening scene editor...', 'info')}
                                className="text-text-muted hover:text-secondary opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Edit3 size={14}/>
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
             </div>
          )}

          {/* Consulting Module: Data Visualization Panel */}
          {profession === 'Consulting' && (
             <div className="card p-6 border-2 border-primary/20 bg-primary/5 mt-6">
               <h2 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                  <BarChart2 size={20} className="text-primary" /> Data Visualization Panel
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {[
                    { cat: 'Dashboards', count: 12, icon: <LayoutDashboard size={16}/> },
                    { cat: 'Active Datasets', count: 8, icon: <Database size={16}/> },
                    { cat: 'Exported Charts', count: 34, icon: <PieChart size={16}/> }
                  ].map(type => (
                     <div key={type.cat} className="flex flex-col p-3 bg-white rounded-lg border border-border-main">
                        <div className="flex items-center justify-between mb-2 text-text-muted">
                           {type.icon}
                           <span className="text-[10px] uppercase font-bold tracking-widest">{type.cat}</span>
                        </div>
                        <span className="text-2xl font-bold text-secondary">{type.count}</span>
                     </div>
                  ))}
               </div>
               
               <div className="space-y-3 pt-2">
                   <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-secondary uppercase tracking-widest">Recent Visualizations</h3>
                      <button 
                        onClick={() => triggerAction('New Visualization', 'AI visualization builder initialized.', 'ai')}
                        className="text-[10px] font-bold text-white bg-primary px-3 py-1 rounded hover:opacity-90 transition-opacity flex items-center gap-1"
                      >
                         + New Chart
                      </button>
                   </div>
                  {[
                    { title: 'Q3 Market Share vs Competitors', type: 'Pie Chart', dataset: 'Market_Data_2024.csv' },
                    { title: 'YoY Revenue Growth - APAC', type: 'Bar Chart', dataset: 'Financials_APAC.xlsx' },
                    { title: 'Customer Acquisition Cost Trend', type: 'Line Graph', dataset: 'Marketing_Spend_Q1_Q3.csv' }
                  ].map((vis, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-white border border-border-main rounded-xl hover:border-primary/40 transition-colors">
                        <div>
                           <p className="text-xs font-bold text-secondary mb-1">{vis.title}</p>
                           <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                              <span className="bg-background-alt px-1.5 rounded">{vis.type}</span>
                              <span>Source: <span className="text-primary cursor-pointer hover:underline">{vis.dataset}</span></span>
                           </div>
                        </div>
                         <div className="flex gap-2">
                            <button onClick={() => triggerAction('Asset Embedded', 'Strategic visualization linked to your current draft.', 'success')} className="text-[10px] font-bold text-text-muted hover:text-primary uppercase tracking-widest transition-colors">Embed</button>
                            <button onClick={() => triggerAction('Edit Visualization', 'Opening chart designer...', 'info')} className="text-[10px] font-bold text-text-muted hover:text-primary uppercase tracking-widest transition-colors">Edit</button>
                         </div>
                     </div>
                  ))}
               </div>
             </div>
          )}

          {/* Media Production Module: Asset Organizer */}
          {profession === 'Media Production' && (
             <div className="card p-6 border-2 border-secondary/20 bg-secondary/5 mt-6">
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-lg font-bold text-secondary flex items-center gap-2">
                    <ImageIcon size={20} className="text-secondary" /> Asset Organizer
                 </h2>
                 <button 
                    onClick={() => triggerAction('Upload Media', 'File uploader ready for raw media assets.', 'info')}
                    className="text-[10px] font-bold text-white bg-secondary px-3 py-1.5 rounded flex items-center gap-1 hover:opacity-90 transition-opacity"
                  >
                     <Upload size={12}/> Upload Media
                 </button>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="p-3 bg-white rounded-lg border border-border-main text-center cursor-pointer hover:border-secondary transition-colors">
                     <FolderOpen size={18} className="text-text-muted mx-auto mb-1"/>
                     <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Q3 Ad Creatives</p>
                     <p className="text-[9px] text-text-secondary">14 Files</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-border-main text-center cursor-pointer hover:border-secondary transition-colors">
                     <FolderOpen size={18} className="text-text-muted mx-auto mb-1"/>
                     <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest">B-Roll Footage</p>
                     <p className="text-[9px] text-text-secondary">82 Files</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-border-main text-center cursor-pointer hover:border-secondary transition-colors">
                     <FolderOpen size={18} className="text-text-muted mx-auto mb-1"/>
                     <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Voiceovers</p>
                     <p className="text-[9px] text-text-secondary">6 Files</p>
                  </div>
                   <div 
                      onClick={() => triggerAction('New Folder', 'Organization folder created in assets.', 'success')}
                      className="p-3 bg-background-alt border-2 border-dashed border-border-main rounded-lg flex flex-col items-center justify-center text-text-muted cursor-pointer hover:text-secondary hover:border-secondary/50 transition-colors"
                   >
                      <span className="text-lg font-light mb-1">+</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">New Folder</span>
                   </div>
               </div>

               <div className="space-y-3">
                  <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-2 border-b border-border-main pb-1">Unlinked Assets</h3>
                  {[
                    { name: 'Product_Shot_04.raw', size: '24.5 MB', type: 'Image' },
                    { name: 'Interview_A_Cam.mp4', size: '1.2 GB', type: 'Video' }
                  ].map((file, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-white border border-border-main rounded-xl group hover:border-secondary/40 transition-colors">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded bg-background-alt flex items-center justify-center text-text-muted">
                              {file.type === 'Image' ? <ImageIcon size={14}/> : <Video size={14}/>}
                           </div>
                           <div>
                              <p className="text-xs font-bold text-text-primary mb-0.5 group-hover:text-secondary transition-colors">{file.name}</p>
                               <p className="text-[9px] text-text-secondary">{file.size}</p>
                            </div>
                         </div>
                         <button 
                           onClick={() => triggerAction('Asset Attached', 'Media asset successfully linked to your draft context.', 'success')}
                           className="text-[10px] font-bold text-text-muted hover:text-secondary uppercase tracking-widest flex items-center gap-1 transition-colors"
                         >
                            <Link size={10}/> Attach to Draft
                         </button>
                     </div>
                  ))}
               </div>
             </div>
          )}
        </div>

        <div className="md:col-span-4 space-y-6">
           <div className="card p-6 bg-ai-gradient text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 <span className="text-primary"><Sparkles size={20} /></span> AI {profession} Assistant
              </h3>
               <p className="text-xs text-white/80 leading-relaxed mb-6">
                  "I've analyzed your {profession.toLowerCase()} documents and found 3 recurring patterns. Would you like me to create a summary for your draft?"
               </p>
               <button 
                 onClick={() => triggerAction('Summary Generated', 'AI research summary has been compiled and added to your project library.', 'ai')}
                 className="w-full bg-white text-primary py-2 rounded-xl text-xs font-bold uppercase tracking-widest"
               >
                 Generate Summary
               </button>
           </div>
           </div>
        </div>
      </div>
  );
};
