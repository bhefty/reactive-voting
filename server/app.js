import Express from 'express'
import morgan from 'morgan'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

// import polls from './routes/poll.routes'
// import dummyData from './dummyData'

const app = new Express()

mongoose.Promise = global.Promise
const MONGO_URI = process.env.REACT_APP_MONGO_URI || 'mongodb://localhost/reactive-voting-dev'
mongoose.connect(MONGO_URI, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!')
    throw error
  }
  console.log('Connected to DB!')
  // dummyData()
})

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))
app.use(bodyParser.json({ lmit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
app.use(Express.static(path.resolve(__dirname, '..', 'build')))
// app.use('/api', polls)

app.use('/test', (req, res) => {
  res.send('test')
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

export default app
