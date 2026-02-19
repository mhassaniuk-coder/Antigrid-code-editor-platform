import React, { useState } from 'react';
import { Hexagon, Maximize2, Minimize2, Phone, PhoneOff, Video } from 'lucide-react';
import { useMode } from '../../features/modes/ModeContext';
import { cn } from '../../lib/utils';

const TopBar: React.FC = () => {
    const { toggleMode, mode } = useMode();
    const [isCallActive, setIsCallActive] = useState(false);

    return (
        <div className="h-10 w-full flex items-center justify-between px-4 glass-panel border-b border-[var(--border-subtle)] z-50 select-none">
            {/* Left: Logo/Brand */}
            <div
                className="flex items-center gap-3 cursor-pointer group no-drag"
                onClick={toggleMode}
                title={mode === 'standard' ? "Switch to Solo Mode" : "Switch to Standard Mode"}
            >
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-tertiary)]/50 border border-[var(--border-subtle)] group-hover:border-[var(--accent-primary)]/50 group-hover:bg-[var(--accent-primary)]/10 transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(99,102,241,0.25)]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-primary)] to-purple-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                    <Hexagon size={18} strokeWidth={2.5} className="text-[var(--accent-primary)] relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-bold text-sm tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-tertiary)] group-hover:to-[var(--accent-primary)] transition-all duration-300">
                    Antigrid
                </span>
                {/* Menu Items (Mock) */}
                <div className="flex items-center gap-4 ml-6 text-[11px] text-[var(--text-secondary)] font-medium">
                    <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">File</span>
                    <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Edit</span>
                    <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">View</span>
                    <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Go</span>
                    <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Run</span>
                    <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Terminal</span>
                    <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Help</span>
                </div>
            </div>

            {/* Right: Window Controls & Profile */}
            <div className="flex items-center gap-3">
                {/* Call Controls */}
                <div className="flex items-center gap-1 mr-4 border-r border-[var(--border-subtle)] pr-4">
                    <div
                        className={cn(
                            "p-1.5 rounded-full cursor-pointer transition-all",
                            isCallActive ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                        )}
                        onClick={() => setIsCallActive(!isCallActive)}
                        title={isCallActive ? "End Call" : "Start Call"}
                    >
                        {isCallActive ? <PhoneOff size={14} /> : <Phone size={14} />}
                    </div>
                    <div className="p-1.5 rounded-full hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] cursor-pointer transition-colors">
                        <Video size={14} />
                    </div>
                    {isCallActive && (
                        <div className="flex items-center gap-1.5 ml-2 text-[10px] text-green-400 font-mono animate-pulse">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                            00:42
                        </div>
                    )}
                </div>

                <div
                    className="p-1.5 rounded-md hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] cursor-pointer transition-colors"
                    onClick={toggleMode}
                    title={mode === 'standard' ? "Switch to Solo Mode" : "Switch to Standard Mode"}
                >
                    {mode === 'standard' ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </div>
                <div className="h-4 w-[1px] bg-[var(--border-subtle)]" />
                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors border border-[var(--border-subtle)]">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-purple-600 flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                        JD
                    </div>
                    <span className="text-xs font-medium text-[var(--text-secondary)]">John Doe</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
