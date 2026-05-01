

export const downloadImage = async (imageUrl: string, prompt: string) => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob(); 

        const localUrl = window.URL.createObjectURL(blob);
        const safeName = prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 20);

        const link = document.createElement('a');
        link.href = localUrl;
        link.download = `AI_${safeName || 'generation'}.jpg`; 
        
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(localUrl);

    } catch (error) {
        console.error("Download failed:", error);
        alert("Failed to download image. The server might be blocking direct downloads.");
    }
};