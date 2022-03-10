import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: "Football City: Profiles"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then((profile) => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      res.render('profile/show', {
        title: `NFL${profile.name}'s profile`,
        profile,
        isSelf,
      })
    })
  })
  .catch((err => {
    console.log(err)
    res.redirect("/")
  }))
}

function createTeam(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.teams.push(req.body)
    profile.save()
    .then(() =>{
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

export {
  index,
  show,
  createTeam,
}