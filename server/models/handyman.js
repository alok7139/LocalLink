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
    

})