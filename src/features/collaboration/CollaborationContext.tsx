import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    color: string;
    cursor: { lineNumber: number; column: number } | null;
    currentFile: string | null;
}

interface CollaborationContextType {
    users: User[];
    connected: boolean;
    toggleConnection: () => void;
}

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined);

const MOCK_FILES = ['main.tsx', 'App.tsx', 'index.css', 'package.json'];

const MOCK_USERS: User[] = [
    { id: '1', name: 'Sarah', color: '#ff0000', cursor: { lineNumber: 1, column: 1 }, currentFile: 'App.tsx' },
    { id: '2', name: 'Mike', color: '#00ff00', cursor: { lineNumber: 5, column: 10 }, currentFile: 'main.tsx' },
    { id: '3', name: 'AI Bot', color: '#6366f1', cursor: { lineNumber: 10, column: 5 }, currentFile: 'App.tsx' },
];

export const CollaborationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    const toggleConnection = () => {
        if (connected) {
            setConnected(false);
            setUsers([]);
        } else {
            setConnected(true);
            setUsers(MOCK_USERS);
        }
    };

    // Simulate cursor movement and file switching
    useEffect(() => {
        if (!connected) return;

        const interval = setInterval(() => {
            setUsers(prev => prev.map(u => {
                // 10% chance to switch file
                const shouldSwitch = Math.random() < 0.1;
                const newFile = shouldSwitch
                    ? MOCK_FILES[Math.floor(Math.random() * MOCK_FILES.length)]
                    : u.currentFile;

                return {
                    ...u,
                    currentFile: newFile,
                    cursor: {
                        lineNumber: Math.max(1, (u.cursor?.lineNumber || 1) + (Math.random() > 0.5 ? 1 : -1)),
                        column: Math.max(1, (u.cursor?.column || 1) + (Math.random() > 0.5 ? 2 : -2)),
                    }
                };
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, [connected]);

    return (
        <CollaborationContext.Provider value={{ users, connected, toggleConnection }}>
            {children}
        </CollaborationContext.Provider>
    );
};

export const useCollaboration = () => {
    const context = useContext(CollaborationContext);
    if (!context) throw new Error('useCollaboration must be used within a CollaborationProvider');
    return context;
};
