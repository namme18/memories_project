const express = require('express');
const { getPosts, createPost, updatePost, deletePost, likePost } = require('../controllers/posts');

const router =  express.Router();

router.get('/allposts', getPosts);
router.post('/addpost', createPost);
router.patch('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);
router.patch('/likepost/:id', likePost);

module.exports = router;