const express = require('express');
const PostsController = require('../controllers/posts.controller');

const router = express.Router();

// Parte I
router.get('/', PostsController.getPosts);
router.post('/', PostsController.createPost);

// Parte II
router.put('/like/:id', PostsController.likePost);
router.delete('/:id', PostsController.deletePost); 

module.exports = router;
