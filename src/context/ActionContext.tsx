import React, { createContext, useContext, useState, type ReactNode } from 'react';

type ActionType = 'info' | 'success' | 'warning' | 'error' | 'ai';

interface Action {
  id: string;
  name: string;
  description: string;
  type: ActionType;
}

interface ActionContextType {
  activeAction: Action | null;
  triggerAction: (name: string, description: string, type?: ActionType) => void;
  clearAction: () => void;
}

const ActionContext = createContext<ActionContextType | undefined>(undefined);

export const ActionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeAction, setActiveAction] = useState<Action | null>(null);

  const triggerAction = (name: string, description: string, type: ActionType = 'info') => {
    setActiveAction({
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      type
    });
  };

  const clearAction = () => setActiveAction(null);

  return (
    <ActionContext.Provider value={{ activeAction, triggerAction, clearAction }}>
      {children}
    </ActionContext.Provider>
  );
};

export const useAction = () => {
  const context = useContext(ActionContext);
  if (context === undefined) {
    throw new Error('useAction must be used within an ActionProvider');
  }
  return context;
};
