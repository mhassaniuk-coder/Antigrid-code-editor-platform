import React from 'react';
import { Hexagon } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-secondary)] select-none">
            <div className="flex flex-col items-center mb-12 animate-in fade-in zoom-in duration-500">
                <Hexagon size={64} className="text-[var(--text-primary)] mb-4" strokeWidth={1.5} />
                <h1 className="text-2xl font-medium text-[var(--text-primary)] tracking-tight">Antigravity</h1>
            </div>

            <div className="space-y-4 w-64">
                <ShortcutItem label="Switch to Agent Manager" keys={['⌘', 'E']} />
                <ShortcutItem label="Code with Agent" keys={['⌘', 'L']} />
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
