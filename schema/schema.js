const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt } = graphql;

//dummy data 
var books = [
    {name: 'Name of the wind', genre: 'Fantasy', id: '1', authorid: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorid: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorid: '3'},
    {name: 'No longer at ease', genre: 'Fantasy', id: '4', authorid: '2'},
    {name: 'purple hibsicus', genre: 'tragedy', id: '5', authorid: '1'},
    {name: 'Ake:The years of childhood', genre: 'autobiography', id: '6', authorid: '3'}
]

var authors = [
    {name: 'Chimamanda Adichie', age: 40, id: '1'},
    {name: 'Chinua Achebe', age: 89, id: '2'},
    {name: 'Wole Soyinka', age: 84, id: '3'}
]
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        genre: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id: parent.authorid})
            }
        }
    })
})
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        age: { type: GraphQLInt}
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: { type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db/other source
               return  _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})