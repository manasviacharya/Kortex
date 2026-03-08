import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Newspaper, Scale, BookOpen, PenTool, GraduationCap, Briefcase, Video, ArrowRight, CheckCircle2 } from 'lucide-react';
import { type Profession, type Role } from '../../types';

interface OnboardingProps {
  onComplete: (data: { profession: Profession; role: Role; orgName: string }) => void;
  userName?: string;
}

const professionsGrid = [
  { id: 'Journalism', icon: <Newspaper size={24} />, roles: ['Investigative Reporter', 'Editor', 'Freelancer', 'News Anchor'] },
  { id: 'Academic Research', icon: <BookOpen size={24} />, roles: ['Professor', 'Researcher', 'PhD Candidate'] },
  { id: 'Writer', icon: <PenTool size={24} />, roles: ['Novelist', 'Screenwriter', 'Copywriter'] },
  { id: 'Legal', icon: <Scale size={24} />, roles: ['Attorney', 'Legal Assistant', 'Partner'] },
  { id: 'Debate/MUN', icon: <GraduationCap size={24} />, roles: ['Delegate', 'Chair', 'Coach'] },
  { id: 'Consulting', icon: <Briefcase size={24} />, roles: ['Partner', 'Manager', 'Analyst'] },
  { id: 'Media Production', icon: <Video size={24} />, roles: ['Director', 'Producer', 'Editor'] },
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, userName }) => {
  const [step, setStep] = useState(1);
  const [orgName, setOrgName] = useState('');
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const professionData = professionsGrid.find(p => p.id === selectedProfession);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-background-alt flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <AnimatePresence mode="wait">
          {/* STEP 1: Organization Name */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="card p-12 shadow-2xl border border-border-main bg-white rounded-3xl"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8">
                <Building2 size={32} />
              </div>
              <h2 className="text-4xl font-bold text-[#112A46] mb-2 tracking-tight">
                {userName ? `Welcome, ${userName.split(' ')[0]}!` : 'Create your Organization'}
              </h2>
              <p className="text-text-secondary mb-10 text-lg">What is the name of your company or team?</p>

              <div className="mb-10">
                <label className="block text-sm font-bold text-text-primary mb-3">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Acme Corp, The Daily News, Alpha Research"
                  className="w-full bg-background-alt border border-border-main rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  autoFocus
                />
              </div>

              <button
                disabled={!orgName.trim()}
                onClick={nextStep}
                className="btn-primary w-full py-4 text-lg font-medium shadow-[0_8px_16px_rgba(244,140,113,0.2)]"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* STEP 2: Profession */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card p-12 shadow-2xl border border-border-main bg-white rounded-3xl"
            >
              <div className="text-center mb-10 relative">
                <h2 className="text-3xl font-bold text-[#112A46] mb-4">Select your Profession</h2>
                <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
                  Kortex will customize your workspace for <span className="font-bold text-text-primary">{orgName}</span> based on your industry.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {professionsGrid.map((prof) => {
                  const isActive = selectedProfession === prof.id;
                  return (
                    <motion.button
                      key={prof.id}
                      onClick={() => setSelectedProfession(prof.id)}
                      whileHover={{ scale: 1.02 }}
                      className={`relative flex flex-col items-center justify-center p-6 border rounded-2xl transition-all
                        ${isActive ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'border-border-main bg-white text-text-secondary hover:border-primary/50'}`}
                    >
                      <div className="mb-3">{prof.icon}</div>
                      <span className="text-xs font-bold text-center tracking-wide">{prof.id}</span>
                      {isActive && <div className="absolute top-3 right-3"><CheckCircle2 size={16} /></div>}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center">
                <button onClick={prevStep} className="text-text-muted hover:text-[#112A46] font-medium text-sm transition-colors">← Back</button>
                <button
                  disabled={!selectedProfession}
                  onClick={nextStep}
                  className="px-12 py-4 text-lg font-medium text-white rounded-2xl disabled:opacity-50 transition-all btn-primary shadow-lg flex items-center gap-2"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Role Selection */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card p-12 shadow-2xl border border-border-main bg-white rounded-3xl"
            >
              <div className="text-center mb-10 relative">
                <h2 className="text-3xl font-bold text-[#112A46] mb-4">What is your Role?</h2>
                <p className="text-text-secondary max-w-md mx-auto leading-relaxed">
                  Tailor your <span className="font-bold text-primary">{selectedProfession}</span> workspace for <span className="font-bold text-text-primary">{orgName}</span>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-xl mx-auto">
                {professionData?.roles.map((role) => {
                  const isActive = selectedRole === role;
                  return (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`flex items-center justify-between p-4 border rounded-2xl transition-all font-bold text-sm
                        ${isActive ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'bg-white border-border-main text-text-secondary hover:border-primary/50'}`}
                    >
                      {role}
                      {isActive && <CheckCircle2 size={16} />}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center">
                <button onClick={prevStep} className="text-text-muted hover:text-[#112A46] font-medium text-sm transition-colors">← Back</button>
                <button
                  disabled={!selectedRole}
                  onClick={() => onComplete({
                    profession: selectedProfession as Profession,
                    role: selectedRole as Role,
                    orgName: orgName.trim()
                  })}
                  className="px-12 py-4 text-lg font-medium text-white rounded-2xl disabled:opacity-50 transition-all btn-primary shadow-lg flex items-center gap-2"
                >
                  Enter Workspace <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

