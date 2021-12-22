const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema  = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

mongoose.connect('mongodb+srv://therepositor:OLUWAlose0411@cluster0.tyedd.mongodb.net/cluster0?retryWrites=true&w=majority');
mongoose.connection.once('open', () =>  {
    console.log('database is connected')
})


app.listen(4000, () => {
    console.log('now listening to request on port 4000')
})