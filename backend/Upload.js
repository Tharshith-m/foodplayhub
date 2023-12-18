const mongoose =require('mongoose')

const upload=new mongoose.Schema({
    hotel:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true

    },
    video:{
        type:String,
        required:true ,
        unique :true 
    },
    place:{
        type:String,

    },
    rating:{
        type:String,
    },
    


});

module.exports =mongoose.model('Upload',upload)