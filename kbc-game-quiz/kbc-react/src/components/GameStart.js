// src/components/GameStart.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/GameStart.css';

const GameStart = ({ onStartGame }) => {
    const [displayName, setDisplayName] = useState('');
    const [isDisplayNameValid, setIsDisplayNameValid] = useState(true);
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();

    const handleStartGame = async () => {
        if (displayName.trim() !== '') {
            try {
                const response = await axios.post('http://localhost:8080/api/players/start', {
                    displayName,
                });

                // Handle the response from the server, e.g., update state, redirect, etc.
                console.log('Server response:', response.data);

                // Trigger the callback provided by the parent component
                onStartGame(displayName);
                // history.push('/playing');
                navigate('/playing');

            } catch (error) {
                console.error('Error starting the game:', error);
            }
        }
        else {
            // Display validation error if display name is blank
            setIsDisplayNameValid(false);
            setValidationError('Display Name cannot be blank.');
        }
    };

    return (
        <div className="game-start-container">
            <h2>Welcome to KBC - The Quiz Game</h2>
            <p>
                Test your knowledge and win exciting prizes. Enter your display name to start the game.
            </p>
            <Form>
                <Form.Group controlId="formDisplayName">
                    <Form.Label>Display Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your display name"
                        value={displayName}
                        onChange={(e) => {
                            setDisplayName(e.target.value);
                            setIsDisplayNameValid(true); // Reset validation when user types
                            setValidationError('');
                        }}
                        isInvalid={!isDisplayNameValid}
                    />
                    {validationError && (
                        <div style={{ color: 'red', marginTop: '5px' }}>{validationError}</div>
                    )}
                </Form.Group>
                <Button variant="primary" onClick={handleStartGame}>
                    {/* <Link to="/playing" style={{ color: 'white' }}> */}
                    Start Game
                    {/* </Link> */}
                </Button>
            </Form>
        </div>
    );
};

export default GameStart;
