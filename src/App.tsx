import { ImageGenerator } from './Components/ImageGenerator/ImageGenerator';
import { HistorySidebar } from './Components/History';
import { useLocalStorage } from './hooks/UseLocalstorage';
import { HistoryItem } from './Image';
import './App.css'; // Make sure this is imported!

const App = () => {
    const [history, setHistory] = useLocalStorage<HistoryItem[]>('ai-history-key', []);

    const handleNewImage = (prompt: string, url: string) => {
        const newItem: HistoryItem = {
            id: crypto.randomUUID(),
            prompt: prompt,
            url: url,
            timestamp: Date.now()
        };
        setHistory(prev => [newItem, ...prev]);
    };

    return (
        <div className="app-layout">
            <ImageGenerator onImageGenerated={handleNewImage} />
            <div style={{paddingTop:'40px'}}>
            <HistorySidebar history={history} /></div>
        </div>
    );
};

export default App;