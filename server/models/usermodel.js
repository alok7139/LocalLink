import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from "validator";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate : [validator.isEmail , "please provide valid email" ]
    },
    dob:{
        type:Date,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum : ["Male" , "Female" , "Others"],
    },
    phone:{
        type:String,
        required:true,
    },
    
    password:{
        type:String,
        required:true,
    },
})


userSchema.pre("save" ,async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password =  await bcrypt.hash(this.password,10);
})

userSchema.methods.comparepassword = async function(userpassword) {
    return await bcrypt.compare(userpassword , this.password);
}

userSchema.methods.generatejsonwebtoken = function() {
    return jwt.sign({id:this._id} , process.env.JWT_SECRET_KEY , {
        expiresIn:process.env.JWT_EXPIRE
    })
}




export const User = mongoose.model("User" , userSchema);