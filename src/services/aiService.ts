// Mock AI Service to simulate streaming responses

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export const streamResponse = async (
    prompt: string,
    onChunk: (chunk: string) => void
): Promise<void> => {
    // Use prompt to simulate context (in a real app)
    console.log("Processing prompt:", prompt);
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Simulate thinking
    await delay(1000);

    const responses = [
        "I can help with that! Here's a React component for a button:",
        "\n```tsx\nconst Button = ({ children }) => (\n  <button className='px-4 py-2 bg-blue-500 text-white rounded'>\n    {children}\n  </button>\n);\n```",
        "\nLet me know if you need any styling adjustments.",
        " I can also add an onClick handler if you like."
    ];

    // Stream chunks
    for (const chunk of responses) {
        // Break chunk into characters for smoother "typing" effect
        for (const char of chunk) {
            await delay(15 + Math.random() * 30); // Random typing speed
            onChunk(char);
        }
    }
};

export const generateCode = async (prompt: string): Promise<string> => {
    // Simple mock code generator
    return `
// Generated code based on: ${prompt}
function generatedFeature() {
  console.log("AI Magic happened!");
  return true;
}`;
};
