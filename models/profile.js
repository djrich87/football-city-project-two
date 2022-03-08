import mongoose from 'mongoose'

const nflTeamsSchema = new mongoose.Schema({
  name: String,
  content: String,
  city: String,
}, {
  timestamps: true
})

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  teams: [nflTeamsSchema],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
