const express= require('express');
const router= express.Router();
const {body,validationResult,check}=require('express-validator');
const auth=require('../../middleware/auth');

const post=require('../../models/Post');
const profile=require('../../models/Profile');
const user=require('../../models/User');
const User = require('../../models/User');
const Post = require('../../models/Post');
// @route-->POST api/posts
//@desc-->Create Post
//@access-> privat

router.post('/',
[
    auth,
    [
       check('text','Text is required').not().isEmpty()
    ]
],
async (req,res) =>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        // retrieve user by id tanpa password
        const user= await User.findById(req.user.id).select('-password');

        const newPost =new Post({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        });
        const post = await newPost.save();
        res.json(post);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
); 
// @route-->GET api/posts
//@desc-->GET all Post
//@access-> privat
router.get('/',auth,async(req,res)=>{
    try{
        const posts= await post.find().sort({date:-1});
        res.json(posts);

    }catch(err){

        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
 
// @route-->GET api/posts/:id
//@desc-->GET single Post
//@access-> privat
router.get('/:id',auth,async(req,res)=>{

    try{
        const post= await Post.findById(req.params.id);
        if(!post){
            return status(404).json({msg:'post not found'});
        }
        res.json(post);

    }catch(err){
        console.error(err.message);
        if(err.kind==='ObjectId'){
            return res.status(404).json({msg:'post not found'});
        }
        res.status(500).send('Server Error');
    }
});

    // @route-->DELET api/posts/:id
    //@desc-->DELET post
    //@access-> privat
    router.delete('/:id',auth,async(req,res)=>{
        try{
            const post= await Post.findById(req.params.id);
            if(!post){
                return res.status(404).json({msg:'Post not found'})
            }
            
        // check user
        if(post.user.toString() !== req.user.id){
            return status(404).json({msg:'user not authorized'})
        }
        await post.remove();
        res.json({msg:'post Remove'})


        }catch(err){
            console.error(err.message);
            if(err.kind==='ObjectId'){
                return res.status(404).json({msg:'Post not found'});
            }
            res.status(500).send('Server Error');
        }

    });



//exports route
module.exports=router;