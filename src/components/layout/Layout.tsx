import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import ActivityBar from './ActivityBar';
import SidePanel from './SidePanel';
import AgentPanel from './AgentPanel';
import StatusBar from './StatusBar';
import Composer from '../ui/Composer'; // Fixed import path
import { useMode } from '../../features/modes/ModeContext';

interface LayoutProps {
    children: React.ReactNode;
    onFileSelect?: (fileName: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onFileSelect }) => {
    const { mode } = useMode();
    const [activeView, setActiveView] = useState('explorer');
    const [leftPanelVisible, setLeftPanelVisible] = useState(true);
    const [rightPanelVisible, setRightPanelVisible] = useState(true);
    const [isComposerOpen, setIsComposerOpen] = useState(false);

    // Sync visibility with mode
    useEffect(() => {
        if (mode === 'solo') {
            setLeftPanelVisible(false);
            setRightPanelVisible(true); // Keep Agent visible/available in Solo
        } else {
            setLeftPanelVisible(true);
            setRightPanelVisible(true);
        }
    }, [mode]);

    // Toggle Composer with Ctrl+K
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsComposerOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleViewChange = (view: string) => {
        if (activeView === view) {
            setLeftPanelVisible(!leftPanelVisible);
        } else {
            setActiveView(view);
            setLeftPanelVisible(true);
        }
    };

    // Standard Mode Layout (VS Code Style)
    if (mode === 'standard') {
        return (
            <div className="flex flex-col h-screen w-screen bg-[var(--bg-primary)] overflow-hidden text-[var(--text-primary)]">
                <TopBar />
                <div className="flex-1 flex overflow-hidden">
                    <ActivityBar activeView={activeView} onViewChange={handleViewChange} />
                    <SidePanel isVisible={leftPanelVisible} onFileSelect={onFileSelect} />
                    <main className="flex-1 flex flex-col relative min-w-0 bg-[var(--bg-primary)]">
                        <div className="flex-1 overflow-hidden relative">
                            {children}
                        </div>
                        <Composer
                            isVisible={isComposerOpen}
                            onClose={() => setIsComposerOpen(false)}
                            onSubmit={(prompt) => console.log('AI Prompt:', prompt)}
                        />
                    </main>
                    {rightPanelVisible && <AgentPanel />}
                </div>
                <StatusBar />
            </div>
        );
    }

    // Solo Mode Layout (Trae/Cursor Focus Style)
    return (
        <div className="flex flex-col h-screen w-screen bg-[var(--bg-primary)] overflow-hidden text-[var(--text-primary)] relative">
            <TopBar />

            <main className="flex-1 flex relative overflow-hidden justify-center">
                {/* Floating Activity Bar (Optional/Hidden in Solo) */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <ActivityBar activeView={activeView} onViewChange={handleViewChange} />
                </div>

                {/* Main Centered Editor */}
                <div className="w-full max-w-5xl h-full flex flex-col relative shadow-2xl border-x border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                    {children}
                </div>

                {/* Floating Agent Panel */}
                <div className={`absolute right-4 top-20 bottom-20 z-40 transition-transform duration-300 ${rightPanelVisible ? 'translate-x-0' : 'translate-x-[110%]'}`}>
                    <div className="h-full rounded-2xl overflow-hidden shadow-2xl glass-panel border border-[var(--glass-border)]">
                        <AgentPanel />
                    </div>
                </div>
            </main>

            <StatusBar />

            <Composer
                isVisible={isComposerOpen}
                onClose={() => setIsComposerOpen(false)}
                onSubmit={(prompt) => console.log('AI Prompt:', prompt)}
            />
        </div>
    );
};

export default Layout;
