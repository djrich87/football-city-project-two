import mongoose from "mongoose"

const Schema = mongoose.Schema

const gameSchema = new Schema({
  name: String,
  title: String,
  date: Date,
  location: String,
  teams: ObjectId,
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}