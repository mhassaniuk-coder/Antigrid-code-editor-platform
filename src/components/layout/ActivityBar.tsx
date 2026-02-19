
import React, { useState } from 'react';
import { Files, Search, GitBranch, Bug, Puzzle, Hexagon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useMode } from '../../features/modes/ModeContext';
import { Reorder } from 'framer-motion';

interface ActivityBarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

const ActivityBar: React.FC<ActivityBarProps> = ({ activeView, onViewChange }) => {
    const { toggleMode } = useMode();

    // Initial items configuration
    const [items, setItems] = useState([
        { id: 'explorer', icon: <Files size={24} />, label: 'Explorer' },
        { id: 'search', icon: <Search size={24} />, label: 'Search' },
        { id: 'git', icon: <GitBranch size={24} />, label: 'Source Control' },
        { id: 'debug', icon: <Bug size={24} />, label: 'Run and Debug' },
        { id: 'extensions', icon: <Puzzle size={24} />, label: 'Extensions' },
        {
            id: 'mode',
            icon: (
                <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-primary)] to-purple-500 blur-md opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                    <Hexagon className="relative z-10 text-[var(--accent-primary)] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" size={26} strokeWidth={2.5} />
                </div>
            ),
            label: 'Switch Mode',
            action: 'toggle'
        },
    ]);

    return (
        <div className="w-12 h-full glass-panel border-r-0 border-t-0 flex flex-col items-center py-3 z-20 overflow-hidden">
            <Reorder.Group axis="y" values={items} onReorder={setItems} className="flex flex-col gap-2 w-full items-center">
                {items.map((item) => (
                    <Reorder.Item key={item.id} value={item} className="relative">
                        <button
                            onClick={() => item.action === 'toggle' ? toggleMode() : onViewChange(item.id)}
                            className={cn(
                                "p-2.5 rounded-xl transition-all relative group cursor-grab active:cursor-grabbing",
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
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};

export default ActivityBar;
