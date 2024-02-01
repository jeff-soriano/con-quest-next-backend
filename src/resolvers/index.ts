// src/resolvers/resolvers.ts
import { IResolvers } from '@graphql-tools/utils'
import User from '../models/User' // Assuming you have a User model set up with Mongoose

export const resolvers: IResolvers = {
  Query: {
    async users() {
      return await User.find({})
    },
    async user(_: any, { id }) {
      return await User.findById(id)
    },
  },
  Mutation: {
    async createUser(_: any, { username, userType }) {
      const newUser = new User({ username, userType })
      return await newUser.save()
    },
  },
}
