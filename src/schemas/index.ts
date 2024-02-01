// src/schemas/typeDefs.ts
import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    userType: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, userType: String!): User
  }
`
