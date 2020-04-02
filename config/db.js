const debug = require('debug')('backend-blog:db')
const mongoose = require('mongoose')

const DB_URI = process.env.DB_URI 

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    debug(`Connected to the database: ${DB_URI}`)
  })
  .catch(() => {
    debug('There was an error connecting to the database!')
  })

mongoose.set('useCreateIndex', true)
