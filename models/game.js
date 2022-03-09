import mongoose from "mongoose"

const Schema = mongoose.Schema

const gameSchema = new Schema({
  name: String,
  title: String,
  date: Date,
  location: String,
  teams: [{type: Schema.Types.ObjectId, ref: "Team"}],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}