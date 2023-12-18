const mongoose =require('mongoose')

const Purchase=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    hotel:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true

    },
    place:{
        type:String,

    }
    


});

module.exports =mongoose.model('Purchase',Purchase)