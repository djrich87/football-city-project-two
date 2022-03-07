import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'

const router = Router()

// GET - localhost:3000/games
router.get('/', gamesCtrl.index)


export {
  router
}