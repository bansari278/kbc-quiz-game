const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quizRoutes');
const playerRoutes = require('./routes/playerRoutes');

const Quiz = require('./models/quiz');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/kbc-quiz', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

db.once('open', async () => {
    console.log('Connected to MongoDB');

    try {
        const existingQuestions = await Quiz.find();
        if (existingQuestions.length === 0) {
            await Quiz.insertMany([
                {
                    question: 'WWhat is 2+7?',
                    options: ['3', '7', '9', '11'],
                    correctOption: '9',
                    prize: 1000,
                },
                {
                    question: 'What is 5x15?',
                    options: ['25', '50', '75', '100'],
                    correctOption: '75',
                    prize: 10000,
                },
                {
                    question: 'What is 6x9?',
                    options: ['54', '36', '24', '69'],
                    correctOption: '54',
                    prize: 10000,

                }, {
                    question: 'What is 0+0?',
                    options: ['0', '1', '100', '1000'],
                    correctOption: '0',
                    prize: 10000,

                }, {
                    question: 'How many alphabets are there in the word ‘apple’?',
                    options: ['10', '15', '5', '7'],
                    correctOption: '5',
                    prize: 10000,
                }, {
                    question: 'What is the colour of moon?',
                    options: ['red', 'orange', 'pink', 'white'],
                    correctOption: 'white',
                    prize: 10000,
                }, {
                    question: 'How many legs does a chicken have?',
                    options: ['1', '2', '4', '10'],
                    correctOption: '2',
                    prize: 10000,
                }, {
                    question: 'Which one of these is not a programming language?',
                    options: ['C', 'C++', 'Javascript', 'English'],
                    correctOption: 'English',
                    prize: 10000,
                }, {
                    question: 'How many days are there in a week?',
                    options: ['10', '5', '7', '6'],
                    correctOption: '7',
                    prize: 10000,
                }, {
                    question: 'Which of these is not a react library inbuilt hook?',
                    options: ['useState', 'useRef', 'useImperativeHandle', 'useLocalStorage'],
                    correctOption: 'useLocalStorage',
                    prize: 10000,
                },
            ]);
            console.log('Static questions inserted successfully.');
        } else {
            console.log('Questions already exist in the database.');
        }

        // console.log('Static questions inserted successfully.');
    } catch (error) {
        console.error('Error inserting questions:', error);
    }
});

const { getQuestion } = require('./controllers/questionController');
app.use('/api/quizzes', quizRoutes);
app.use('/api/players', playerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
