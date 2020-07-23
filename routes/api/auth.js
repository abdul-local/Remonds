const express= require('express');
const router= express.Router();
const auth=require('../../middleware/auth');
const User=require('../../models/User');
const config=require('config');
const { body, validationResult, check } = require('express-validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

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
// @route-->POST api/auth
//@desc-->Test Route
//@access->public

router.post('/',[
    
    check('email','Isi valid Email').isEmail(),
    check('password','Password harus di isi').exists()
  ],
  //mengunakan promise async/await
  
  async(req,res)=>{
      // handle Request
      const errors=validationResult(req);
      if(!errors.isEmpty()){
          return res.status(422).json({errors: errors.array()});
      }
      
      // membuat variabel menggunakan destructure
      const {email,password}=req.body;
      //(4): membuat try catch
      try{
          let user= await User.findOne({email});
          // user exis
          if(!user){
              return res.status(422).json({errors: [{msg:"user invalid"}]})
  
          }
          // compare password bawaan bcrypt
          const isMatch = await bcrypt.compare(password,user.password);

          if(!isMatch){
              return res.status(400).json({error:[{message:"user invalid"}]})
          }
          
  
          //return json web token
          const payload={
              user:{
                  id: user.id,
              }
          };
          jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},
          (err,token)=>{
              if(err) throw err;
              res.json({token});
          }
          )
  
  
         // res.send('users route')
      }catch(err){
          console.error(err.message);
          res.status(500).send("server error")
      }
  
     
  
  
  
  });

//exports route
module.exports=router;