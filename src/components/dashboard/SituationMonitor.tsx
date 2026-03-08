import React, { useEffect, useRef } from 'react';
import { type Profession, type Role, type WorkspaceType } from '../../types';
import { cn } from '../../utils/cn';
import { useAction } from '../../context/ActionContext';
// @ts-ignore
import Globe from 'globe.gl';

interface SituationMonitorProps {
  profession: Profession;
  role: Role;
  orgName: string;
  workspaceType: WorkspaceType;
}

const events = [
  { lat: 28.6139, lng: 77.2090, severity: 4, title: "New Delhi: Political Update" },
  { lat: 40.7128, lng: -74.0060, severity: 3, title: "New York: Tech Summit" },
  { lat: 35.6895, lng: 139.6917, severity: 5, title: "Tokyo: Seismic Activity Alert" },
  { lat: 51.5074, lng: -0.1278, severity: 2, title: "London: Market Trends" },
  { lat: -33.8688, lng: 151.2093, severity: 1, title: "Sydney: Local News" },
  { lat: 48.8566, lng: 2.3522, severity: 4, title: "Paris: Diplomatic Talks" },
  { lat: -23.5505, lng: -46.6333, severity: 3, title: "Sao Paulo: Infrastructure News" },
  { lat: 55.7558, lng: 37.6173, severity: 5, title: "Moscow: Geopolitical Shift" },
  { lat: 1.3521, lng: 103.8198, severity: 2, title: "Singapore: Logistics Update" },
  { lat: -1.2921, lng: 36.8219, severity: 4, title: "Nairobi: Regional Hub News" }
];

const getColor = (severity: number) => {
  switch(severity) {
    case 5: return '#ff0000';
    case 4: return '#ff7700';
    case 3: return '#ffff00';
    case 2: return '#00ff00';
    case 1: return '#0088ff';
    default: return '#ffffff';
  }
};

