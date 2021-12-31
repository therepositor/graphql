const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema  = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');



const port = process.env.Port;
const graphQLPathName = process.env.GraphQLPathName;
const mongoDBURL = process.env.MongoDBURL;

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

mongoose.connect(mongoDBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true

})
.then(db => console.log('Db connection established'))
.catch(err => console.log(err));
mongoose.connection.once('open', () =>  {
    console.log('database is connected');
})

console.log(port)
app.listen(4000, () => {
    console.log('now listening to request on port 4000');
})