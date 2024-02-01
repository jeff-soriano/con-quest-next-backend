import 'dotenv/config'

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

import express from 'express'
import http from 'http'
import cors from 'cors'

import { typeDefs } from './schemas'
import { resolvers } from './resolvers'
import mongoose from 'mongoose'
import connectToDatabase from './database'

interface MyContext {
  token?: String
}

async function startApolloServer() {
  await connectToDatabase() // Ensure database connection before starting the server

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

  // Start the HTTP server
  const PORT = process.env.PORT || 4000
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
}

startApolloServer()
