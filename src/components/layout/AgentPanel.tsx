import React, { useState, useRef, useEffect } from 'react';
import { Plus, Monitor, X, MoreHorizontal, ArrowRight, Hexagon, Bot, User } from 'lucide-react';
import { streamResponse, type ChatMessage } from '../../services/aiService';
import { cn } from '../../lib/utils';

const AgentPanel: React.FC = () => {
    const [model] = useState('Gemini 3 Pro (High)');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        const aiMsgId = (Date.now() + 1).toString();
        // Add empty AI message placeholder
        setMessages(prev => [...prev, { id: aiMsgId, role: 'assistant', content: '' }]);

        let fullContent = '';
        await streamResponse(input, (chunk) => {
            fullContent += chunk;
            setMessages(prev => prev.map(msg =>
                msg.id === aiMsgId ? { ...msg, content: fullContent } : msg
            ));
        });

        setIsTyping(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

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

            {/* Content Actions */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-transparent to-[var(--bg-primary)]/50">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[var(--text-tertiary)] opacity-20 select-none">
                        <Hexagon size={48} strokeWidth={1} />
                        <span className="mt-2 text-xs">AI Agent Ready</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {messages.map(msg => (
                            <div key={msg.id} className={cn("flex gap-3 text-sm", msg.role === 'user' ? "flex-row-reverse" : "")}>
                                <div className={cn("w-6 h-6 rounded flex items-center justify-center shrink-0", msg.role === 'assistant' ? "bg-[var(--accent-primary)] text-white" : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]")}>
                                    {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                                </div>
                                <div className={cn("p-2 rounded-lg max-w-[85%]", msg.role === 'user' ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)]" : "bg-transparent text-[var(--text-secondary)]")}>
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/20 backdrop-blur-md">
                <div className="bg-[var(--bg-primary)]/80 border border-[var(--border-highlight)] rounded-xl p-3 shadow-lg focus-within:border-[var(--accent-primary)] focus-within:ring-1 focus-within:ring-[var(--accent-primary)]/50 transition-all">
                    <div className="text-[10px] font-bold text-[var(--accent-primary)] uppercase tracking-widest mb-2 flex items-center gap-1.5 opacity-80 select-none">
                        <Hexagon size={10} strokeWidth={2.5} />
                        Antigravity
                    </div>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-none outline-none text-sm placeholder-[var(--text-tertiary)] mb-3 text-[var(--text-primary)]"
                        placeholder="Ask anything..."
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)]">
                                <Monitor size={10} /> {model}
                            </div>
                        </div>
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className={cn("bg-[var(--accent-primary)] p-1.5 rounded-lg text-white hover:bg-[var(--accent-hover)] transition-colors shadow-[0_0_10px_rgba(99,102,241,0.3)]", (!input.trim() || isTyping) && "opacity-50 cursor-not-allowed")}
                        >
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
};

export default AgentPanel;
