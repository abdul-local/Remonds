const express= require('express');
const router= express.Router();
// @route-->Get api posts
//@desc-->Test route
//@access->public atau privat

router.get('/',(req,res)=>res.send('posts route'));

//exports route
module.exports=router;