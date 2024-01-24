const mongoose = require('mongoose');
const Quiz = require('../models/quiz');

mongoose.connect('mongodb://localhost:27017/kbc-quiz', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

db.once('open', async () => {
    try {
        await Quiz.insertMany([
            {
                question: 'What is the capital of France?',
                options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
                correctOption: 'Paris',
                prize: 1000,
            },
            {
                question: 'Which planet is known as the Red Planet?',
                options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
                correctOption: 'Mars',
                prize: 10000,
            },
            // Add more questions as needed
        ]);

        console.log('Static questions inserted successfully.');
        db.close();
    } catch (error) {
        console.error('Error inserting questions:', error);
    }
});
