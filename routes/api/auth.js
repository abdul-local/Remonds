const express= require('express');
const router= express.Router();
// @route-->Get api auth
//@desc-->Test auth
//@access->public atau privat

router.get('/',(req,res)=>res.send('Auth route'));

//exports route
module.exports=router;