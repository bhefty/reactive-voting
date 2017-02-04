import sinon from 'sinon'
import * as PollController from '../poll.controller'
import Poll from '../../models/poll'

// const a = { author: 'Bill', title: 'Best coffee?', options: [{choice: 'Starbucks', numVotes: 0}, {choice: 'Dunkin', numVotes: 0}, {choice: 'Petes', numVotes: 0}], cuid: 'f34gb2bh24b24b2' }
// const b = { author: 'Alan', title: 'Best movie series?', options: [{choice: 'Star Wars', numVotes: 0}, {choice: 'Harry Potter', numVotes: 0}, {choice: 'Lord of the Rings', numVotes: 0}], cuid: 'f34gb2bh24b24b3' }


describe('Polls Router', () => {
  beforeEach(() => {
    sinon.stub(Poll, 'find')
  })

  afterEach(() => {
    Poll.find.restore()
  })

  it('should send all polls', () => {
    Poll.find.yields(null, [])
    let req = { params: { } }
    let res = {
      send: sinon.stub()
    }

    PollController.getPolls(req, res)
    sinon.assert.calledWith(res.send, [])
  })

  it('should send specific poll', () => {
    Poll.find.yields(null, [])
    let req = {
      params: {
        author: 'Bill'
      }
    }
    let res = { send: sinon.stub() }

    PollController.getPollsByAuthor(req, res)

    sinon.assert.calledWith(Poll.find, { author: 'Bill' })
  })

})
