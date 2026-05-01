import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';
import Ghost from '../Assets/Ghost.gif';
import { downloadImage } from '../utils/download';

interface ImageGeneratorProps {
    onImageGenerated: (prompt: string, url: string) => void;
}

export const ImageGenerator = ({ onImageGenerated }: ImageGeneratorProps) => {
    const [image_url, setImage_url] = useState('/');
    const [loading, setLoading] = useState(false); 
    const [activePrompt, setActivePrompt] = useState(''); 
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleGenerate = (e?: React.FormEvent) => {
        if (e) e.preventDefault(); 

        if (!inputRef.current || !inputRef.current.value.trim()) {
            alert("Please enter a prompt first!"); 
            return;
        }

        setLoading(true);

        const prompt = inputRef.current.value;
        setActivePrompt(prompt);

        const safePrompt = encodeURIComponent(prompt);
        const randomSeed = Math.floor(Math.random() * 10000); 
        
        const newImageUrl = `https://image.pollinations.ai/prompt/${safePrompt}?seed=${randomSeed}&width=512&height=512&nologo=true`;

        setImage_url(newImageUrl);
        inputRef.current.value = '';
    };

        return (
        <div className='ai-image-generator'>
            <div className='header'>AI image <span>Generator</span></div>
            
            <div className="img-loading">
                <div className="image">
                    {loading && <img src={Ghost} alt="Loading..." />}
                    
                    <img 
                        src={image_url === '/' ? default_image : image_url} 
                        alt="Generated AI Art" 
                        style={{ display: loading ? 'none' : 'block' }}
                        referrerPolicy="no-referrer"
                        onLoad={() => {
                            setLoading(false);
                            if (image_url !== '/') {
                                onImageGenerated(activePrompt, image_url);
                            }
                        }}
                        onError={() => {
                            if (image_url !== '/') {
                                alert("Image generation failed. Try another prompt!");
                                setImage_url(default_image);
                                setLoading(false);
                            }
                        }}
                    />
                    {image_url !== '/' && !loading && (
                        <button 
                            className="download-btn-main"
                            onClick={() => downloadImage(image_url, activePrompt)}
                        >
                            ⬇ Download Image
                        </button>
                    )}
                    <div className="loading">
                      <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                      <div className={loading ? "loading-text" : "display-none"}>Loading....</div>
                    </div>
                </div>
            </div>
            
            <form className="search-box" onSubmit={handleGenerate}>
                <input 
                    type="text" 
                    ref={inputRef} 
                    className='search-input' 
                    placeholder='Describe what you want to see....'
                    disabled={loading}
                />
                <button type="submit" className="generate-button" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </form>
        </div>
    );
};
export default ImageGenerator