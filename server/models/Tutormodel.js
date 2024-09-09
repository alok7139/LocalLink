import mongoose from 'mongoose'

const tutorSchema = new mongoose.Schema({
    tutorname:{
        type:String,
        required:true,
    },
    tutorfee:{
        type:String,
        required:true,
    },
    typeoftutor:{
        type:String,
        required:true,
        enum: ["Online Tutor" , "Homework Helper" , "Test Prep Tutor" , "Academics Tutor"],
    },
    subject:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    postedby:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User',
    },
    country:{
        type:String,
        default:"India",
    }

})

export const Tutor = mongoose.model("Tutor" , tutorSchema);