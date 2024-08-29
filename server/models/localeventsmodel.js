import mongoose from "mongoose";

const localevenetsSchema = new mongoose.Schema({
    localeventname:{
        type:String,
        required:true,
    },
    startdate:{
        type:Date,
        default: Date.now(),
        required:true
    },
    enddate:{
        type:Date,
        required:true,
        default: Date.now(),
    },
    owner:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    }

})

export default Localevents = mongoose.model("Localevents" , localevenetsSchema);