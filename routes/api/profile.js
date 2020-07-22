const express= require('express');
const router= express.Router();
// @route-->Get api profile
//@desc-->Test Route
//@access->public atau privat

router.get('/',(req,res)=>res.send('profile route'));

//exports route
module.exports = router;