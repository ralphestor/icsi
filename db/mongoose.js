const mongoose = require('mongoose');

module.exports.main = async () => {
    const url = process.env.MONGOURL;
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

