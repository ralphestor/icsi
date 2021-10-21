const mongoose = require('mongoose');

module.exports.main = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/icsiArticles', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('CONNECTION SUCCESSFUL');
    } catch(e) {
        console.log('CONNECTION ERROR', e);
    }
}

