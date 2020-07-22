const express= require('express');
const router= express.Router();
// @route-->Get api users
//@desc-->Test Route
//@access->public atau privat

router.get('/',(req,res)=>res.send('users route'));

//exports route
module.exports = router;