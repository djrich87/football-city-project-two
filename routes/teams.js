import { Router } from 'express'
import * as teamsCtrl from "../controllers/teams.js"

const router = Router()

// localhost:3000/teams

router.get('/new', teamsCtrl.new)

export {
  router
}