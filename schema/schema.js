const graphql = require("graphql");

const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// Dummy Data
var books = [
  { name: "Bir Bilim Adamın Romanı", genre: "Biographical Fiction", id: "1", authorId: "1" },
  { name: "Tehlikeli Oyunlar", genre: "Fiction", id: "2", authorId: "1" },
  { name: "Oyunlarla Yaşayanlar", genre: "Fiction", id: "3", authorId: "1" },
  { name: "1984", genre: "Science Fiction", id: "4", authorId: "2" },
  { name: "Hayvan Çiftliği", genre: "Fiction", id: "5", authorId: "2" },
  { name: "Kürk Mantolu Madonna", genre: "Fiction", id: "6", authorId: "3" },
  { name: "İçimizdeki Şeytan", genre: "Fiction", id: "7", authorId: "3" },
];

var authors = [
  { name: "Oğuz Atay", age: 43, id: "1" },
  { name: "George Orwell", age: 47, id: "2" },
  { name: "Sabahattin Ali", age: 41, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id })
      }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
