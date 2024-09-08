import mongoose, { mongo } from "mongoose";


const lostpetschema = new mongoose.Schema({
    petowner:{
        type:String,
        required:true,
    },
    petsvg:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },
    phone:{
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
    petname:{
        type:String,
        required:true,
    },
    reward:{
        type:String,
        required:true,
    },
    postedby:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    country:{
        type:String,
        default:"India",
    }

})

export const Pet =  mongoose.model("Pet" , lostpetschema);