// models/player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
    },
    prizeMoney: {
        type: Number,
        default: 0,
    },
    currentLevel: {
        type: Number,
        default: 1,
    },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
