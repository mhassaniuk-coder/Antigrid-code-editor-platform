import { useState } from 'react';
import Layout from './components/layout/Layout';
import CodeEditor from './components/editor/CodeEditor';
import WelcomeScreen from './components/layout/WelcomeScreen';
import { ModeProvider } from './features/modes/ModeContext';
import { CollaborationProvider } from './features/collaboration/CollaborationContext';

// Mock File System Data
const FILES = {
  'main.tsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
  'App.tsx': `import { useState } from 'react';
import Layout from './components/layout/Layout';
import CodeEditor from './components/editor/CodeEditor';

function App() {
  const [code, setCode] = useState("// Start typing...");
  return <Layout><CodeEditor code={code} /></Layout>;
}

export default App;`,
  'package.json': `{
  "name": "antigrid-ai-ide",
  "version": "0.0.0",
  "dependencies": {
    "react": "^18.2.0"
  }
}`
};

function App() {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  const handleFileSelect = (fileName: string) => {
    if (FILES[fileName as keyof typeof FILES]) {
      setActiveFile(fileName);
      setFileContent(FILES[fileName as keyof typeof FILES]);
    }
  };

  const handleEditorChange = (val: string | undefined) => {
    setFileContent(val || '');
  };

  return (
    <ModeProvider>
      <CollaborationProvider>
        <Layout onFileSelect={handleFileSelect}>
          {activeFile ? (
            <CodeEditor
              key={activeFile} // Force re-render on file change
              code={fileContent}
              onChange={handleEditorChange}
              language={activeFile.endsWith('.json') ? 'json' : 'typescript'}
              activeFile={activeFile || 'main.tsx'}
            />
          ) : (
            <div className="h-full w-full" onClick={() => handleFileSelect('main.tsx')}>
              <WelcomeScreen />
            </div>
          )}
        </Layout>
      </CollaborationProvider>
    </ModeProvider>
  );
}

export default App;
