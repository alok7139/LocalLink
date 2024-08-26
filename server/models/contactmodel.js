import mongoose from "mongoose";
import validator from "validator";

const message = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate: [validator.isEmail , "please provide valid email"],
    },
    phone:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
})

export const Message = mongoose.model("Message" , message);