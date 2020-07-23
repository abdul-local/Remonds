const jwt =require('jsonwebtoken');
const config=require('config');

module.exports=function(req,res, next){

    // get token dari header
    const token= req.header('x-auth-token');
    //cek apabila token itu tidak tersedia
    if(!token){
        return res.status(401).json({msg:'anda tidak memiliki Token,Autorisasi di tolak'})
    }
    // verify Token(decode Token)
    try{

        const decoded = jwt.verify(token,config.get('jwtSecret'));
        req.user = decoded.user;
        next();

    }catch(err){
        res.status(401).json({msg: 'Token Anda Tidak Valid'})
    }
};