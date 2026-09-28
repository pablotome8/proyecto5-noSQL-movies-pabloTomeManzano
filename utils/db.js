const mongoose = require('mongoose');

const urlDb = 'mongodb://127.0.0.1:27017/proyecto5-noSQL-movies'

const connect = async () => {
    try {
        await mongoose.connect(urlDb);
        console.log(`Conected with db succesfully`);
    }catch(error) {
        console.log('Error to connect with db')
    };
}

module.exports = {
    connect
};