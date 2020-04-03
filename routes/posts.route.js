const express = require('express')

const postsController = require('../controllers/posts.controller')

const router = express.Router()

router.get('/', postsController.getPosts)
// This route will assign the value in /:id to a variable name.
// Example: /books/Titanic => { id: 'ua129hf8anb3' }
router.get('/:id', postsController.getPostById)

router.post('/new', postsController.createPost)
router.post('/edit', postsController.editPost)

router.delete('/:id', postsController.deletePost)


module.exports = router
