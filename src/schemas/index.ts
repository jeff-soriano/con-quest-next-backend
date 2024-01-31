import gql from 'graphql-tag'

// Define your GraphQL types and schema
export const typeDefs = gql`
  type Query {
    // Define your queries here
    // Example: users: [User]
  }

  type Mutation {
    // Define your mutations here
    // Example: addUser(username: String!): User
  }

  // Define your other types here
  // Example: type User { id: ID!, username: String! }
`
