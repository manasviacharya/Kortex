import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Profession, type Role } from '../../types';

interface OnboardingProps {
  onComplete: (data: { profession: Profession; role: Role; orgName: string }) => void;
}

const professions: { name: Profession; icon: string; description: string }[] = [
  { name: 'Journalism', icon: '📰', description: 'Editorial pipelines and fact-checking' },
  { name: 'Legal', icon: '⚖️', description: 'Case management and brief drafting' },
  { name: 'Academic Research', icon: '🎓', description: 'Citations and paper extraction' },
  { name: 'Writer', icon: '✍️', description: 'Story timelines and character databases' },
  { name: 'Startup', icon: '🚀', description: 'Roadmaps and decision logs' },
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [orgName, setOrgName] = useState('');
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const nextStep = () => setStep(s => s + 1);

  return (
    <div className="min-h-screen bg-background-alt flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="mb-12 flex justify-center gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 w-12 rounded-full transition-colors ${step >= i ? 'bg-primary' : 'bg-border-main'}`}></div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card p-10"
            >
              <h2 className="text-3xl font-bold text-text-primary mb-2">Create your organization</h2>
              <p className="text-text-secondary mb-8">What should we call your collective brain?</p>
              <input 
                type="text" 
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g. Acme Research Lab"
                className="w-full bg-background-alt border border-border-main rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary mb-8"
              />
              <button 
                disabled={!orgName}
                onClick={nextStep}
                className="btn-primary w-full py-4 text-lg disabled:opacity-50"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card p-10"
            >
              <h2 className="text-3xl font-bold text-text-primary mb-2">Select your profession</h2>
              <p className="text-text-secondary mb-8">Kortex will adapt its interface to your specific needs.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {professions.map(p => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedProfession(p.name)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all text-left ${selectedProfession === p.name ? 'border-primary bg-primary/5' : 'border-border-main hover:border-primary/50'}`}
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <p className="font-bold text-text-primary">{p.name}</p>
                      <p className="text-xs text-text-muted">{p.description}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button 
                disabled={!selectedProfession}
                onClick={nextStep}
                className="btn-primary w-full py-4 text-lg disabled:opacity-50"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card p-10"
            >
              <h2 className="text-3xl font-bold text-text-primary mb-2">Assign your role</h2>
              <p className="text-text-secondary mb-8">How will you be contributing to {orgName}?</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['Lead', 'Editor', 'Reviewer', 'Associate', 'Publisher', 'Admin'].map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRole(r as Role)}
                    className={`p-4 rounded-xl border-2 font-bold transition-all ${selectedRole === r ? 'border-primary bg-primary/5 text-primary' : 'border-border-main text-text-secondary hover:border-primary/50'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <button 
                disabled={!selectedRole}
                onClick={() => onComplete({ 
                  profession: selectedProfession!, 
                  role: selectedRole!, 
                  orgName 
                })}
                className="btn-primary w-full py-4 text-lg disabled:opacity-50"
              >
                Launch Workspace
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
