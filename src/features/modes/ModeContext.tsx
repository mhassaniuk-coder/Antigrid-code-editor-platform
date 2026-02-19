import React, { createContext, useContext, useState } from 'react';

type Mode = 'standard' | 'solo';

interface ModeContextType {
    mode: Mode;
    toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<Mode>('standard');

    const toggleMode = () => {
        setMode(prev => prev === 'standard' ? 'solo' : 'standard');
    };

    return (
        <ModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ModeContext.Provider>
    );
};

export const useMode = () => {
    const context = useContext(ModeContext);
    if (!context) throw new Error('useMode must be used within a ModeProvider');
    return context;
};
