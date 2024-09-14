import mongoose from 'mongoose'
 
const salesSchema = new mongoose.Schema({
    name:{
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
    salesvg:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
    },
    postedby:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
})


export const Sales = mongoose.model("Sales" , salesSchema);