const mongoose = require('mongoose');
const connectDB = async () => {

    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Połączono Z Bazą Danych: ${conn.connection.host}`);
    } catch (error){
        console.log(error);
    }

}

module.exports = connectDB;