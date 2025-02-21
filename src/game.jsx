import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './game.css';
import questions from './questions.js';
import { saveGameHistory, getGameHistory } from './History';
import GameInfo from './GameInfo';
import QuestionSection from './QuestionSection';
import GameOver from './GameOver';

export default function Game() {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [userAnswer, setUserAnswer] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [response, setResponse] = useState('');
    const [check, setCheck] = useState(false);
    const [gameHistory, setGameHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showHistory, setShowHistory] = useState(false);

    // Fetch history when game over
    useEffect(() => {
        if (gameOver) {
            setIsLoading(true);
            getGameHistory()
                .then(data => setGameHistory(data || []))
                .catch(err => {
                    console.error('Error fetching history:', err);
                    setError('Failed to load game history');
                })
                .finally(() => setIsLoading(false));
        }
    }, [gameOver]);

    // Timer effect
    useEffect(() => {
        if (timeLeft === 0 && !response) {
            handleNextQuestion();
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, response]);

    // Show response for 0.5 sec before next question
    useEffect(() => {
        if (response) {
            const timer = setTimeout(() => {
                setResponse('');
                handleNextQuestion();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [response]);

    // Save history when game is over
    useEffect(() => {
        if (gameOver) {
            saveGameHistory(score, questions.length);
        }
    }, [gameOver, score]);

    const handleAnswer = (answer) => {
        const isCorrect = answer === questions[currentQuestion].correctAnswer;
        setCheck(isCorrect);
        setResponse(isCorrect ? "Chosen correct answer" : "Chosen answer was not correct");

        if (isCorrect) {
            setScore(prevScore => prevScore + 1); // Use functional update
        }
    };

    const handleInputAnswer = (e) => {
        e.preventDefault();
        handleAnswer(userAnswer);
        setUserAnswer('');
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setTimeLeft(30);
        } else {
            setGameOver(true);
        }
    };

    if (gameOver) {
        return (
            <GameOver 
                score={score} 
                questionsLength={questions.length} 
                response={response} 
                check={check} 
                navigate={navigate} 
                showHistory={showHistory} 
                setShowHistory={setShowHistory} 
                isLoading={isLoading} 
                error={error} 
                gameHistory={gameHistory} 
            />
        );
    }

    return (
        <div>
            {response && <div className="overlay" />}
            <div className="game-container">
                <GameInfo 
                    currentQuestion={currentQuestion} 
                    questionsLength={questions.length} 
                    timeLeft={timeLeft} 
                    score={score} 
                />
                <QuestionSection 
                    question={questions[currentQuestion]} 
                    handleAnswer={handleAnswer} 
                    handleInputAnswer={handleInputAnswer} 
                    userAnswer={userAnswer} 
                    setUserAnswer={setUserAnswer} 
                    response={response} 
                    check={check} 
                />
            </div>
        </div>
    );
}