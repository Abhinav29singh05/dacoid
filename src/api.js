// Function to save game history to localStorage
export const saveGameHistory = (score, totalQuestions) => {
    try {
        const history = JSON.parse(localStorage.getItem('gameHistory') || '[]');
        const newGame = {
            date: new Date().toISOString(),
            score: score,
            totalQuestions: totalQuestions
        };
        history.push(newGame);
        localStorage.setItem('gameHistory', JSON.stringify(history));
        return Promise.resolve();
    } catch (error) {
        console.error('Error saving game history:', error);
        return Promise.reject(error);
    }
};