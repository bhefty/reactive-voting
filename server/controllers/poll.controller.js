import Poll from '../models/poll'
import cuid from 'cuid'
import sanitizeHtml from 'sanitize-html'

export function getPolls(req, res) {
  Poll.find().sort('-dateAdded').exec((err, polls) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ polls })
  })
}

export function addPoll(req, res) {
  if (!req.body.poll.author || !req.body.poll.title || !req.body.poll.options) {
    res.status(403).end()
  }

  const newPoll = new Poll(req.body.poll)

  // Sanitize inputs
  newPoll.author = sanitizeHtml(newPoll.author)
  newPoll.title = sanitizeHtml(newPoll.title)
  // TODO: Sanitize the options without throwing error
  // newPoll.options = sanitizeHtml(newPoll.options)

  newPoll.cuid = cuid()
  newPoll.save((err, saved) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    }
    res.json({ poll: saved })
  })
}
