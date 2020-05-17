const mongoose = require('mongoose')


// const Schema = mongoose.Schema and const model = mongoose.model can de declared with destructuring:
const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true }
},{
  toJSON: {
    // doc is the document in the db, ret is the object transformation to json
    // This will let us configure the json obtained as a response
    transform: (doc, ret) => {
      ret.id = doc._id

      delete ret._id
      delete ret.createdAt
      delete ret.updatedAt
      delete ret.__v

      return ret
    }
  },
  timestamps: true
}
  
)


// A model is ALWAYS in uppercase and singular, mongoose will name the collection with lowercase and plural
const User = model('User', userSchema) // Will be the books collection
module.exports = User