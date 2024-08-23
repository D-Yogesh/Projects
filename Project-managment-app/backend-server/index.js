const express = require('express');
const schema = require('./schema/schema');
const {graphqlHTTP} = require('express-graphql')
const colors = require('colors');
const connectDB = require('./config/db');
const { PORT, ENV } = require('./config/config');
const cors = require('cors')


const app = express()

connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: ENV === 'DEV'
}))

app.listen(PORT, console.log(`Server running on PORT ${PORT}`))