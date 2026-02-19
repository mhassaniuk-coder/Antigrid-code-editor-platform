import React from 'react';
import { ChevronRight, ChevronDown, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidePanelProps {
    isVisible: boolean;
    onFileSelect?: (fileName: string) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ isVisible, onFileSelect }) => {
    if (!isVisible) return null;

    return (
        <div className="w-64 h-full bg-[var(--bg-secondary)]/50 backdrop-blur-sm border-r border-[var(--border-subtle)] flex flex-col">
            <div className="h-9 px-4 flex items-center justify-between text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest opacity-70">
                <span>Explorer</span>
                <MoreHorizontal size={14} className="cursor-pointer hover:text-[var(--text-primary)]" />
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Mock File Tree */}
                <div className="px-2 py-1">
                    <div className="flex items-center gap-1 py-1 px-2 bg-[var(--bg-tertiary)]/50 rounded-sm text-[var(--text-primary)] text-sm font-medium">
                        <ChevronDown size={14} />
                        <span>antigrid-ai-ide</span>
                    </div>

                    <div className="pl-4 mt-1 space-y-0.5">
                        <FileItem name="src" isFolder isOpen />
                        <div className="pl-4 space-y-0.5">
                            <FileItem name="components" isFolder />
                            <FileItem name="features" isFolder />
                            <FileItem name="App.tsx" onClick={() => onFileSelect?.('App.tsx')} />
                            <FileItem name="main.tsx" onClick={() => onFileSelect?.('main.tsx')} />
                        </div>
                        <FileItem name="package.json" onClick={() => onFileSelect?.('package.json')} />
                        <FileItem name="tsconfig.json" />
                        <FileItem name="README.md" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FileItem = ({ name, isFolder = false, isOpen = false, isActive = false, onClick }: { name: string, isFolder?: boolean, isOpen?: boolean, isActive?: boolean, onClick?: () => void }) => (
    <div
        onClick={onClick}
        className={cn(
            "flex items-center gap-1.5 py-0.5 px-2 rounded-sm cursor-pointer text-sm select-none",
            isActive ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
        )}>
        {isFolder && (
            isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
        )}
        {!isFolder && <span className="w-3.5" />} {/* Indent for files */}
        <span className={cn(isFolder && "font-medium")}>{name}</span>
    </div>
)

export default SidePanel;
