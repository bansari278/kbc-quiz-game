// src/components/GameScreen.js
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/GameScreen.css';


const GameScreen = ({ displayName }) => {
    const [question, setQuestion] = useState({});
    const [selectedOption, setSelectedOption] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentPrize, setCurrentPrize] = useState(1);
    const [lifelinesUsed, setLifelinesUsed] = useState({
        fiftyFifty: false,
        askTheAI: false,
    });
    const navigate = useNavigate();
    const prizeLevels = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 100000000, 10000000000];

    useEffect(() => {
        // Fetch the initial question when the component mounts
        fetchQuestion();
    }, []);

    useEffect(() => {
        setCurrentPrize(prizeLevels[currentLevel - 1]); // Set initial prize based on the current level
    }, [currentLevel, prizeLevels]);

    const fetchQuestion = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/quizzes');
            // const randomQuestion = response.data[Math.floor(Math.random() * response.data.length)];
            setQuestion(response.data);
            setCurrentPrize(generatePrize(currentLevel));
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };
    const generatePrize = (level) => {
        return level <= 10 ? Math.pow(10, level - 1) : Math.pow(10, 10);
    };
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleSubmitOption = async () => {
        try {
            // const response = await axios.post('http://localhost:8080/api/questions/submit', {
            //     option: selectedOption,
            // });
            // setIsCorrect(response.data.isCorrect);

            const isCorrect = selectedOption === question.correctOption;
            setIsCorrect(isCorrect)
            if (!isCorrect && currentLevel < 4) {
                // Player loses all prize money and wins Rs 0
                navigate('/quit', { state: { currentPrize: 0, displayName } });
                return; // Stop further processing
            }
            else if (!isCorrect && currentLevel >= 4 && currentLevel < 10) {
                // Player loses the prize money of the last milestone cleared
                const lostPrize = prizeLevels[currentLevel - 2] || 0; // If currentLevel is 1, then use 0 as the index
                navigate('/quit', { state: { currentPrize: lostPrize, displayName } });
                return; // Stop further processing
            }
            else if (isCorrect && currentLevel === 10) {
                // Player answers correctly at level 10, navigate to the winner page
                navigate('/winner', { state: { currentPrize, displayName } });
            }


        } catch (error) {
            console.error('Error submitting option:', error);
        }
    };

    const handleNextQuestion = () => {
        // Reset state and fetch the next question
        setSelectedOption('');
        setIsCorrect(null);
        setCurrentLevel((prevLevel) => (prevLevel < 10 ? prevLevel + 1 : prevLevel));

        fetchQuestion();
    };

    const handleQuit = () => {
        navigate('/quit', { state: { currentPrize, displayName } });
    }
    const handleFiftyFifty = () => {
        if (lifelinesUsed.fiftyFifty) {
            // Prevent using the lifeline again
            return;
        }

        // Identify two incorrect options to eliminate
        const correctOption = question.correctOption;
        const incorrectOptions = question.options.filter((opt) => opt !== correctOption);
        const eliminatedOptions = incorrectOptions.slice(0, 2);

        // Update the state with the new set of options
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            options: prevQuestion.options.filter((opt) => !eliminatedOptions.includes(opt)),
        }));

        // Mark the 50-50 lifeline as used
        setLifelinesUsed((prevLifelinesUsed) => ({
            ...prevLifelinesUsed,
            fiftyFifty: true,
        }));
    };

    const handleAskTheAI = () => {
        if (lifelinesUsed.askTheAI) {
            // Prevent using the lifeline again
            return;
        }

        // Display a hint by showing the correct answer
        alert(`Hint: The correct answer is ${question.correctOption}`);

        // Mark the AskTheAI lifeline as used
        setLifelinesUsed((prevLifelinesUsed) => ({
            ...prevLifelinesUsed,
            askTheAI: true,
        }));
    };

    return (
        <div className="game-screen-container">
            <h2>Welcome, {displayName}!</h2>
            <h2>Current Question</h2>
            <p>{question.question}</p>

            <h2>Question Options</h2>
            <ul>
                {question.options &&
                    question.options.map((option) => (
                        <li key={option}>
                            <Button
                                variant={selectedOption === option ? 'primary' : 'outline-primary'}
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option}
                            </Button>
                        </li>
                    ))}
            </ul>

            {selectedOption && (
                <>
                    <h2>Selected Option</h2>
                    <p>{selectedOption}</p>

                    <Button variant="success" onClick={handleSubmitOption}>
                        Lock Option
                    </Button>
                </>
            )}

            {isCorrect !== null && (
                <>
                    <h2>Correct Answer</h2>
                    <p>{isCorrect ? 'Correct!' : 'Incorrect.'}</p>
                    {currentLevel >= 4 && (
                        <Button variant="danger" onClick={handleQuit}>
                            Quit
                        </Button>
                    )}
                    <Button variant="primary" onClick={handleNextQuestion}>
                        Next Question
                    </Button>
                </>
            )}
            <h2>Current Position: {currentLevel}</h2>
            <h2>Current Price:  Rs {currentPrize}</h2>

            {/* Add other components for remaining features (Quit, Lifeline, Final Prize, Leaderboard, etc.) */}
            <div>
                <Button variant="warning" onClick={handleFiftyFifty} disabled={lifelinesUsed.fiftyFifty}>
                    50-50
                </Button>
                <Button variant="info" onClick={handleAskTheAI} disabled={lifelinesUsed.askTheAI}>
                    Ask The AI
                </Button>
            </div>
        </div>
    );
};

export default GameScreen;
