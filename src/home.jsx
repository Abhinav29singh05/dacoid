import "./home.css";
import { useNavigate } from 'react-router-dom';
import HistoryModal from './HistoryModal'; 
import { getGameHistory } from './History';  
import { useState, useEffect } from 'react';

export default function Home() {
    const navigate = useNavigate();
    const [showHistory, setShowHistory] = useState(false);
    const [gameHistory, setGameHistory] = useState([]);


    useEffect(() => {
        const fetchHistory = async () => {
            if (showHistory) {
                try {
                    const historyData = await getGameHistory(); // Fetch from IndexedDB
                    setGameHistory(historyData);
                    console.log('Game History:', historyData);
                } catch (error) {
                    console.error("Error fetching history:", error);
                }
            }
        };

        fetchHistory();
    }, [showHistory]);

    return(
        <div className="home">
            <div className="home-container">
                <nav className="nav-bar">
                    <div className="nav-title">Dacoid</div>
                    <button 
                        className="history-btn"
                        onClick={() => setShowHistory(true)}
                    >
                        History
                    </button>
                </nav>
                <div className="head">Instructions</div>
                <div className="body">
                    <ul>
                        <li> The game will display a series of 10 numbers.</li>
                        <li> For each question you will get 30 seconds to answer.</li>
                        <li> Question 1 to 5 will be multiple choice questions.</li>
                        <li> For each question you will get 4 options to choose from.</li>
                        <li> Question 6 to 10 will be a integer type question.</li>
                        <li> After completing the game you will get your final score.</li>
                        <li> Try to beat your previous score.</li>
                        <li> Each correct answer will give +1.</li>
                        <li> There is no negative marking.</li>
                        <li> Click on the "Start" button to begin the game.</li>
                    </ul>
                    <button className="start-btn"
                    onClick={() => {
                        navigate("/game");
                    }}>
                        Start</button>
                </div>
            </div>
            <HistoryModal 
                isOpen={showHistory}
                onClose={() => setShowHistory(false)}
                gameHistory={gameHistory}
            />
        </div>
    )
}