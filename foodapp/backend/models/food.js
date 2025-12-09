const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodname: {
        type: String,
        required: true
    },
    daysSinceIAte: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('food', foodSchema);
