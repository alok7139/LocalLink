import mongoose from "mongoose";

const handymanschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    typeofservice:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    fee:{
        type:String,
        required:true,
    },
    postedby:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
        
    }

})

export const Handyman = mongoose.model("Handyman" , handymanschema);