const express= require('express');
const router= express.Router();
const { body, validationResult, check } = require('express-validator');
// @route-->Post api users
//@desc-->Test Route
//@access->public

router.post('/',[
  check('name','Nama Harus di isi ').not().isEmpty(),
  check('email','Isi valid Email').isEmail(),
  check('password','Isi password minimal 6 atau lebih karakter').isLength({min:6 })
],(req,res)=>{
    // handle Request
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    
    res.send('users route')



});

//exports route
module.exports = router;