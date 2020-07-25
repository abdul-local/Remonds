const mongoose= require('mongoose');
const schema =mongoose.Schema;
const Postschema = new schema({
    // user reference
    user:{
        type:schema.Types.ObjectId,
        ref:'users'
    },
    text:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    likes:[
        {
            //relation/reference
            user:{
                type: schema.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    comments:[
        {
            user:{
                type:schema.Types.ObjectId,
                ref:'users'
            },
            text:{
                type:String,
                required:true
            },
            name:{
                type:String
            },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
    
});
module.exports=Post=mongoose.model('post',Postschema);