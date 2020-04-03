const createError = require('http-errors');

const Post = require ('../model/Post');

const getPosts = (req, res, next) => {
    Post.find()
      .then(books => {
        res.status(200).render('posts', { posts: posts })
      })
      .catch(err => {
        next(err)
      })
  }
  
  // We will receive the book id in req.params.id
  const getPostById = (req, res, next) => {
    const id = req.params.id
  
    Post.findById(id)
      .populate('posts')
      .then(post => {
        res.status(200).render('post', { post: post })
      })
      .catch(() => {
        next(createError(404))
      })
  }
  
  const createPost = (req, res, next) => {
  const newPost = new Post({
  
    title = req.body.title,
    url = req.body.url,
    picture = req.body.picture,
    description = req.body.description,
    contentPost = req.body.contentPost,
    category = req.body.category,
    date = req.body.date,
    postit = req.body.postit,
    likes = req.body.likes,
    views = req.body.views,
})
    newPost
    .save()
    .then(() => {
      res.redirect('/posts')
    })
    .catch(err => {
      next(err)
  });
}

const editPost = (req, res, next) => {
    const id = req.body.id
    const title = req.body.title
    const url = req.body.url
    const picture = req.body.picture
    const description = req.body.description
    const contentPost = req.body.contentPost
    const category = req.body.category
    const date = req.body.date
    const postit = req.body.postit
    const likes = req.body.likes
    const views = req.body.views
  
    Book.findByIdAndUpdate(id, { title, url, picture, description, contentPost, category, date, postit, likes, views })
      .then(() => {
        res.redirect('/posts')
      })
      .catch(err => {
        next(err)
      })
  }
  
  const deletePost = (req, res, next) => {
    const id = req.params.id
  
    Book.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json('Deleted post!')
      })
      .catch(err => {
        next(err)
      })
  }
  

module.exports = {
  getPosts,
  getPostById,
  createPost,
  editPost,
  deletePost
};

