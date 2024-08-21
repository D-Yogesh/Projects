require('dotenv').config();

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// console.log({ENV, PORT, MONGODB_URI})

module.exports = {ENV, PORT, MONGODB_URI}