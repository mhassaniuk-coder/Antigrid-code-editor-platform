import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ComposerProps {
    isVisible?: boolean;
    onClose?: () => void;
    onSubmit: (prompt: string) => void;
}

const Composer: React.FC<ComposerProps> = ({ isVisible = true, onClose, onSubmit }) => {
    const [prompt, setPrompt] = useState('');
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
        }
    }, [prompt]);

    const handleSubmit = () => {
        if (prompt.trim()) {
            onSubmit(prompt);
            setPrompt('');
            // Reset height
            if (inputRef.current) inputRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
        if (e.key === 'Escape' && onClose) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[600px] max-w-[90vw] z-50 pointer-events-none"
                >
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-highlight)] rounded-xl shadow-2xl overflow-hidden pointer-events-auto">
                        <div className="p-3 bg-[rgba(19,19,22,0.8)] backdrop-blur-xl">
                            <div className="relative flex items-end gap-2">
                                <div className="pb-2 text-[var(--accent-primary)] animate-pulse">
                                    <Sparkles size={18} />
                                </div>
                                <textarea
                                    ref={inputRef}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Generate code with AI..."
                                    className="w-full bg-transparent border-none focus:ring-0 outline-none text-[var(--text-primary)] placeholder-[var(--text-tertiary)] resize-none max-h-[300px] py-2 text-base font-sans leading-relaxed"
                                    rows={1}
                                    autoFocus
                                />
                                <button
                                    onClick={handleSubmit}
                                    disabled={!prompt.trim()}
                                    className={cn(
                                        "flex items-center justify-center p-2 rounded-lg transition-all mb-1 h-8 w-8",
                                        prompt.trim()
                                            ? "bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)]"
                                            : "bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] cursor-not-allowed"
                                    )}
                                >
                                    <ArrowUp size={16} strokeWidth={3} />
                                </button>
                            </div>
                        </div>

                        {/* Context / Hints Area (Cursor-like) */}
                        <div className="bg-[var(--bg-tertiary)] px-4 py-2 flex items-center justify-between text-xs text-[var(--text-secondary)] border-t border-[var(--border-subtle)]">
                            <div className="flex gap-3">
                                <span className="flex items-center gap-1 cursor-pointer hover:text-[var(--text-primary)] transition-colors">
                                    <span className="px-1.5 py-0.5 rounded bg-[var(--bg-hover)] border border-[var(--border-subtle)] font-mono">@</span> Files
                                </span>
                                <span className="flex items-center gap-1 cursor-pointer hover:text-[var(--text-primary)] transition-colors">
                                    <span className="px-1.5 py-0.5 rounded bg-[var(--bg-hover)] border border-[var(--border-subtle)] font-mono">/</span> Commands
                                </span>
                            </div>
                            <div className="font-mono opacity-50">
                                enter to submit
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Composer;
