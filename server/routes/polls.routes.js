import { Router } from 'express'
import * as PollController from '../controllers/poll.controller'
const router = new Router()

// Get all Polls
router.route('/polls').get(PollController.getPolls)

// Get all Polls by Author
router.route('/polls/:authorID').get(PollController.getPollsByAuthor)

// Get specific Poll by ID
router.route('/poll/:id').get(PollController.getPollByID)

// Get vote status of user on a Poll
router.route('/poll/:id/:userID').get(PollController.hasVoted)

// Update numVote on Poll option
router.route('/poll/:id/:voteID').post(PollController.updateNumVote)

// Add a new Poll
router.route('/polls').post(PollController.addPoll)

// Add option to Poll
router.route('/polls/addoption/:id').post(PollController.addOption)

// Delete a Poll
router.route('/polls/remove/:id').delete(PollController.deletePoll)

export default router
