import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    color: string;
    cursor: { lineNumber: number; column: number } | null;
}

interface CollaborationContextType {
    users: User[];
    connected: boolean;
    toggleConnection: () => void;
}

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined);

const MOCK_USERS = [
    { id: '1', name: 'Sarah', color: '#ff0000', cursor: { lineNumber: 1, column: 1 } },
    { id: '2', name: 'Mike', color: '#00ff00', cursor: { lineNumber: 5, column: 10 } },
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

    // Simulate cursor movement
    useEffect(() => {
        if (!connected) return;

        const interval = setInterval(() => {
            setUsers(prev => prev.map(u => ({
                ...u,
                cursor: {
                    lineNumber: Math.max(1, (u.cursor?.lineNumber || 1) + (Math.random() > 0.5 ? 1 : -1)),
                    column: Math.max(1, (u.cursor?.column || 1) + (Math.random() > 0.5 ? 2 : -2)),
                }
            })));
        }, 2000);

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