export const SituationMonitor: React.FC<SituationMonitorProps> = () => {
  const { triggerAction } = useAction();
  const globeRef = useRef<HTMLDivElement>(null);
  const globeInstance = useRef<any>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    // Initialize Globe
    globeInstance.current = (Globe as any)()(globeRef.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .pointsData(events)
      .pointLat('lat')
      .pointLng('lng')
      .pointColor((d: any) => getColor(d.severity))
      .pointAltitude((d: any) => d.severity * 0.05)
      .pointRadius(0.5)
      .pointLabel((d: any) => `
        <div style="background: rgba(0,0,0,0.85); padding: 8px 12px; border-radius: 8px; border: 1px solid ${getColor(d.severity)}; color: white; font-family: sans-serif; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
          <b style="color: ${getColor(d.severity)}; font-size: 13px;">${d.title}</b><br/>
          <div style="margin-top: 4px; font-size: 11px; opacity: 0.9;">Severity: ${d.severity}/5</div>
        </div>
      `)
      .pointsTransitionDuration(1000)
      .ringsData(events.filter(d => d.severity >= 4))
      .ringColor((d: any) => getColor(d.severity))
      .ringMaxRadius((d: any) => d.severity * 1.5)
      .ringPropagationSpeed(2)
      .ringRepeatPeriod(1000);

    // Auto-rotate
    const controls = globeInstance.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Handle Resize
    const handleResize = () => {
      if (globeRef.current && globeInstance.current) {
        globeInstance.current.width(globeRef.current.clientWidth);
        globeInstance.current.height(globeRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    
    // Set initial size
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (globeInstance.current) {
        globeRef.current?.replaceChildren();
      }
    };
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <header className="flex items-end justify-between flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1 tracking-tight">
            Situation Monitor
          </h1>
          <p className="text-text-secondary">Global news feed, breaking alerts, and 3D visual intelligence.</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
              onClick={() => triggerAction('Monitor Settings', 'Configuring global alert thresholds and geopolitical news filters.', 'info')}
              className="px-4 py-2 bg-white border border-border-main rounded-xl text-sm font-medium hover:bg-background-alt transition-colors"
            >
              Alert Settings
            </button>
            <button 
              onClick={() => triggerAction('Generate Intel', 'Synthesizing global news feed into a comprehensive AI Intelligence Report.', 'ai')}
              className="px-4 py-2 bg-ai-gradient text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              AI Intel Report
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 flex-1 min-h-0">
        
        {/* Visual News Map (Globe) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="card p-0 border-border-main bg-white shadow-sm flex flex-col h-[500px] overflow-hidden relative">
             <div className="absolute top-6 left-6 z-20 pointer-events-none">
               <h3 className="font-bold text-secondary font-serif text-lg">Visual News Map</h3>
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Interactive 3D Perspective</p>
             </div>

             <div className="absolute top-6 right-6 z-20 flex gap-2">
                {['Global', 'Live', 'Hotspots'].map(f => (
                  <button key={f} className="text-[9px] bg-black/60 backdrop-blur-md text-white border border-white/20 px-2 py-1 rounded font-bold uppercase tracking-widest transition-all hover:bg-black/80">{f}</button>
                ))}
             </div>

             {/* Globe Legend */}
             <div className="absolute bottom-6 left-6 z-20 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white pointer-events-none">
                <div className="font-bold mb-3 text-[10px] uppercase tracking-widest opacity-70">Severity Level</div>
                <div className="space-y-2">
                   {[
                     { l: 'Critical', c: '#ff0000' },
                     { l: 'Severe', c: '#ff7700' },
                     { l: 'Moderate', c: '#ffff00' },
                     { l: 'Minor', c: '#00ff00' },
                     { l: 'Noticeable', c: '#0088ff' }
                   ].map(item => (
                     <div key={item.l} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.c }}></div>
                        <span className="text-[10px] font-medium">{item.l}</span>
                     </div>
                   ))}
                </div>
             </div>
             
             {/* Interactive Globe Container */}
             <div ref={globeRef} className="w-full h-full bg-black" />
          </div>

          {/* Topic Spikes & Breaking Alerts */}
          <div className="grid grid-cols-2 gap-6 flex-shrink-0">
             <div className="card p-6">
                <h3 className="text-sm font-bold text-secondary font-serif mb-4 flex items-center justify-between">
                   Topic Spike Detection
                   <span className="w-2 h-2 bg-status-success rounded-full animate-pulse"></span>
                </h3>
                <div className="space-y-3">
                   {[
                     { topic: 'AI Regulation', surge: '+400%', color: 'text-primary' },
                     { topic: 'Climate Tech', surge: '+215%', color: 'text-status-warning' },
                     { topic: 'Local Elections', surge: '+180%', color: 'text-secondary' }
                   ].map(s => (
                     <div key={s.topic} className="flex items-center justify-between p-2 border border-border-main rounded-lg bg-background-alt/50">
                        <span className="text-xs font-bold text-text-primary">{s.topic}</span>
                        <span className={`text-[10px] font-bold tracking-widest ${s.color}`}>{s.surge}</span>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="card p-6 bg-status-error/5 border-status-error/20">
                <h3 className="text-sm font-bold text-status-error font-serif mb-4 flex items-center gap-2">
                   <span>⚠️</span> Breaking Alerts
                </h3>
                <div className="space-y-3">
                   <div className="p-3 bg-white rounded-lg border border-status-error/10 border-l-2 border-l-status-error">
                      <p className="text-xs font-bold text-text-primary mb-1">Major Market Correction</p>
                      <p className="text-[10px] text-text-secondary">Indices drop over 4% in opening hour. Sources cite tech selloff.</p>
                   </div>
                   <div className="p-3 bg-white rounded-lg border border-status-error/10 border-l-2 border-l-status-error">
                      <p className="text-xs font-bold text-text-primary mb-1">Cyberattack Confirmed</p>
                      <p className="text-[10px] text-text-secondary">National grid operator confirms DDOS. Details emerging.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Global News Feed Sidebar */}
        <div className="xl:col-span-4 max-h-full flex flex-col min-h-0">
          <div className="card p-0 border-border-main flex flex-col h-full bg-white shadow-sm overflow-hidden">
             <div className="p-4 border-b border-border-main bg-panel flex-shrink-0">
               <h3 className="font-bold text-secondary font-serif flex items-center justify-between">
                 Live Wire
                 <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Updating</span>
               </h3>
               
               <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                 {['All Domains', 'Politics', 'Econ', 'Tech', 'Environment'].map((f, i) => (
                   <button key={f} className={cn(
                     "text-[9px] px-2 py-1 rounded font-bold uppercase tracking-widest transition-colors whitespace-nowrap",
                     i === 0 ? "bg-primary text-white" : "bg-white border border-border-main text-text-secondary hover:text-primary hover:border-primary/50"
                   )}>{f}</button>
                 ))}
               </div>
             </div>

             <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {[
                   { time: '1m ago', src: 'Reuters', tag: 'Politics', headline: 'Summit concludes with surprise climate accord.' },
                   { time: '5m ago', src: 'Bloomberg', tag: 'Econ', headline: 'Tech shares plummet amidst new regulatory fears.' },
                   { time: '12m ago', src: 'AP', tag: 'World', headline: 'Massive protests erupt in central square.' },
                   { time: '20m ago', src: 'Local', tag: 'City', headline: 'Mayor announces $2B infrastructure overhaul.' },
                   { time: '35m ago', src: 'WSJ', tag: 'Biz', headline: 'Mega-merger abandoned after antitrust review.' },
                   { time: '1h ago', src: 'Reuters', tag: 'Tech', headline: 'New AI chip release delays causing market panic.' },
                   { time: '2h ago', src: 'AP', tag: 'Science', headline: 'Breakthrough in fusion energy containment.' },
                   { time: '3h ago', src: 'Bloomberg', tag: 'Econ', headline: 'Global logistics chain shows signs of recovery.' },
                   { time: '4h ago', src: 'Reuters', tag: 'World', headline: 'International diplomatic mission arrives in Tokyo.' }
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                     <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold text-status-warning tracking-widest uppercase">{item.time}</span>
                        <span className="text-text-muted text-[10px]">•</span>
                        <span className="text-[9px] font-bold text-text-secondary uppercase">{item.src}</span>
                     </div>
                     <p className="text-sm font-medium text-text-primary leading-tight group-hover:text-primary transition-colors">{item.headline}</p>
                     
                     <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] bg-background-alt text-text-muted px-1.5 py-0.5 rounded">{item.tag}</span>
                        <button className="text-[9px] text-primary hover:underline font-bold">Research</button>
                        <button className="text-[9px] text-secondary hover:underline font-bold">Trace</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
