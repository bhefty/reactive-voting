import { Router } from 'express'
import * as PollController from '../controllers/poll.controller'
const router = new Router()

// Get all Polls
router.route('/polls').get(PollController.getPolls)

// Get all Polls by Author
router.route('/polls/:author').get(PollController.getPollsByAuthor)

// Add a new Poll
router.route('/polls').post(PollController.addPoll)

// Delete a Poll
router.route('/polls/remove/:id').delete(PollController.deletePoll)

export default router
