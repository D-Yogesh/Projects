const express = require('express');
require('dotenv').config();
const schema = require('./schema/schema');
const {graphqlHTTP} = require('express-graphql')

const PORT = process.env.PORT || 3000;

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'DEV'
}))

app.listen(PORT, console.log(`Server running on PORT ${PORT}`))