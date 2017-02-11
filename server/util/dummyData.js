import Poll from '../models/poll'

export default function() {
  Poll.count().exec((err, count) => {
    if (count > 0) {
      return
    }

    const poll1 = new Poll({
      author: 'Matt Johnson',
      authorID: 'dummy|123',
      title: 'How do you feel about unit tests?',
      options: [
        {
          choice: 'Love them! I use them in every project.',
          numVotes: 5
        },
        {
          choice: `I like them, but I don't use them near often enough.`,
          numVotes: 10
        },
        {
          choice: 'Too complicated. I never use them.',
          numVotes: 3
        },
        {
          choice: 'Unit whats?',
          numVotes: 1
        }
      ]
    })

    const poll2 = new Poll({
      author: 'Megan Davies',
      authorID: 'dummy|456',
      title: 'Star Wars or Star Trek?',
      options: [
        {
          choice: 'May the force be with you!',
          numVotes: 50
        },
        {
          choice: 'Highly illogical. Only one choice!',
          numVotes: 50
        }
      ]
    })

    const poll3 = new Poll({
      author: 'Inigo Montoya',
      authorID: 'dummy|789',
      title: 'What is inconceivable?',
      options: [
        {
          choice: `He didn't fall?!?`,
          numVotes: 15
        },
        {
          choice: `You keep using that word. I do not think it means what you think it means.`,
          numVotes: 60
        },
        {
          choice: `not capable of being imagined or grasped mentally; unbelievable.`,
          numVotes: 5
        }
      ]
    })

    Poll.create([poll1, poll2, poll3], (error) => {
      if (!error) {
        console.log('Dummy data inserted')
      } else {
        console.log('error', error)
      }
    })
  })
}
