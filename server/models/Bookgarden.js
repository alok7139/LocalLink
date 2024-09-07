import mongoose from "mongoose";

const bookgardenSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    adharcard:{
        type:String,
        required:true,
    },
    gardenservice:{
        type:mongoose.Schema.ObjectId,
        ref:'Garden',
        required:true,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    }
})

export const BookGarden = mongoose.model("BookGarden" , bookgardenSchema);
