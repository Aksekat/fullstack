require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { UniqueDirectiveNamesRule } = require('graphql') //eslint-disable-line
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const pubsub = new PubSub()
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    books: [Book]
    bookCount: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book,

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author,

    createUser(
      username: String!
      favoriteGenre: String!
    ): User,

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
}    
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      const filteredBooks = args.genre
        ? Book.find({ genres: { $in: [args.genre] } }).populate('author', { name: 1 })
        : Book.find({}).populate('author', { name: 1 })
      return filteredBooks
    },
    allAuthors: () => {
      return Author.find({}).populate('books')
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      return root.books.length
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author })
      // Add author to the database if they are not found
      if (!author) {
        const authorToAdd = new Author({ name: args.author })
        try {
          author = await authorToAdd.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args.author })
        }
      }
      try {
        const book = new Book({ ...args, author: author._id })
        const savedBook = await book.save()
        author.books = author.books.concat(savedBook._id)
        await author.save()
        await savedBook.populate('author', { name: 1 }).execPopulate()
        pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })
        return savedBook
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const authorToUpdate = await Author.findOne({ name: args.name })
      if (!authorToUpdate) {
        throw new UserInputError('author not found', { invalidArgs: args.name })
      }
      authorToUpdate.born = args.setBornTo
      return authorToUpdate.save()
    },

    createUser: (root, args) => {
      const user = new User({ ...args })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})