import mongoose from "mongoose"

const Schema = mongoose.Schema

const teamSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  content: String,
  city: String,
}, {
  timestamps: true
})

const Team = mongoose.model('Team', teamSchema)

export {
  Team
}