import { Team } from "../models/team.js"

function newTeam(req, res) {
  Team.find({}, function (err, teams) {
    res.render('teams/new', {
      title: "Add Team",
      teams
    })
  })
}

export {
  newTeam as new,
}