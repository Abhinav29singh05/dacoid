import { openDB } from 'idb';
import React, { useState, useEffect } from 'react';

// Initialize IndexedDB
const initDB = async () => {
    return openDB('gameDB', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('gameHistory')) {
                db.createObjectStore('gameHistory', { keyPath: 'date' });
            }
        },
    });
};

export const saveGameHistory = async (finalScore, totalQuestions) => {
    const db = await initDB();
    const transaction = db.transaction('gameHistory', 'readwrite');
    const store = transaction.objectStore('gameHistory');

    const historyEntry = {
        date: new Date().toISOString(),
        score: finalScore,
        totalQuestions: totalQuestions
    };

    await store.add(historyEntry);
    await transaction.done;
};

// Fetch game history from IndexedDB
export async function getGameHistory() {
    try {
        const db = await initDB();
        return await db.getAll('gameHistory');
    } catch (error) {
        console.error('Error getting game history:', error);
        return [];
    }
}

// History Component (Optional)
const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getGameHistory();
            setHistory(data);
            setLoading(false);
        };

        fetchHistory();
    }, []);

    if (loading) {
        return <div className="history-container">Loading...</div>;
    }

    return (
        <div className="history-container">
            <h2>Game History</h2>
            {history.length === 0 ? (
                <p>No games played yet!</p>
            ) : (
                <div className="history-list">
                    {history.map((game, index) => (
                        <div key={index} className="history-item">
                            <div className="game-info">
                                <p>Date: {new Date(game.date).toLocaleDateString()}</p>
                                <p>Score: {game.score}</p>
                                <p>Duration: {game.duration} seconds</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
