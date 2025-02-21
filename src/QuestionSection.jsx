import React from 'react';

const QuestionSection = ({ question, handleAnswer, handleInputAnswer, userAnswer, setUserAnswer, response, check }) => {
    return (
        <div className="question-section">
            <h2>{question.question}</h2>

            {question.type === 'mcq' ? (
                <div className="options-container">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            className="option-button"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="integer-qus">
                    <form onSubmit={handleInputAnswer} className="integer-input-form">
                        <input
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Enter your answer"
                            required
                        />
                        <br />
                        <button className="int-button" type="submit">Submit</button>
                    </form>
                </div>
            )}
            <h2 className='response' style={{ margin: "0 auto", color: check ? "green" : "red"}}> {response}</h2>
        </div>
    );
};

export default QuestionSection;