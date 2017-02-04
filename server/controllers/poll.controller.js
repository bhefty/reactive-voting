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
  Poll.find({ author: req.params.author }, (err, polls) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(polls)
  })
}

export function addPoll(req, res) {
  if (!req.body.author || !req.body.title || !req.body.options) {
    res.status(403).end()
  }

  const newPoll = new Poll(req.body)

  // Sanitize inputs
  newPoll.author = sanitizeHtml(newPoll.author)
  newPoll.title = sanitizeHtml(newPoll.title)
  // // TODO: Sanitize the options without throwing error
  // // newPoll.options = sanitizeHtml(newPoll.options)

  newPoll.cuid = cuid()
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
    cuid: id
  }, (err, poll) => {
    if (err) {
      res.status(500).send(err)
    }
    res.send(poll)
  })
}
