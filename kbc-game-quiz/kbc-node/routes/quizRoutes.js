const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
const questionController = require('../controllers/questionController');


// Get all quizzes
// router.get('/', async (req, res) => {
//     try {
//         const quizzes = await Quiz.find();
//         res.json(quizzes);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// Add a new quiz
// router.post('/', async (req, res) => {
//     const { question, options, correctOption, prize } = req.body;

//     try {
//         const newQuiz = new Quiz({
//             question,
//             options,
//             correctOption,
//             prize,
//         });

//         await newQuiz.save();
//         res.status(201).json({ message: 'Quiz added successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.get('/', async (req, res) => {
    const nextQuestion = await questionController.getQuestion();
    console.log("data", nextQuestion);

    if (nextQuestion) {
        res.json(nextQuestion);
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
