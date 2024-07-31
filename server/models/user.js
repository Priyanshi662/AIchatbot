const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true,  
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },

    password:{
        type:String,
        required:true,
        min:6
    },


},{timestamps:true})

module.exports=mongoose.model('UsersAi',UserSchema)