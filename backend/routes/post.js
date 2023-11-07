const express = require("express")
const Post = require("../models/Post")
const router = express.Router()

// Create Post
router.post('/' , async (req , res) => {
    try{
        const post = await new Post(req.body)
        const savedPost = await post.save()
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})

// Read Post
router.get("/" , async (req , res) => {
    try{
        const postData = await Post.find({})
        res.status(200).json(postData)
    }catch(err){
        res.status(500).json(err)
    }
})

// Update Post
router.put('/:id' , async (req , res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.updateOne({$set : req.body})
            res.status(200).json("Post Updated Succefully")
        }
        else{
            res.status(403).json("You cannot update post")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

// Delete Post
router.delete('/:id' , async (req , res) => {
    try{
        const post = await Post.findById(req.params.id)
        await post.deleteOne()
        res.status(200).json("Post deleted Succefully")
    }catch(err){
        res.status(500).json(err)
    }
})

// To get all the post of a single User
router.get('/profile/:id' , async (req , res) => {
    try{
        const postData = await Post.find({userId : req.params.id})
        res.status(200).json(postData)
    }catch(err){
        res.status(500).json(err)
    }
})

// Like and Dislike Post
router.put('/:id/like' , async (req , res) => {
    try{ 
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId )){
            await post.updateOne({$push : {likes : req.body.userId }})
            res.status(200).json("Liked")
        }
        else{
            await post.updateOne({$pull : {likes : req.body.userId }})
            res.status(200).json("DisLiked")
        }
        
    }catch(err){
        res.status(500).json(err)
    }
})


// Comment
router.put('/:id/comment' , async (req , res) => {
    try{ 
        const post = await Post.findById(req.params.id)
        await post.updateOne({$push : {comments : req.body}})
        res.status(200).json("Commented")
        
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id/deleteComment' , async (req , res) => {
    try{ 
        const post = await Post.findById(req.params.id)
        await post.updateOne({$pull : {comments : req.body}})
        res.status(200).json("Comment deleted successfully")
        
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router