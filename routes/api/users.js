const express= require('express');
const router= express.Router();
const { body, validationResult, check } = require('express-validator');
const bcrypt=require('bcryptjs');
//(1) require user models
const User= require('../../models/User');
const gravatar= require('gravatar');

// @route-->Post api users
//@desc-->Test Route
//@access->public

router.post('/',[
  check('name','Nama Harus di isi ').not().isEmpty(),
  check('email','Isi valid Email').isEmail(),
  check('password','Isi password minimal 6 atau lebih karakter').isLength({min:6 })
],
//(2) mengunakan async/await

async(req,res)=>{
    // handle Request
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    
    // (3)membuat variabel menggunakan destructure
    const {name,email,password}=req.body;
    //(4): membuat try catch
    try{
        let user= await User.findOne({email});
        // user exis
        if(user){
            return res.status(422).json({errors: [{msg:"user sudah terdaptar"}]})

        }
        //get users Gravatar
        const avatar= gravatar.url(email, {

            s:200,
            r:'pg',
            d:'mm'
        });
        user=new User({
            name,
            email,
            avatar,
            password
        })

        //encrypt password dengan bcrypt
        //membuat format hash dengan bantuan "salt"
        const salt =await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();

        

        //return json web token


        res.send('users route')
    }catch(err){
        console.error(err.message);
        res.status(500).send("server error")
    }

   



});

//exports route
module.exports = router;