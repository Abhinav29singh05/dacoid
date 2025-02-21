import React from 'react';

const GameOver = ({ score, questionsLength, response, check, navigate, showHistory, setShowHistory, isLoading, error, gameHistory }) => {
    return (
        <div className="game-container">
            <div className="score-section">
                <h2>Game Over!</h2>
                <h2 className='response' style={{ margin: "0 auto", color: check ? "green" : "red"}}>{response}</h2>
                <p>Your final score: {score} out of {questionsLength}</p>
                <button className="again-button" onClick={() => navigate('/')}>Play Again</button>
                
                <button 
                    className="history-toggle-button" 
                    onClick={() => setShowHistory(!showHistory)}
                >
                    {showHistory ? 'Hide History' : 'Show History'}
                </button>

                {showHistory && (
                    <div className="history-section">
                        <h3>Game History</h3>
                        {isLoading ? (
                            <p>Loading history...</p>
                        ) : error ? (
                            <p className="error-message">{error}</p>
                        ) : gameHistory.length === 0 ? (
                            <p>No game history available</p>
                        ) : (
                            <div className="history-list">
                                {gameHistory.map((game, index) => (
                                    <div key={index} className="history-item">
                                        <p>Date: {new Date(game.date).toLocaleDateString()}</p>
                                        <p>Score: {game.score}/{game.totalQuestions}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameOver;