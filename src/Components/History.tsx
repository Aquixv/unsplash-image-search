import React from 'react';
import { HistoryItem } from '../Image';
import './HistorySidebar.css';

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
                                <button 
                                    className="copy-btn"
                                    onClick={() => navigator.clipboard.writeText(item.prompt)}
                                >
                                    Copy Prompt
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};