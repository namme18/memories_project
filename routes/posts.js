const express = require('express');
const { getPosts, createPost, updatePost, deletePost, likePost, searchPosts, getOnePost } = require('../controllers/posts');
const auth = require('../middleware/auth');

const router =  express.Router();


router.get('/onepost/:id', getOnePost);
router.get('/allposts', getPosts);
router.get('/search', searchPosts);
router.post('/addpost', auth, createPost);
router.patch('/update/:id', auth, updatePost);
router.delete('/delete/:id', auth, deletePost);
router.patch('/likepost/:id', auth, likePost);

module.exports = router;