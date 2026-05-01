import { useState } from 'react';
import PromptInput from './Components/Prompt Inputs/PromptInputs';
import { HistoryItem } from './Image';
import ImageGenerator from './Components/ImageGenerator/ImageGenerator';

const App = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    const safePrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${safePrompt}`;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setCurrentImage(imageUrl);

      const newItem: HistoryItem = {
        id: crypto.randomUUID(), 
        prompt: prompt,
        url: imageUrl,
        timestamp: Date.now()
      };
      setHistory(prev => [newItem, ...prev]);
      setIsLoading(false);
    };
  };

  return (
    <div className="app-container">
      <ImageGenerator/>
      {/* <h1>AI Image Generator</h1>
      
      <PromptInput onGenerate={handleGenerate} isLoading={isLoading} /> */}

    </div>
  );
};

export default App;