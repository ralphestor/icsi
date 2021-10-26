const mongoose = require('mongoose');

module.exports.main = async () => {
    const url = 'mongodb+srv://Mongo_Ralph:12345@cluster0.t4aio.mongodb.net/ArticlesDB?retryWrites=true&w=majority';
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('CONNECTION SUCCESSFUL!');
    } catch(e) {
        console.log('CONNECTION ERROR', e);
    }
}

