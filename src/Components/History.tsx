import React from 'react';
import { HistoryItem } from '../Image';
import './HistorySidebar.css';
import { downloadImage } from './utils/download';

interface HistorySidebarProps {
    history: HistoryItem[];
}

export const HistorySidebar = ({ history }: HistorySidebarProps) => {
    return (
        <div className="history-sidebar">
            <h3>RECENT</h3>
            <div className="history-list">
                {history.length === 0 ? (
                    <p className="empty-state">No images generated yet.</p>
                ) : (
                   history.map((item) => (
                        <div key={item.id} className="history-card">
                            <img src={item.url} alt="AI Generation" loading="lazy" />
                            <div className="card-info">
                                <p className="history-prompt">"{item.prompt}"</p>
                                <div className="card-actions flex gap-2 mt-2">
                                    <button 
                                        className="action-btn copy-btn"
                                        onClick={() => navigator.clipboard.writeText(item.prompt)}
                                    >
                                        Copy Prompt
                                    </button>
                                    <button 
                                        className="action-btn download-btn-small"
                                        onClick={() => downloadImage(item.url, item.prompt)}
                                    >
                                        Download
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};