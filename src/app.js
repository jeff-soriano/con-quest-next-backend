// src/app.js
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

// Create Express application
const app = express()

// Connect to MongoDB (update the URI with your credentials)
mongoose.connect('mongodb://localhost:27017/myproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Initialize Apollo Server (update with your schemas and resolvers)
const server = new ApolloServer({ typeDefs: [], resolvers: [] })
server.applyMiddleware({ app })

// Start the server
const PORT = 4000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
