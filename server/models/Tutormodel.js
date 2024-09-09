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
    subject:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    address:{
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

const Tutor = mongoose.model("Tutor" , tutorSchema);