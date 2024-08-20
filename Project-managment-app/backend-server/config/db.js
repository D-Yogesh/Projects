const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

const connectDB = async () => {
    const conn = await mongoose.connect(MONGODB_URI);

    console.log(`MongoDB connected to ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;