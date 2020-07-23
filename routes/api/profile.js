const express= require('express');
const router= express.Router();
const auth=require('../../middleware/auth');
const Profile=require('../../models/Profile');
const User=require('../../models/User');

// @route-->Get api/profile/me
//@desc--> Get current users profile
//@access->Privat

router.get('/me',auth,async(req,res)=>{
    try{

        const profile= await Profile.findOne({user: req.user.id}).populate
        ('user',['namee','avatar']);
        if(!profile){
            return res.status(400).json({msg:'tidaka ada profile untuk user ini'})
        }
        res.json(profile);
    }catch(err){

        console.error(err.message);
        res.status(500).send('server error');
    }
});

//exports route
module.exports = router;