import React from 'react';
import { Hexagon } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-secondary)] select-none">
            <div className="flex flex-col items-center mb-16 animate-in fade-in zoom-in duration-700">
                <div className="relative group mb-6">
                    <div className="absolute inset-0 bg-[var(--accent-primary)] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                    <Hexagon size={80} className="relative z-10 text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent-primary)] to-[var(--text-primary)] tracking-tight mb-2">
                    Antigravity
                </h1>
                <p className="text-sm text-[var(--text-tertiary)] tracking-widest uppercase opacity-60">
                    Next-Gen AI Code Editor
                </p>
            </div>

            <div className="space-y-4 w-64">
                <ShortcutItem label="Switch to Agent Manager" keys={['⌘', 'E']} />
                <ShortcutItem label="Code with Agent (Composer)" keys={['⌘', 'K']} />
                <ShortcutItem label="Edit code inline" keys={['⌘', 'I']} />
            </div>
        </div>
    );
};

const ShortcutItem = ({ label, keys }: { label: string, keys: string[] }) => (
    <div className="flex items-center justify-between text-sm group cursor-pointer">
        <span className="group-hover:text-[var(--text-primary)] transition-colors">{label}</span>
        <div className="flex gap-1">
            {keys.map(k => (
                <span key={k} className="bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)] min-w-[20px] text-center text-xs shadow-sm">
                    {k}
                </span>
            ))}
        </div>
    </div>
)

export default WelcomeScreen;
