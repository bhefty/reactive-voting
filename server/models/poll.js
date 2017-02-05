import mongoose from 'mongoose'
import cuid from 'cuid'
const Schema = mongoose.Schema

const optionsSchema = new Schema({
  _id: { type: 'String', required: true, unique: true, default: cuid},
  choice: { type: 'String', required: true },
  numVotes: { type: 'Number', default: 0, required: true }
})

const pollSchema = new Schema({
  _id: { type: 'String', required: true, unique: true, default: cuid},
  author: { type: 'String', required: true },
  title: { type: 'String', required: true },
  options: { type: [optionsSchema], required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true }
})

export default mongoose.model('Poll', pollSchema)


// {
//   author: 'Bill',
//   title: 'Best coffee?',
//   options: [
//     {
//       choice: 'Starbucks',
//       numVotes: 0
//     },
//     {
//       choice: 'Dunkin',
//       numVotes: 0
//     },
//     {
//       choice: 'Petes',
//       numVotes: 0
//     }
//   ]
// }
