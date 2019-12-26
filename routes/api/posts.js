const express = require("express");
const router  = express.Router();
const auth = require("../../middleware/auth");
const {check,validationResult} = require("express-validator");
const Post =require("../../models/Post");
const Profile =require("../../models/Profile");
const User =require("../../models/User");


// @route POST api/posts
// @desc Add Post
// @access Private
router.post("/",[
    auth,
    [
        check('text','text is required').not().isEmpty()
    ]
] ,
 async (req,res)=>{

    const errors = validationResult(req);
    if(! errors.isEmpty())
    {
      return res.status(400).json({errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select("-password");
        
        const newPost=new Post({
            text:req.body.text,
            avatar:user.avatar,
            name:user.name,
            user:req.user.id

        });

        const post =await newPost.save();

        res.json(post);
    } catch (err) {
        res.status(500).send("Server error");
        console.error(err.message);
        
    }
 

 });

// @route POST api/posts/
// @desc Display all posts
// @access Private

router.get("/", auth,async (req,res) =>{

    try {

        const posts = await Post.find().sort({date:-1});

        res.json(posts);



    } catch (err) {
        res.status(500).send("Server error");
        console.error(err.message);
    }
} );

// @route POST api/posts/:id
// @desc Display post of certain id
// @access Private

router.get("/:id",auth,async (req,res)=>{

    try {

        const post = await Post.findById(req.params.id);

        if(!post)
        return res.status(404).json({msg: 'Post not Found'});

        res.json(post);
        
    } catch (err) {

        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post not Found'});
        }
        res.status(500).send("Server error");
        console.error(err.message);
       
    }
})
// @route DELETE api/posts/:id
// @desc delete post of certain id
// @access Private

router.delete("/:id",auth,async (req,res)=>{

    try {

        const post = await Post.findById(req.params.id);

        if(!post)
        return res.status(404).json({msg: 'Post not Found'});

        if(post.user.toString() != req.user.id)
        return res.status(401).json({msg: 'User not Authorized'});

        await post.remove();
        res.json({msg:'Post removed successfully!'});
        
    } catch (err) {

        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'Post not Found'});
        }
        res.status(500).send("Server error");
        console.error(err.message);
       
    }
});

// @route PUT api/posts/like/:id
// @desc like post of certain id
// @access Private

router.put("/like/:id",auth,async (req,res)=>{

    try {

        const post=await Post.findById(req.params.id);

        if(post.likes.filter(like =>like.user.toString() === req.user.id).length>0){
           return res.status(400).json({msg:"Post already liked!"});
        }

        post.likes.unshift({ user:req.user.id });

        await post.save();

        res.json(post.likes);

        
    } catch (err) {
        res.status(500).send("Server error");
        console.error(err.message);
        
    }
});

// @route PUT api/posts/unlike/:id
// @desc unlike post of certain id
// @access Private

router.put("/unlike/:id",auth,async (req,res)=>{

    try {

        const post=await Post.findById(req.params.id);

        if(post.likes.filter(like =>like.user.toString() === req.user.id).length === 0){
           return res.status(400).json({msg:"Post not been liked yet!"});
        }
    
      const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

        await post.save();  
        res.json(post.likes);
        
        
    } catch (err) {
        res.status(500).send("Server error");
        console.error(err.message);
        
    }
});

// @route POST api/posts/comment/:id
// @desc add comment a post 
// @access Private

router.post("/comment/:id",[auth,
[
    check('text','Text is required').not().isEmpty()
]],
async (req,res)=>{

    try {
        
        const post = await Post.findById(req.params.id);

        const user = await User.findById(req.user.id).select("-password");

        const newComment={
            text:req.body.text,
            user:req.user.id,
            avatar:user.avatar,
            name:user.name
        };

         post.comments.unshift(newComment);

        await post.save();
        res.json(post.comments);
    } catch (err) {
        res.status(500).send("Server error");
        console.error(err.message);       
    }
});

// @route DELETE api/posts/comment/:id/:comment_id
// @desc delete comment a post 
// @access Private

router.delete("/comment/:id/:comment_id",auth,async (req,res) => {

    try {
        
        const post = await Post.findById(req.params.id);       
       const comment = post.comments.find(comment => comment.id === req.params.comment_id);

       if(!comment)
       {
           return res.status(404).json({msg:"Comment does not exist!"});
       }

       if(comment.user.toString() !== req.user.id)
       {
           return res.status(401).json({ msg:"Not authorized!" });
       }

       const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);
        
        await post.save();
        res.json(post.comments);
    } catch (err) {
        res.status(500).send("Server error");
        console.error(err.message);       
    }
});


module.exports = router;