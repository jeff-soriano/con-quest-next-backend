import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import express from 'express'
import http from 'http'
import cors from 'cors'

import { typeDefs } from './schemas'
import { resolvers } from './resolvers'
import mongoose from 'mongoose'

interface MyContext {
  token?: String
}

async function startApolloServer() {
  // Create the Express application
  const app = express()

  // Create an HTTP server
  const httpServer = http.createServer(app)

  // Create Apollo Server instance
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  // Start the Apollo Server
  await server.start()

  // Apply the Express app as middleware to the Apollo Server
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  )

  // Connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/yourDatabaseName')
  console.log('Connected to MongoDB')

  // Start the HTTP server
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
}

startApolloServer()
