const express= require('express');
const router= express.Router();
const auth=require('../../middleware/auth');
const Profile=require('../../models/Profile');
const User=require('../../models/User');
const { body, validationResult ,check} = require('express-validator');


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

// @route-->POST api/profile/
//@desc-->  create or Update user profile
//@access->Privat
router.post(
    '/',
    [auth,
        [

    check('status','status is required').not()
    .isEmpty(),
    check('skills','skill is require').not()
    .isEmpty()
]
],
async(req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){

        res.status(400).json({errors:errors.array()});
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
        
    }=req.body;
    // build profile object
    const profileFileds={};
    profileFileds.user=req.user.id;
    if(company) profileFileds.company=company;
    if(website) profileFileds.website=website;
    if(bio) profileFileds.bio=bio;
    if(status) profileFileds.status=status;
    if(githubusername) profileFileds.githubusername=githubusername;
    if(skills){
        profileFileds.skills=skills.split(',').map(skill=> skill.trim());
    }
    console.log(profileFileds.skills);
    res.send(profileFileds.skills);


});


//exports route
module.exports = router;