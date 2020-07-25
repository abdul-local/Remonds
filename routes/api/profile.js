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
    //console.log(profileFileds.skills);
    //res.send(profileFileds.skills);
    // build social objcet
    profileFileds.social={}
    if(youtube) profileFileds.social.youtube = youtube;
    if(facebook) profileFileds.social.facebook = facebook;
    if(twitter) profileFileds.social.twitter = twitter;
    if(instagram) profileFileds.social.instagram = instagram;
    if(linkedin) profileFileds.social.linkedin = linkedin;

    try{

        let profile=await Profile.findOne({user:req.user.id});
        if(profile){
            //update profile
            profile=await Profile.findOneAndUpdate(
                {user:req.user.id },
                {$set:profileFileds},
                {new:true}
                );
                return res.json(profile);
            }

            // Create Profile
            profile=new Profile(profileFileds);
            await profile.save();
            res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server Eror');


    }





});
// @route-->GET api/profile/
//@desc-->Get all profile
//@access->Privat
router.get('/',async(req,res)=> {

    try{
        const profiles=await Profile.find().populate('user',['name',
    'avatar']);
    res.json(profiles);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});
// @route-->GET api/profile/user/:user_id
//@desc-->Get profile by user_id
//@access->Publick
router.get('/user/:user_id',async (req,res)=>{

    try{
        const profile= await Profile.find({user: req.params.user_id}).populate('user',['name','avatar']);
        if(!profile)res.status(400).json({msg:'Profile tidak di temukan'});
            
         res.json(profile);
        
    }catch(err){
        if(err.kind =='ObjectId'){
            return res.status(400).json({msg:'profile tidak di temukan'});

        }
        res.status(500).send('server error');

    }
});

//exports route
module.exports = router;
