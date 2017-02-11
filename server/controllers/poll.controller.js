import Poll from '../models/poll'
import cuid from 'cuid'
import sanitizeHtml from 'sanitize-html'

export function getPolls(req, res) {
  Poll.find({}, (err, polls) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(polls)
  })
}

export function getPollsByAuthor(req, res) {
  Poll.find({ authorID: req.params.authorID }, (err, polls) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(polls)
  })
}

export function getPollByID(req, res) {
  Poll.findOne({ _id: req.params.id }, (err, poll) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(poll)
  })
}

export function hasVoted(req, res) {
  Poll.findOne({
    _id: req.params.id,
    userVotes: req.params.userID
  }, (err, doc) => {
    if (err) {
      res.status(500).send(err)
    }
    if (doc) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
}

export function updateNumVote(req, res) {
  Poll.findOneAndUpdate(
    {
      _id: req.params.id,
      'options._id': req.params.voteID
    },
    {
      $inc: { 'options.$.numVotes': 1 },
      $push: { userVotes: req.body.userID }
    },
    (err, poll) => {
      if (err) {
        res.status(500).send(err)
      }
      res.send(poll)
    }
  )
}

export function addPoll(req, res) {
  if (!req.body.author || !req.body.authorID || !req.body.title || !req.body.options) {
    res.status(403).end()
  }

  const newPoll = new Poll(req.body)

  // Sanitize inputs
  newPoll.author = sanitizeHtml(newPoll.author)
  newPoll.authorID = sanitizeHtml(newPoll.authorID)
  newPoll.title = sanitizeHtml(newPoll.title)
  // // TODO: Sanitize the options without throwing error
  // // newPoll.options = sanitizeHtml(newPoll.options)

  newPoll.save((err, saved) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    }
    res.send(saved)
  })
}

export function deletePoll(req, res) {
  let id = req.params.id
  Poll.findOneAndRemove({
    _id: id
  }, (err, poll) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(poll)
  })
}
