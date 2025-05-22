const { type } = require("express/lib/response")
const mongoose=require("mongoose")
const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{type:String,
        required:true,
        unique:true
        
    },
    age:{type:Number,
        required:true

    },
    contact:{type:Number,
        required:true

    },
    password:{type:String,
        required:true


    }})
module.exports=new mongoose.model("user",userschema)