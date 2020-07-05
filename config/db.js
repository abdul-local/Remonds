const mongoose = require('mongoose');
const config= require('config');
const db =config.get('mongoURI');

// Koneksi ke db
const connectDB = async() => {
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log('mongoDB connected..')
    }catch(err){
        console.error(err.message);
    }
    // exit proses with failure
    process.exit(1);

}
// export module
module.exports=connectDB;
