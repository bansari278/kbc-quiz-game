// QuitScreen.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/GameStart.css';

const QuitScreen = () => {
    const location = useLocation();
    const currentPathname = location.pathname;
    const currentPrize = location.state?.currentPrize || 0; // Default to 0 if state is undefined
    const displayName = location.state?.displayName || ""; // Default to 0 if state is undefined

    return (
        <div className="game-start-container">
            {currentPathname === "/winner" ? (
                <>
                    <h2>Congratulations, Winner!</h2>
                    <p>{displayName}, you are the ultimate winner with Rs {currentPrize} prize money.</p>
                </>
            ) : (
                <>
                    <h2>Congratulations!</h2>
                    <p>{displayName} have won Rs {currentPrize} prize money.</p>
                </>
            )}
        </div>
    );
};

export default QuitScreen;
