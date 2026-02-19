import React from 'react';
import { Bell, GitBranch, Radio, Check, XCircle, AlertTriangle } from 'lucide-react';

import { useCollaboration } from '../../features/collaboration/CollaborationContext';
import { cn } from '../../lib/utils';

const StatusBar: React.FC = () => {
    const { connected, toggleConnection, users } = useCollaboration();

    return (
        <div className="h-6 bg-[var(--accent-primary)]/10 backdrop-blur-md border-t border-[var(--accent-primary)]/20 text-[var(--accent-primary)] flex items-center justify-between px-3 text-[11px] font-medium select-none z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                    <GitBranch size={10} />
                    <span>main</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors opacity-70 hover:opacity-100">
                    <div className="flex items-center gap-1"><XCircle size={10} /> 0</div>
                    <div className="flex items-center gap-1"><AlertTriangle size={10} /> 0</div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div
                    className={cn(
                        "flex items-center gap-1.5 cursor-pointer px-2 py-0.5 rounded-full transition-all",
                        connected
                            ? "bg-[var(--status-success)]/20 text-[var(--status-success)] shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                            : "hover:bg-[var(--accent-primary)]/20 hover:text-white"
                    )}
                    onClick={toggleConnection}
                >
                    <Radio size={10} className={cn(connected && "animate-pulse")} />
                    <span>{connected ? `Live (${users.length})` : 'Go Live'}</span>
                </div>
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors opacity-70">
                    <Check size={10} />
                    <span>Prettier</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                    <Bell size={10} />
                </div>
            </div>
        </div>
    );
};

export default StatusBar;
