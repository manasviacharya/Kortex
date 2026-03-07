import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SignupPageProps {
  onSignup: () => void;
  onGoToLogin: () => void;
  onGoBack: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onGoToLogin, onGoBack }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <div className="min-h-screen bg-background-alt flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-32 -mt-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -mr-32 -mb-32"></div>
      
      <button 
        onClick={onGoBack}
        className="absolute top-8 left-8 text-text-muted hover:text-primary transition-colors text-sm font-bold flex items-center gap-2 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-ai-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">K</div>
            <span className="text-3xl font-bold text-text-primary tracking-tight">Kortex</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Create Workspace</h1>
          <p className="text-text-secondary">Join thousands of intelligent teams.</p>
        </div>

        <div className="card p-10 shadow-2xl bg-white border-border-main/50">
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onSignup(); }}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Full Name</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-background-alt border border-border-main rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Work Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                className="w-full bg-background-alt border border-border-main rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full bg-background-alt border border-border-main rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
                minLength={8}
              />
            </div>

            <div className="flex items-start gap-3 px-1 py-2">
              <input 
                type="checkbox" 
                id="terms" 
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 accent-primary h-4 w-4 rounded border-border-main"
                required
              />
              <label htmlFor="terms" className="text-xs text-text-secondary leading-normal">
                I agree to the <button type="button" className="text-primary font-bold hover:underline">Terms of Service</button> and <button type="button" className="text-primary font-bold hover:underline">Privacy Policy</button>.
              </label>
            </div>

            <button 
              type="submit"
              disabled={!agreeTerms}
              className="btn-primary w-full py-4 text-sm font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border-main text-center">
            <p className="text-sm text-text-secondary">
              Already have an account? <button onClick={onGoToLogin} className="text-primary font-bold hover:underline">Log In</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
