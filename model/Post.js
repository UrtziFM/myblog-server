const mongoose = require('mongoose')

// const Schema = mongoose.Schema and const model = mongoose.model can de declared with destructuring:
const { Schema, model } = mongoose

const postSchema = new Schema(
  {
    title: String,
    picture: String,
    description: String,
    contentPost: String,
    category: {
    type: String,
    enum: ['Develop', 'Data', 'Business Strategy', 'Green Economy', 'Customer Experience', 'Digital Transformation', 'Agile']
  },
  date: {
    type: Date
  },
  postit: Boolean,
  views: Number,
  url: String
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
const Post = model('Post', postSchema) // Will be the books collection
module.exports = Post
