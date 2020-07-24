const express= require('express');
const router= express.Router();
const auth=require('../../middleware/auth');
const Profile=require('../../models/Profile');
const User=require('../../models/User');
const { body, validationResult ,check} = require('express-validator');
const request=require('request');
const config=require('config');



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
    if(location)profileFileds.location=location;
    if(bio) profileFileds.bio=bio;
    if(status) profileFileds.status=status;
    if(githubusername) profileFileds.githubusername=githubusername;
    if(skills){
        profileFileds.skills=skills.split(',').map(skill=> skill.trim());
    }
    // build social objcet
    profileFileds.social={}
    if(youtube) profileFileds.social.youtube = youtube;
    if(twitter) profileFileds.social.facebook = twitter;
    if(facebook) profileFileds.social.twitter = facebook;
    if(linkedin) profileFileds.social.instagram = linkedin;
    if(instagram) profileFileds.social.linkedin = instagram;

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
        const profile= await Profile.find({user: req.params.user_id})
        .populate('user',['name','avatar']);
        if(!profile)
            return res.status(400).json({msg:'Profile tidak di temukan'});
            res.json(profile);
    

    }catch(err){
        //console.err(err.message);
        if(err.kind =='ObjectId'){
            return res.status(400).json({msg:'profile tidak di temukan'});

        }

        res.status(500).send('Server Error');
    }
});

// @route-->DELET api/profile/me
//@desc--> Delet, users, profile
//@access->Privat

router.delete('/',auth,async(req,res)=>{
    try{
        //remove Profile
       await Profile.findOneAndRemove({user: req.user.id});
       // remove user
       await Profile.findOneAndRemove({_id:req.user.id});
       res.json('User berhasil di hapus');
      
    }catch(err){

        console.error(err.message);
        res.status(500).send('server error');
    }
});

// @route-->PUT api/profile/experience
//@desc--> Add profile user experience
//@access->Privat
router.put('/experience',
[
    auth,
    [
        check('title','Title is required').not().isEmpty(),
        check('company','company is required').not().isEmpty(),
        check('from','from date is required').not().isEmpty(),

]
],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){

        return res.status(400).json({errors:errors.array()});
    }
    // destructring 
    const{
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }=req.body;
    const newExp={
        title,
        company,
        location,
        from,
        to,
        current,
        description

    }
    try{

        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error')


    }
});

// @route-->DELET api/profile/experience/exp_id
//@desc--> Add profile user experience
//@access->Privat
router.delete('/experience/:exp_id',auth,async(req,res)=>{

try{
const profile= await Profile.findOne({user:req.user.id});
// Get remove index
const removeIndex=profile.experience
.map(item=>item.id)
.indexOf(req.params.exp_id);
profile.experience.splice(removeIndex,1);
await profile.save();
res.json(profile);
}catch(err){

    console.error(err.message);
    res.status(400).send('server Error');
}
});

// @route-->PUT api/profile/education
//@desc--> Add profile user education
//@access->Privat
router.put('/education',
[
    auth,
    [
        check('school','School is required').not().isEmpty(),
        check('degree','Degree is required').not().isEmpty(),
        check('fieldofstudy','Field of Study is required').not().isEmpty(),
        check('from','From date is required').not().isEmpty(),

]
],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){

        return res.status(400).json({errors:errors.array()});
    }
    // destructring 
    const{
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }=req.body;
    const newEdu={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description

    }
    try{

        const profile = await Profile.findOne({user:req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error')


    }
});

// @route-->DELET api/profile/education/exd_id
//@desc--> Add profile user education
//@access->Privat
router.delete('/education/:edu_id',auth,async(req,res)=>{

try{
const profile= await Profile.findOne({user:req.user.id});
// Get remove index
const removeIndex=profile.education
.map(item=>item.id)
.indexOf(req.params.exp_id);
profile.education.splice(removeIndex,1);
await profile.save();
res.json(profile);
}catch(err){

    console.error(err.message);
    res.status(400).send('server Error');
}
});
// @route-->Get api/profile/github/:username
//@desc--> Get repo from github.com
//@access->Privat
// @route-->Get api/profile/github/:username
//@desc--> Get repo from github.com
//@access->Privat
router.get('/github/:usernanme',(req,res)=>{
    try{
        const options ={
           
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}client_secret=${config.get('githubSecret')}`,
      method: 'GET',
     headers: { 'user-agent': 'node.js' }
        };
        request(options,(error,response,body)=>{

            if(error) console.error(error);

            if(response.statusCode !==200){
                return res.status(404).json({msg:'No github profile found'});
                //res.json(JSON.parse(body));
            }
            res.json(JSON.parse(body));
        });

    }catch(err){

        console.error(err.message);
        res.status(5000).send('Server Error');
    }

});



//exports route
module.exports = router;