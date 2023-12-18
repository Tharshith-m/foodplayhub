const mongoose =require('mongoose')

const devuser=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true ,
        unique :true 
    },
    photo:{
        type:String,

    },
    video:{
        type:String,
    },
    likes:{
        type:Number,
        default:0
    },
    place:{
        type:String ,
        required:true ,
    },
    password:{
        type:String,
        required:true ,

    },
    confirmpassword:{
        type:String,
        required:true ,
    }


});

module.exports =mongoose.model('usermodel',devuser)