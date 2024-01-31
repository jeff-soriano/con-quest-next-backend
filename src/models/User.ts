import mongoose, { Document } from 'mongoose'

interface IUser extends Document {
  username: string
  userType: 'attendee' | 'organizer'
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userType: { type: String, required: true, enum: ['attendee', 'organizer'] },
})

const User = mongoose.model<IUser>('User', userSchema)
export default User
