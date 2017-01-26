import { Router } from 'express'
import * as PollController from '../controllers/poll.controller'
const router = new Router()

// Get all Polls
router.route('/polls').get(PollController.getPolls)

// Add a new Poll
router.route('/polls').post(PollController.addPoll)

export default router
