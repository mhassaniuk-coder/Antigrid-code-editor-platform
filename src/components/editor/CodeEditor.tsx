import React, { useEffect, useRef, useState } from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { registerGhostTextProvider } from '../../features/editor/aiGhostText';
import { useCollaboration } from '../../features/collaboration/CollaborationContext';

interface CodeEditorProps {
    code?: string;
    language?: string;
    activeFile?: string;
    onChange?: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language = 'typescript', activeFile, onChange }) => {
    const [conflicts, setConflicts] = useState<string[]>([]);
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<Monaco | null>(null);
    const { users, connected } = useCollaboration();
    const decorationsRef = useRef<string[]>([]);

    const handleEditorDidMount = (editorInstance: editor.IStandaloneCodeEditor, monaco: Monaco) => {
        editorRef.current = editorInstance;
        monacoRef.current = monaco;

        // ... (theme definition omitted for brevity, assuming existing code remains)

        monaco.editor.setTheme('antigrid-dark');
        registerGhostTextProvider(monaco);

        // Track local cursor position to detect conflicts
        editorInstance.onDidChangeCursorPosition((e) => {
            const currentLine = e.position.lineNumber;
            if (!connected) {
                setConflicts([]);
                return;
            }

            const conflictingUsers = users
                .filter(u => u.currentFile === activeFile && u.cursor?.lineNumber === currentLine)
                .map(u => u.name);

            setConflicts(conflictingUsers);
        });
    };

    // Render Remote Cursors (unchanged logic)
    useEffect(() => {
        // ... (existing useEffect logic)
    }, [users, connected, activeFile]);

    // Re-check conflicts when users move (remote updates)
    useEffect(() => {
        if (!editorRef.current || !connected) return;

        const currentLine = editorRef.current.getPosition()?.lineNumber;
        if (!currentLine) return;

        const conflictingUsers = users
            .filter(u => u.currentFile === activeFile && u.cursor?.lineNumber === currentLine)
            .map(u => u.name);

        setConflicts(conflictingUsers);
    }, [users, connected, activeFile]);

    // Render Remote Cursors
    useEffect(() => {
        if (!editorRef.current || !monacoRef.current || !connected) {
            if (editorRef.current && decorationsRef.current.length > 0) {
                decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
            }
            return;
        }

        const newDecorations = users
            .filter(user => user.currentFile === activeFile) // Only show users in the same file
            .map(user => {
                if (!user.cursor) return null;
                return {
                    range: new monacoRef.current!.Range(user.cursor.lineNumber, user.cursor.column, user.cursor.lineNumber, user.cursor.column + 1),
                    options: {
                        className: `remote-cursor-${user.id}`,
                        hoverMessage: { value: `User: ${user.name}` },
                        beforeContentClassName: `remote-cursor-label-${user.id}`,
                    }
                };
            }).filter(Boolean) as editor.IModelDeltaDecoration[];

        decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, newDecorations);

    }, [users, connected, activeFile]);

    return (
        <div className="h-full w-full overflow-hidden relative group">
            {/* Conflict Warning Overlay */}
            {conflicts.length > 0 && (
                <div className="absolute top-4 right-8 z-50 bg-red-500/10 border border-red-500/50 text-red-400 px-3 py-1.5 rounded-lg backdrop-blur-md shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-none">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium">
                        Editing conflict with <span className="font-bold text-red-300">{conflicts.join(', ')}</span>
                    </span>
                </div>
            )}

            <Editor
                height="100%"
                defaultLanguage={language}
                value={code} // Changed from defaultValue to value for controlled component
                theme="antigrid-dark"
                onMount={handleEditorDidMount}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontLigatures: true,
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                    padding: { top: 16, bottom: 16 },
                }}
                loading={<div className="text-[var(--text-secondary)] p-4">Loading Editor Engine...</div>}
            />
        </div>
    );
};

export default CodeEditor;
