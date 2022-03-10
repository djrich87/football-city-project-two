import { Router } from 'express'
import * as teamsCtrl from "../controllers/teams.js"

const router = Router()

// GET - localhost:3000/teams/new
router.get('/new', teamsCtrl.new)

// POST - localhost:3000/teams
router.post('/', teamsCtrl.create)

export {
  router
}