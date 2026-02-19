import React, { useState } from 'react';
import { MessageSquare, Layers, Settings, ChevronRight, ChevronLeft, Hexagon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const [activeTab, setActiveTab] = useState<'chat' | 'explorer' | 'settings'>('chat');

    return (
        <motion.div
            initial={{ width: 300 }}
            animate={{ width: isOpen ? 300 : 50 }}
            className={cn(
                "h-full border-r border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col transition-all duration-300",
                !isOpen && "items-center"
            )}
        >
            {/* Header */}
            <div className={cn("h-14 flex items-center px-4 border-b border-[var(--border-subtle)]", isOpen ? "justify-between" : "justify-center")}>
                {isOpen && <div className="flex items-center gap-2 font-bold text-[var(--accent-primary)]"><Hexagon size={20} /> Antigrid</div>}
                <button onClick={toggleSidebar} className="p-1 hover:bg-[var(--bg-hover)] rounded-md text-[var(--text-secondary)]">
                    {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
            </div>

            {/* Tabs / Nav */}
            <div className={cn("flex gap-2 p-2", !isOpen && "flex-col")}>
                <NavButton icon={<MessageSquare size={18} />} label="AI Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} collapsed={!isOpen} />
                <NavButton icon={<Layers size={18} />} label="Explorer" active={activeTab === 'explorer'} onClick={() => setActiveTab('explorer')} collapsed={!isOpen} />
            </div>

            {/* Content Area */}
            {isOpen && (
                <div className="flex-1 overflow-y-auto p-4 content-area">
                    {activeTab === 'chat' && (
                        <div className="flex flex-col h-full">
                            <div className="flex-1">
                                <div className="text-sm text-[var(--text-secondary)] bg-[var(--bg-tertiary)] p-3 rounded-lg mb-4">
                                    Hello! I'm your AI Engineer. How can I help you build today?
                                </div>
                            </div>
                            <div className="mt-auto">
                                <input
                                    type="text"
                                    placeholder="Ask anything..."
                                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-md p-2 text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                                />
                            </div>
                        </div>
                    )}
                    {activeTab === 'explorer' && (
                        <div className="text-[var(--text-secondary)] text-sm">
                            Project Files
                            {/* Mock explorer tree */}
                            <div className="ml-2 mt-2 space-y-1">
                                <div className="hover:text-[var(--text-primary)] cursor-pointer">src/</div>
                                <div className="ml-2 hover:text-[var(--text-primary)] cursor-pointer">components/</div>
                                <div className="ml-2 hover:text-[var(--text-primary)] cursor-pointer">App.tsx</div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className={cn("border-t border-[var(--border-subtle)] p-2", !isOpen && "flex justify-center")}>
                <NavButton icon={<Settings size={18} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} collapsed={!isOpen} />
            </div>

        </motion.div>
    );
};

interface NavButtonProps {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
    collapsed: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, active, onClick, collapsed }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center gap-2 p-2 rounded-md transition-colors text-sm w-full",
            active ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]",
            collapsed && "justify-center p-2"
        )}
        title={collapsed ? label : undefined}
    >
        {icon}
        {!collapsed && <span>{label}</span>}
    </button>
);

export default Sidebar;
