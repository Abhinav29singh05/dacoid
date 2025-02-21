import React from 'react';

const GameInfo = ({ currentQuestion, questionsLength, timeLeft, score }) => {
    return (
        <div className="game-info">
            <div className="question-count">
                Question {currentQuestion + 1}/{questionsLength}
            </div>
            <div className="timer">Time left: {timeLeft}s</div>
            <div className="score">Score: {score}</div>
        </div>
    );
};

export default GameInfo;