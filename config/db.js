// memanggil package mongoose
const mongoose = require('mongoose');
//memanggil package config
const config= require('config');
//memanggil koneksi ke database
const db = config.get('mongoURI');

// Koneksi ke db
const connectDB = async() => {
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log('mongoDB connected..')
    }catch(err){
        console.error(err.message);
    }
    // exit proses with failure

}
// exports module
module.exports=connectDB;
