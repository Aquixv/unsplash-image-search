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
    
    // 1. Make this function async to handle the fetch request
    const handleGenerate = async (e?: React.FormEvent) => {
        if (e) e.preventDefault(); 

        if (!inputRef.current || !inputRef.current.value.trim()) {
            alert("Please enter a search term first!"); 
            return;
        }

        setLoading(true);

        const prompt = inputRef.current.value;
        setActivePrompt(prompt);

        try {
            // 2. Hit the Unsplash search API (fetching only 1 image for this layout)
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&per_page=1`, 
                {
                    headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
}
                }
            );

            const data = await response.json();

            // 3. Check if we actually got results back
            if (data.results && data.results.length > 0) {
                // Grab the 'regular' sized URL from the first result
                setImage_url(data.results[0].urls.regular);
                inputRef.current.value = '';
            } else {
                alert("No images found for that search. Try something else!");
                setImage_url(default_image);
                setLoading(false);
            }
        } catch (error) {
            console.error("Search error:", error);
            alert("Failed to search Unsplash. Check your network or API key.");
            setImage_url(default_image);
            setLoading(false);
        }
        
        // Note: We don't call setLoading(false) on success here because 
        // your <img> tag's onLoad event handles it beautifully once the image actually renders!
    };

    return (
        <div className='ai-image-generator'>
            {/* Updated the header slightly */}
            <div className='header'>Image <span>Search</span></div>
            
            <div className="img-loading">
                <div className="image">
                    {loading && <img src={Ghost} alt="Loading..." />}
                    
                    <img 
                        src={image_url === '/' ? default_image : image_url} 
                        alt="Search Result" 
                        style={{ display: loading ? 'none' : 'block' }}
                        referrerPolicy="no-referrer"
                        onLoad={() => {
                            setLoading(false);
                            if (image_url !== '/' && image_url !== default_image) {
                                onImageGenerated(activePrompt, image_url);
                            }
                        }}
                        onError={() => {
                            if (image_url !== '/' && image_url !== default_image) {
                                alert("Failed to load the image from Unsplash.");
                                setImage_url(default_image);
                                setLoading(false);
                            }
                        }}
                    />
                    {image_url !== '/' && image_url !== default_image && !loading && (
                        <button 
                            className="download-btn-main"
                            onClick={() => downloadImage(image_url, activePrompt)}
                        >
                            ⬇ Download Image
                        </button>
                    )}
                    <div className="loading">
                      <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                      <div className={loading ? "loading-text" : "display-none"}>Searching....</div>
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
                {/* Updated button text */}
                <button type="submit" className="generate-button" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
        </div>
    );
};
export default ImageGenerator;