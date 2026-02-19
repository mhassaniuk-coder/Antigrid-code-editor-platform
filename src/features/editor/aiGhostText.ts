import type { Monaco } from '@monaco-editor/react';
import type { editor, Position } from 'monaco-editor';

export const registerGhostTextProvider = (monaco: Monaco) => {
    monaco.languages.registerInlineCompletionsProvider('typescript', {
        provideInlineCompletions: async (model: editor.ITextModel, position: Position) => {
            const textUntilPosition = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
            });

            // Mock AI: If user types "Console", suggest ".log('Hello World')"
            if (textUntilPosition.endsWith('console.')) {
                return {
                    items: [{
                        insertText: 'log("Hello form Antigravity AI!");',
                        range: {
                            startLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endLineNumber: position.lineNumber,
                            endColumn: position.column,
                        }
                    }]
                };
            }

            // Mock AI: Function completion
            if (textUntilPosition.endsWith('function add')) {
                return {
                    items: [{
                        insertText: '(a: number, b: number) {\n  return a + b;\n}',
                        range: {
                            startLineNumber: position.lineNumber,
                            startColumn: position.column,
                            endLineNumber: position.lineNumber,
                            endColumn: position.column,
                        }
                    }]
                };
            }

            return { items: [] };
        },
        freeInlineCompletions: () => { },
    });
};
