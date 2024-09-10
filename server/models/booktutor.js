import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    classtype:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:true,
    },
    tutor:{
        type:mongoose.Schema.ObjectId,
        ref:'Tutor',
        required:true
    }

})

export const Booktutor = mongoose.model("Booktutor" , bookSchema);