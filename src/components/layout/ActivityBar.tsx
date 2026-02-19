import React from 'react';
import { Files, Search, GitBranch, Bug, Puzzle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useMode } from '../../features/modes/ModeContext';

interface ActivityBarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ activeView, onViewChange }) => {
    const { toggleMode } = useMode();
    const items = [
        { id: 'explorer', icon: <Files size={24} />, label: 'Explorer' },
        { id: 'search', icon: <Search size={24} />, label: 'Search' },
        { id: 'git', icon: <GitBranch size={24} />, label: 'Source Control' },
        { id: 'debug', icon: <Bug size={24} />, label: 'Run and Debug' },
        { id: 'extensions', icon: <Puzzle size={24} />, label: 'Extensions' },
        { id: 'mode', icon: <div className="font-bold text-xs border border-current rounded px-0.5">M</div>, label: 'Toggle Mode', action: toggleMode },
    ];

    return (
        <div className="w-12 h-full glass-panel border-r-0 border-t-0 flex flex-col items-center py-3 z-20">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => item.action ? item.action() : onViewChange(item.id)}
                    className={cn(
                        "p-2.5 mb-2 rounded-xl transition-all relative group",
                        activeView === item.id
                            ? "text-[var(--text-primary)] bg-[var(--bg-hover)] shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                            : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--glass-shine)]"
                    )}
                    title={item.label}
                >
                    {item.icon}
                    {activeView === item.id && (
                        <div className="absolute left-0 top-2 bottom-2 w-1 bg-[var(--accent-primary)] rounded-r-full" />
                    )}
                </button>
            ))}
        </div>
    );
};

export default ActivityBar;
