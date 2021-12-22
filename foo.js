const express = require('express');
const schema = require('./schema/bar')
const { graphqlHTTP } = require('express-graphql')
const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(8000, () => {
    console.log('yeah i got my eyes on you')
})