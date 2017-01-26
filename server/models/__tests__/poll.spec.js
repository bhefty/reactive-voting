import test from 'ava'
import request from 'supertest'
import app from '../../app'
import Poll from '../poll'
import { connectDB, dropDB } from '../../util/test-helpers'

// Initial polls added into test db
const polls = [
  new Poll({ author: 'Bill', title: 'Best coffee?', options: [{choice: 'Starbucks', numVotes: 0}, {choice: 'Dunkin', numVotes: 0}, {choice: 'Petes', numVotes: 0}], cuid: 'f34gb2bh24b24b2' }),
  new Poll({ author: 'Alan', title: 'Best movie series?', options: [{choice: 'Star Wars', numVotes: 0}, {choice: 'Harry Potter', numVotes: 0}, {choice: 'Lord of the Rings', numVotes: 0}], cuid: 'f34gb2bh24b24b3' })
]

test.beforeEach('connect and add two poll entries', t => {
  connectDB(t, () => {
    Poll.create(polls, err => {
      if (err) t.fail('Unable to create posts')
    })
  })
})

test.afterEach.always(t => {
  dropDB(t)
})

test.serial('Should give correct number of Polls', async t => {
  t.plan(2)

  const res = await request(app)
    .get('/api/polls')
    .set('Accept', 'application/json')

  t.is(res.status, 200)
  t.deepEqual(polls.length, res.body.polls.length)
})

test.serial('Should correclty add a poll', async t => {
  t.plan(2)

  const res = await request(app)
    .post('/api/polls')
    .send({ poll: { author: 'Foo', title: 'bar', options: [{ choice: 'fiz', numVotes: 0 }, { choice: 'buz', numVotes: 0 }]} })
    .set('Accept', 'application/json')

  t.is(res.status, 200)

  const savedPoll = await Poll.findOne({ title: 'bar' }).exec()
  t.is(savedPoll.author, 'Foo')
})
