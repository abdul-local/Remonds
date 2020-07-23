const express= require('express');
const router= express.Router();
const auth=require('../../middleware/auth');
const User=require('../../models/User');
// @route-->Get api auth
//@desc-->Test auth
//@access->public atau privat

router.get('/',auth,async (req,res)=>{
    try{
     const user =await User.findById(req.user.id).select('-password');
     res.json(user);
    }catch(err){
        console.error(err.maessage);
    }
});

//exports route
module.exports=router;