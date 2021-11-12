const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
    _id: {
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
    imgUrl: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Articles', articlesSchema);