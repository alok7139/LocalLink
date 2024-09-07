import mongoose from "mongoose";


const gardeningSchema = new mongoose.Schema({
    houseowner:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    posteddate:{
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
    salary:{
        type:String,
        required:true,
    },
    country:{
        typ:String,
        required:true,
    },
    garden:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    postedby:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required:true,
    },


})

export const Garden = mongoose.model("Garden" , gardeningSchema);