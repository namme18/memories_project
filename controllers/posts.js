const mongoose = require('mongoose');
const PostMessage = require('../models/Post');

exports.getPosts = (req ,res) => {
    PostMessage.find()
        .sort({createdAt: -1})
        .then(postMessages => {
            return res.status(200).json(postMessages);
        })
        .catch(err => {
            return res.status(404).json({
                msg: err.message
            });
        })
}

exports.createPost = (req, res) => {
    const post = req.body;

    if(!post.message || !post.creator || !post.tags || !post.title || !post.selectedFile){
       return res.status(400).json({
            msg: 'Please input all fields'
        })
    }

    const newPost = new PostMessage(post);

    newPost.save()
        .then(() => {
           return res.status(200).json({
                newPost,
                msg: 'Save success!'
            });
        })
        .catch(err => {
           return res.status(400).json({
            msg: err.message
           });
        });
}

exports.updatePost = (req, res) => {
    const id = req.params.id;
    const post = req.body;
    console.log(id)

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({
        msg: 'No post with that id'
    })

    PostMessage
        .findByIdAndUpdate(id, post, {new: true})
        .then(updatedPost => {
            return res.status(200).json(updatedPost);
        })
        .catch(err => {
            console.log(err);
            res.status(400).jsopn({
                msg: "Can't update post!"
            });
        })
}

exports.deletePost = (req, res) => {

    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: 'No post with that id!'});

    PostMessage.findById(id)
        .then(post => post.remove().then(() => res.status(200).json({msg: 'Deleted successfully!'})))
        .catch(err => {
            //console.log(err)
            return res.status(404).json({
                msg: 'Cant delete post!'
            });
        })

}

exports.likePost = (req, res) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Can't like post!" });

    PostMessage.findById(id)
        .then(post => {
            PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1},{ new: true } )
                .then(newPost => {
                    return res.status(200).json(newPost);
                })
                .catch(err => {
                    console.log(err);
                    return res.status(404).json({msg: "Can't like post"});
                })
        })
}