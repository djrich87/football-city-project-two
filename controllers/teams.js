import { Team } from "../models/team.js"

function newTeam(req, res) {
  Team.find({}, function (err, teams) {
    res.render('teams/new', {
      title: "Football City: Add Team",
      teams
    })
  })
}

function create(req, res) {
  Team.create(req.body, function (err, performer) {
    res.redirect('/teams/new')
  })
}


export {
  newTeam as new,
  create,
}