import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LogoutPageProps {
  onLogoutComplete: () => void;
}

export const LogoutPage: React.FC<LogoutPageProps> = ({ onLogoutComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLogoutComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onLogoutComplete]);

  return (
    <div className="min-h-screen bg-background-main flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-3xl mb-8 mx-auto animate-pulse">👋</div>
        <h1 className="text-4xl font-bold text-text-primary mb-4 tracking-tight">Signing Out...</h1>
        <p className="text-text-secondary mb-10 leading-relaxed">
          Safely securing your intelligent workspace. <br />
          We'll redirect you shortly.
        </p>
        
        <div className="flex justify-center gap-2">
           {[1, 2, 3].map(i => (
             <motion.div 
               key={i}
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
               className="w-2 h-2 bg-primary rounded-full"
             ></motion.div>
           ))}
        </div>
      </motion.div>
    </div>
  );
};
