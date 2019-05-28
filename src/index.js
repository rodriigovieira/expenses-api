const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./typedefs')
const resolvers = require('./resolvers')
const { prisma } = require('./generated/prisma-client')

const app = express()

const port = process.env.PORT || 4000

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req: request }) => ({ request, prisma })
})

server.applyMiddleware({ app })

// Redirecting GET requests on / to /graphql

app.get('/', (req, res) => {
  res.writeHead(301, { Location: '/graphql' })

  res.end()
})

app.listen(port, () => console.log(`The server is being executed at port ${port}!`))
