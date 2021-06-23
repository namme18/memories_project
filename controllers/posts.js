const mongoose = require('mongoose');
const PostMessage = require('../models/Post');

exports.getPosts = async(req ,res) => { // get posts by page
    const { page } = req.query;
    const LIMIT = 8; // delclare limit
    const startIndex = (Number(page)- 1) * LIMIT; //start index
    const totalPosts = await PostMessage.countDocuments({});
    PostMessage.find()
        .sort({_id: -1})
        .limit(LIMIT)
        .skip(startIndex)
        .then(postMessages => {
            return res.status(200).json({
                data: postMessages,
                currentPage: Number(page),
                numberOfPage: Math.ceil(totalPosts / LIMIT)
            });
        })
        .catch(err => {
            return res.status(404).json({
                msg: err.message
            });
        })
}

exports.searchPosts = (req, res) => {
    const {searchQuery, tags} = req.query;
    
    const title = new RegExp(searchQuery, 'i');
    PostMessage.find({$or:[{title},{tags: {$in: tags.split(',')}}]})
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(400).json({
                msg: "can't search post!"
            })
        })

}

exports.createPost = (req, res) => {
    const post = req.body;

    if(!post.message || !post.tags || !post.title || !post.selectedFile){
       return res.status(400).json({
            msg: 'Please input all fields'
        })
    }
    const newPost = new PostMessage({...post, creator: req.userId});

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
    if(!req.userId) return res.status(404).json({ msg: "Unauthenticated!" });
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "Can't like post!" });

    PostMessage.findById(id)
        .then(post => {
            const index = post.likes.findIndex(id => id === String(req.userId));
            if(index === -1){
                post.likes.push(req.userId);
            }else{
                post.likes = post.likes.filter(id => id !== String(req.userId));
            }

            PostMessage.findByIdAndUpdate(id, post, { new: true } )
                .then(newPost => {
                    return res.status(200).json(newPost);
                })
                .catch(err => {
                    console.log(err);
                    return res.status(404).json({msg: "Can't like post"});
                })
        })
}