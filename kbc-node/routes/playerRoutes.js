// routes/playerRoutes.js
const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

// Route to start a new game
router.post('/start', playerController.startGame);

// Route to answer a question
router.post('/answer', playerController.answerQuestion);

// Route to use a lifeline
// router.post('/use-lifeline', playerController.useLifeline);

// Route to quit the game
// router.post('/quit', playerController.quitGame);

// Route to view final result
// router.get('/final-result', playerController.finalResult);

module.exports = router;
