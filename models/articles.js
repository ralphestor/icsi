const mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
    
});

module.exports = mongoose.model('Articles', articlesSchema);