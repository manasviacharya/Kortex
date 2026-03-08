import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onLogin: () => void;
  onGoToSignup: () => void;
  onGoBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onGoToSignup, onGoBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-background-alt flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ai/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

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
          <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome Back</h1>
          <p className="text-text-secondary">Log in to your intelligent workspace.</p>
        </div>

        <div className="card p-10 shadow-2xl bg-white border-border-main/50">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter registered email"
                className="w-full bg-background-alt border border-border-main rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Password</label>
                <button type="button" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Forgot?</button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background-alt border border-border-main rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-4 text-sm font-bold shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border-main text-center">
            <p className="text-sm text-text-secondary">
              Don't have a workspace? <button onClick={onGoToSignup} className="text-primary font-bold hover:underline">Sign Up</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
