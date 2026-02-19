import React, { useEffect, useRef } from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { registerGhostTextProvider } from '../../features/editor/aiGhostText';
import { useCollaboration } from '../../features/collaboration/CollaborationContext';

interface CodeEditorProps {
    code?: string;
    language?: string;
    onChange?: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language = 'typescript', onChange }) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<Monaco | null>(null);
    const { users, connected } = useCollaboration();
    const decorationsRef = useRef<string[]>([]);

    const handleEditorDidMount = (editorInstance: editor.IStandaloneCodeEditor, monaco: Monaco) => {
        editorRef.current = editorInstance;
        monacoRef.current = monaco;

        // Define the custom 'antigrid-dark' theme
        monaco.editor.defineTheme('antigrid-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '52525b', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'c084fc' }, // Violet
                { token: 'string', foreground: 'a78bfa' }, // Light Violet
                { token: 'number', foreground: '60a5fa' }, // Blue
            ],
            colors: {
                'editor.background': '#0a0a0c', // Matches --bg-primary
                'editor.foreground': '#ededed',
                'editor.lineHighlightBackground': '#1c1c21',
                'editorCursor.foreground': '#6366f1',
                'editor.selectionBackground': '#3f3f46',
                'editorIndentGuide.background': '#27272a',
                'editorIndentGuide.activeBackground': '#3f3f46',
            }
        });

        monaco.editor.setTheme('antigrid-dark');

        // Enable Ghost Text
        registerGhostTextProvider(monaco);
    };

    // Render Remote Cursors
    useEffect(() => {
        if (!editorRef.current || !monacoRef.current || !connected) {
            if (editorRef.current && decorationsRef.current.length > 0) {
                decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
            }
            return;
        }

        const newDecorations = users.map(user => {
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

    }, [users, connected]);

    return (
        <div className="h-full w-full overflow-hidden">
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
