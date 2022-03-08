import mongoose from "mongoose"

const Schema = mongoose.Schema

const teamSchema = new mongoose.Schema({
  name: String,
  content: String,
  city: String,
}, {
  timestamps: true
})

const Team = mongoose.model('Team', teamSchema)

export {
  Team
}