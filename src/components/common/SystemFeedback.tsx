import React, { useEffect } from 'react';
import { useAction } from '../../context/ActionContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export const SystemFeedback: React.FC = () => {
  const { activeAction, clearAction } = useAction();

  useEffect(() => {
    if (activeAction) {
      const timer = setTimeout(() => {
        clearAction();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeAction, clearAction]);

  if (!activeAction) return null;

  const icons = {
    info: <Info className="text-primary" size={20} />,
    success: <CheckCircle2 className="text-status-success" size={20} />,
    warning: <AlertTriangle className="text-status-warning" size={20} />,
    error: <AlertCircle className="text-status-error" size={20} />,
    ai: <Sparkles className="text-ai" size={20} />,
  };

  const colors = {
    info: 'border-primary/30 bg-white shadow-xl shadow-primary/5',
    success: 'border-status-success/30 bg-white shadow-xl shadow-status-success/5',
    warning: 'border-status-warning/30 bg-white shadow-xl shadow-status-warning/5',
    error: 'border-status-error/30 bg-white shadow-xl shadow-status-error/5',
    ai: 'border-ai/30 bg-white shadow-xl shadow-ai/5',
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`pointer-events-auto card p-4 border shadow-2xl flex gap-4 items-start ${colors[activeAction.type]}`}
        >
          <div className="mt-0.5">{icons[activeAction.type]}</div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-text-primary mb-1">{activeAction.name}</h4>
            <p className="text-xs text-text-secondary leading-relaxed">{activeAction.description}</p>
          </div>
          <button 
            onClick={clearAction}
            className="text-text-muted hover:text-text-primary transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
