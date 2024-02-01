// src/database.ts
import mongoose from 'mongoose'

const connectToDatabase = async () => {
  const dbUri =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/myDatabase'

  try {
    await mongoose.connect(dbUri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Could not connect to MongoDB', error)
    process.exit(1) // Exit in case of connection error
  }
}

export default connectToDatabase
