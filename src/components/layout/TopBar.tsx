import React from 'react';
import { Hexagon } from 'lucide-react';
import { useMode } from '../../features/modes/ModeContext';
import { cn } from '../../lib/utils';

const TopBar: React.FC = () => {
    const { mode, toggleMode } = useMode();

    return (
        <div className="h-10 glass-panel border-b-0 flex items-center px-4 select-none justify-between drag-region z-50 relative">
            <div className="flex items-center gap-4">
                {/* Logo / Solo Mode Toggle */}
                <button
                    onClick={toggleMode}
                    className={cn(
                        "flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300 p-1 rounded-md no-drag group",
                        mode === 'solo' && "text-[var(--accent-primary)]"
                    )}
                    title={mode === 'solo' ? "Exit Solo Mode" : "Enter Solo Mode"}
                >
                    <div className={cn("relative transition-transform duration-500", mode === 'solo' && "rotate-180")}>
                        <div className="absolute inset-0 bg-[var(--accent-primary)] blur-md opacity-20 group-hover:opacity-50 transition-opacity rounded-full" />
                        <Hexagon size={18} strokeWidth={2} className="relative z-10" />
                    </div>
                    <span className="font-semibold tracking-tight text-sm group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all">
                        Antigravity
                    </span>
                </button>

                {/* Optional: Breadcrumbs or Menu could go here */}
                {/* <div className="h-4 w-[1px] bg-[var(--border-subtle)] mx-2" /> */}
            </div>

            {/* Window Controls (Placeholder for desktop app feel) */}
            <div className="flex items-center gap-2">
                {/* Search Bar placeholder? */}
                <div className="bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] px-3 py-1 rounded-md text-xs flex items-center gap-2 w-64 border border-[var(--border-subtle)]">
                    <span>Search files, commands...</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
