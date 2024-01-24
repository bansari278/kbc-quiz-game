const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctOption: String,
    prize: Number,
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
