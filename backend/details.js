const mongoose =require('mongoose')

const details=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
   
});

module.exports =mongoose.model('details',details) 