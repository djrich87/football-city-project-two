import { Game } from '../models/game.js'
import { Profile } from '../models/profile.js'
import { Team } from '../models/team.js'

function index(req, res) {
  Game.find({}).then((games) => {
    Team.find({}).then(teams => {
      res.render('games/index', {
        games,
        teams,
        title: 'games',
      })
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect("/games")
  })
}
// async function index (req, res) {
//   const games = await Game.find({})
//   const teams = await Team.find({})
//   res.render('games/index', {
//     games,
//     teams,
//     title: 'games',
//   })
// }

// async way of writing above function



function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.attended = !!req.body.attended
  Game.create(req.body)
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
    Profile.findById(req.user.profile._id).then(profile => {
      const attending = profile.attendedGames.includes(req.params.id)
      res.render('games/show', {
      game,
      attending,
      title: "games",
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}

// function flipAttended(req, res) {
//   Game.findById(req.params.id)
//   .then(game => {
//     game.attended = !game.attended
//     game.save()
//     .then(() => {
//       res.redirect(`/games/${game._id}`)
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/games')
//   })
// }

function flipAttended(req, res) {
  Profile.findById(req.user.profile._id, function (err, profile) {
    profile.attendedGames.push(req.params.id)
    profile.save(function (err) {
      res.redirect(`/games/${req.params.id}`)
    })
  })
}


function edit(req, res) {
  Game.findById(req.params.id)
  .then(game => {
    console.log('game', game)
    res.render('games/edit',{
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
  console.log('req.body', req.body)
  Game.findById(req.params.id)
  .then(game => {
    // if (game.teams.equals(req.user.profile._id)) {
      console.log('game', game)
    req.body.attended = !!req.body.attended
    game.updateOne(req.body, {new: true})
    .then(()=> {
      res.redirect(`/games/${game._id}`)
    // })
    // } else {
    //   throw new Error ('🚫 Not authorized 🚫')
    // }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/games')
  })
}
  )}

function deleteGame(req, res) {
Game.findById(req.params.id)
.then(game => {
  // if (game.teams.equals(req.user.profile._id)) {
    game.delete()
    .then(() => {
      res.redirect('/games')
    })
  // } else {
  //   throw new Error ('🚫 Not authorized 🚫')
  //   }
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