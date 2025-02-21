import React from 'react';
import './HistoryModal.css';

const HistoryModal = ({ isOpen, onClose, gameHistory }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Game History</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {gameHistory && gameHistory.length > 0 ? (
                        <div className="history-list">
                            {gameHistory.map((game, index) => (
                                <div key={index} className="history-item">
                                    <p>Date: {new Date(game.date).toLocaleDateString()}</p>
                                    <p>Score: {game.score}/{game.totalQuestions}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No game history available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistoryModal;