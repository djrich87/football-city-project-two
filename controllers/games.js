// import req from 'express/lib/request'
import { Game } from '../models/game.js'

function index(req, res) {
  Game.find({})
  .then(games => {
    res.render('games/index', {
      games,
      title: 'games',
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect("/games")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.attended = !!req.body.attendedGame.create(req.body)
  .then(game => {
    res.redirect('/games')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function show(req, res) {
  Game.findById(req.params.id)
  .populate('teams')
  .then(game => {
    res.render('games/show', {
    game,
    title: "games",
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function flipAttended(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    game.attended = !game.attended
    game.save()
    .then(() => {
      res.redirect(`/games/${game._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function edit(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    res.render('game/edit',{
      game,
      title: "edit game"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function update(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    if (game.teams.equals(req.user.profile._id)) {
    req.body.attended = !!req.body.attended
    game.updateOne(req.body, {new: true})
    .then(()=> {
      res.redirect(`/games/${game._id}`)
    })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

function deleteGame(req, res) {
Game.findById(req.params.id)
.then(game => {
  if (game.teams.equals(req.user.profile._id)) {
    game.delete()
    .then(() => {
      res.redirect('/games')
    })
  } else {
    throw new Error ('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

export {
  index,
  create,
  show,
  flipAttended,
  edit,
  update,
  deleteGame as delete,
}