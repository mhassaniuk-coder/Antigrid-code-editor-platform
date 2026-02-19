import React, { useState } from 'react';
import { Plus, Monitor, X, MoreHorizontal, ArrowRight, Hexagon } from 'lucide-react';

const AgentPanel: React.FC = () => {
    const [model] = useState('Gemini 3 Pro (High)');

    return (
        <div className="w-[350px] h-full glass-panel border-l-0 border-t-0 flex flex-col z-10">
            {/* Header */}
            <div className="h-9 px-3 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--accent-primary)]">Agent</span>
                <div className="flex gap-2 text-[var(--text-secondary)]">
                    <Plus size={14} className="cursor-pointer hover:text-[var(--text-primary)] transition-colors" />
                    <MoreHorizontal size={14} className="cursor-pointer hover:text-[var(--text-primary)] transition-colors" />
                    <X size={14} className="cursor-pointer hover:text-[var(--text-primary)] transition-colors" />
                </div>
            </div>

            {/* Content - Chat history would go here */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-transparent to-[var(--bg-primary)]/50">
                {/* Empty state or chat history */}
                <div className="flex flex-col items-center justify-center h-full text-[var(--text-tertiary)] opacity-20 select-none">
                    <Hexagon size={48} strokeWidth={1} />
                    <span className="mt-2 text-xs">AI Agent Ready</span>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/20 backdrop-blur-md">
                <div className="bg-[var(--bg-primary)]/80 border border-[var(--border-highlight)] rounded-xl p-3 shadow-lg focus-within:border-[var(--accent-primary)] focus-within:ring-1 focus-within:ring-[var(--accent-primary)]/50 transition-all">
                    <input
                        className="w-full bg-transparent border-none outline-none text-sm placeholder-[var(--text-tertiary)] mb-3 text-[var(--text-primary)]"
                        placeholder="Ask anything (⌘L), @ to mention..."
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)]">
                                <Monitor size={10} /> {model}
                            </div>
                        </div>
                        <button className="bg-[var(--accent-primary)] p-1.5 rounded-lg text-white hover:bg-[var(--accent-hover)] transition-colors shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                            <ArrowRight size={12} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Disclaimer */}
            <div className="px-4 py-2 text-[9px] text-[var(--text-tertiary)] text-center border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]/50">
                AI may make mistakes. Double-check all generated code.
            </div>
        </div>
    );
}

export default AgentPanel;
