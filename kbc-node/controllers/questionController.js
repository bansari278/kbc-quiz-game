const Quiz = require('../models/quiz');
const { shuffleArray } = require('../utils/helpers');

let usedQuestions = [];

const getQuestion = async () => {
    try {
        if (usedQuestions.length === 0) {
            const allQuestions = await Quiz.find();
            usedQuestions = shuffleArray(allQuestions);
        }

        const nextQuestion = usedQuestions.pop();

        return {
            question: nextQuestion.question,
            options: nextQuestion.options,
            correctOption: nextQuestion.correctOption,
            prize: nextQuestion.prize,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = {
    getQuestion,
};
