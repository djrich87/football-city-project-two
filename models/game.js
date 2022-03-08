import mongoose from "mongoose"

const Schema = mongoose.Schema

const gameSchema = new Schema({
  name: String,
  title: String,
  date: Date,
  location: String,
  attended: Boolean,
  teams: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}