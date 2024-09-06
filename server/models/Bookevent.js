import mongoose, { mongo }  from "mongoose";

const Bookschema = new mongoose.Schema({
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
    event:{
        type:mongoose.Schema.ObjectId,
        ref: 'Localevents',
        required:true,
    },
    bookingdate:{
        type:Date,
        default: Date.now(),
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:true,
    }
})


export const Booking = mongoose.model("Booking" , Bookschema);