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

export {
  index,
  create,
  show,
}